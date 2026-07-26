"""
RescueAI — Account Settings API

Handles profile updates (name/email/phone) and password changes for the
Settings page. Mounted at /api/settings (see README for main.py registration).

================================================================================
 ADJUST THESE TWO THINGS TO MATCH YOUR REAL PROJECT
================================================================================
1. USER MODEL IMPORT — this assumes:
     from app.models.user import User
   with columns: id, email, hashed_password, full_name, phone
   If your actual model lives elsewhere, or uses different column names
   (e.g. `name` instead of `full_name`, or `password` instead of
   `hashed_password`), update the import below and every `user.<field>`
   reference in this file to match.

2. PASSWORD HASHING — this assumes you hash passwords with passlib's
   bcrypt scheme (the most common FastAPI pattern):
     pwd_context.hash(...)   /   pwd_context.verify(...)
   If your signup route hashes passwords differently, replace
   `hash_password()` and `verify_password()` below with whatever your
   signup route already uses, so login and password-update stay compatible.

3. AUTH — there's no real session/JWT check yet. Every request identifies
   the user by an `email` field sent from the frontend. Once you build
   real auth, replace the `email: str` parameters below with a
   `current_user: User = Depends(get_current_user)` dependency instead,
   and drop the email arguments.
================================================================================
"""

from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from app.database.database import get_db
from app.models.user import User  # <-- adjust import path if different

router = APIRouter(prefix="/settings", tags=["Settings"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(raw: str) -> str:
    return pwd_context.hash(raw)


def verify_password(raw: str, hashed: str) -> bool:
    return pwd_context.verify(raw, hashed)


# ---------------------------------------------------------------- schemas --

class ProfileResponse(BaseModel):
    name: str | None = None
    email: EmailStr
    phone: str | None = None


class ProfileUpdate(BaseModel):
    current_email: EmailStr          # identifies which user to update (temporary, see note above)
    name: str | None = Field(None, max_length=100)
    email: EmailStr
    phone: str | None = Field(None, max_length=20)


class PasswordUpdate(BaseModel):
    email: EmailStr                  # identifies which user (temporary, see note above)
    current_password: str = Field(..., min_length=1)
    new_password: str = Field(..., min_length=8)


# --------------------------------------------------------------- endpoints --

@router.get("/profile", response_model=ProfileResponse)
async def get_profile(email: EmailStr, db: Session = Depends(get_db)):
    """Return the current user's profile details."""
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")

    return ProfileResponse(
        name=getattr(user, "full_name", None),
        email=user.email,
        phone=getattr(user, "phone", None),
    )


@router.put("/profile", response_model=ProfileResponse)
async def update_profile(payload: ProfileUpdate, db: Session = Depends(get_db)):
    """Update name, email, and/or phone number."""
    user = db.query(User).filter(User.email == payload.current_email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")

    # If the email is changing, make sure it isn't already taken.
    if payload.email != payload.current_email:
        existing = db.query(User).filter(User.email == payload.email).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="That email is already in use by another account.",
            )

    user.email = payload.email
    if hasattr(user, "full_name"):
        user.full_name = payload.name
    if hasattr(user, "phone"):
        user.phone = payload.phone

    db.commit()
    db.refresh(user)

    return ProfileResponse(
        name=getattr(user, "full_name", None),
        email=user.email,
        phone=getattr(user, "phone", None),
    )


@router.put("/password", status_code=status.HTTP_200_OK)
async def update_password(payload: PasswordUpdate, db: Session = Depends(get_db)):
    """Verify the current password, then set a new one."""
    user = db.query(User).filter(User.email == payload.email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")

    if not verify_password(payload.current_password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Current password is incorrect.",
        )

    user.hashed_password = hash_password(payload.new_password)
    db.commit()

    return {"detail": "Password updated successfully."}
