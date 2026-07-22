import os
import hashlib
import uuid
import datetime
from typing import Optional, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session

from app.database.database import get_db, Base, engine
from app.database.models import User, Profile

# Ensure database tables exist
Base.metadata.create_all(bind=engine)

router = APIRouter(tags=["Authentication & Profile"])

# Password hashing helper (PBKDF2 SHA256)
def hash_password(password: str) -> str:
    salt = b"rescue_ai_static_salt_2026"
    return hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 100000).hex()

def verify_password(password: str, hashed: str) -> bool:
    return hash_password(password) == hashed

# Helper to calculate profile completion percentage
def calculate_completion(profile: Profile) -> int:
    score = 20  # Base registration score
    fields_to_check = [
        profile.phone, profile.address, profile.city, profile.blood_group,
        profile.height, profile.weight, profile.allergies, profile.known_diseases,
        profile.emergency_contact_1_name, profile.emergency_contact_1_phone,
        profile.emergency_contact_2_name, profile.profile_photo
    ]
    filled = sum(1 for f in fields_to_check if f and str(f).strip())
    additional_score = int((filled / len(fields_to_check)) * 80)
    return min(100, score + additional_score)

# Helper to serialize user & profile
def serialize_user_data(user: User, profile: Profile) -> Dict[str, Any]:
    return {
        "id": user.id,
        "full_name": user.full_name,
        "email": user.email,
        "profile_image": user.profile_image or profile.profile_photo,
        "created_at": user.created_at.isoformat() if user.created_at else None,
        "account_status": user.account_status,
        "profile": {
            "id": profile.id,
            "full_name": profile.full_name or user.full_name,
            "gender": profile.gender,
            "dob": profile.dob,
            "age": profile.age,
            "phone": profile.phone,
            "alt_phone": profile.alt_phone,
            "address": profile.address,
            "city": profile.city,
            "state": profile.state,
            "country": profile.country,
            "postal_code": profile.postal_code,
            "nationality": profile.nationality,

            # Medical
            "blood_group": profile.blood_group,
            "height": profile.height,
            "weight": profile.weight,
            "bmi": profile.bmi,
            "known_diseases": profile.known_diseases,
            "allergies": profile.allergies,
            "medications": profile.medications,
            "disabilities": profile.disabilities,
            "pregnancy_status": profile.pregnancy_status,
            "organ_donor": profile.organ_donor,
            "medical_notes": profile.medical_notes,
            "family_history": profile.family_history,
            "vaccination_status": profile.vaccination_status,
            "primary_doctor": profile.primary_doctor,
            "hospital_preference": profile.hospital_preference,

            # Emergency Contacts
            "emergency_contact_1_name": profile.emergency_contact_1_name,
            "emergency_contact_1_relationship": profile.emergency_contact_1_relationship,
            "emergency_contact_1_phone": profile.emergency_contact_1_phone,

            "emergency_contact_2_name": profile.emergency_contact_2_name,
            "emergency_contact_2_relationship": profile.emergency_contact_2_relationship,
            "emergency_contact_2_phone": profile.emergency_contact_2_phone,

            "emergency_contact_3_name": profile.emergency_contact_3_name,
            "emergency_contact_3_relationship": profile.emergency_contact_3_relationship,
            "emergency_contact_3_phone": profile.emergency_contact_3_phone,

            "emergency_contact_4_name": profile.emergency_contact_4_name,
            "emergency_contact_4_relationship": profile.emergency_contact_4_relationship,
            "emergency_contact_4_phone": profile.emergency_contact_4_phone,

            "emergency_contact_5_name": profile.emergency_contact_5_name,
            "emergency_contact_5_relationship": profile.emergency_contact_5_relationship,
            "emergency_contact_5_phone": profile.emergency_contact_5_phone,

            "preferred_hospital": profile.preferred_hospital,
            "preferred_language": profile.preferred_language or "en",

            # Biometrics
            "profile_photo": profile.profile_photo or user.profile_image,
            "fingerprint_enabled": profile.fingerprint_enabled,
            "face_auth_enabled": profile.face_auth_enabled,
            "voice_auth_enabled": profile.voice_auth_enabled,
            "biometric_last_updated": profile.biometric_last_updated,

            # Device & Demographic
            "device_name": profile.device_name,
            "platform": profile.platform,
            "emergency_offline_status": profile.emergency_offline_status or "Active",
            "last_sync_time": profile.last_sync_time,
            "occupation": profile.occupation,
            "education": profile.education,
            "marital_status": profile.marital_status,
            "religion": profile.religion,
            "community": profile.community,

            # Metrics
            "completion_percentage": profile.completion_percentage or 20
        }
    }


# Request Models
class UserRegisterSchema(BaseModel):
    full_name: str
    email: EmailStr
    password: str

class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str

class ProfileUpdateSchema(BaseModel):
    full_name: Optional[str] = None
    gender: Optional[str] = None
    dob: Optional[str] = None
    age: Optional[str] = None
    phone: Optional[str] = None
    alt_phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    postal_code: Optional[str] = None
    nationality: Optional[str] = None

    blood_group: Optional[str] = None
    height: Optional[str] = None
    weight: Optional[str] = None
    bmi: Optional[str] = None
    known_diseases: Optional[str] = None
    allergies: Optional[str] = None
    medications: Optional[str] = None
    disabilities: Optional[str] = None
    pregnancy_status: Optional[str] = None
    organ_donor: Optional[bool] = None
    medical_notes: Optional[str] = None
    family_history: Optional[str] = None
    vaccination_status: Optional[str] = None
    primary_doctor: Optional[str] = None
    hospital_preference: Optional[str] = None

    emergency_contact_1_name: Optional[str] = None
    emergency_contact_1_relationship: Optional[str] = None
    emergency_contact_1_phone: Optional[str] = None
    emergency_contact_2_name: Optional[str] = None
    emergency_contact_2_relationship: Optional[str] = None
    emergency_contact_2_phone: Optional[str] = None
    emergency_contact_3_name: Optional[str] = None
    emergency_contact_3_relationship: Optional[str] = None
    emergency_contact_3_phone: Optional[str] = None
    emergency_contact_4_name: Optional[str] = None
    emergency_contact_4_relationship: Optional[str] = None
    emergency_contact_4_phone: Optional[str] = None
    emergency_contact_5_name: Optional[str] = None
    emergency_contact_5_relationship: Optional[str] = None
    emergency_contact_5_phone: Optional[str] = None

    preferred_hospital: Optional[str] = None
    preferred_language: Optional[str] = None

    fingerprint_enabled: Optional[bool] = None
    face_auth_enabled: Optional[bool] = None
    voice_auth_enabled: Optional[bool] = None

    occupation: Optional[str] = None
    education: Optional[str] = None
    marital_status: Optional[str] = None
    religion: Optional[str] = None
    community: Optional[str] = None


# --- ENDPOINTS ---

@router.post("/auth/register", status_code=status.HTTP_201_CREATED)
def register_user(payload: UserRegisterSchema, db: Session = Depends(get_db)):
    email_clean = payload.email.strip().lower()
    existing = db.query(User).filter(User.email == email_clean).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email already exists."
        )

    user = User(
        full_name=payload.full_name.strip(),
        email=email_clean,
        hashed_password=hash_password(payload.password),
        last_login=datetime.datetime.utcnow()
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    profile = Profile(
        user_id=user.id,
        full_name=user.full_name,
        completion_percentage=20,
        last_sync_time=datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
    )
    db.add(profile)
    db.commit()
    db.refresh(profile)

    return {
        "message": "Account created successfully",
        "access_token": f"rescue_ai_jwt_{user.id}_{uuid.uuid4().hex[:12]}",
        "user": serialize_user_data(user, profile)
    }


@router.post("/auth/login")
def login_user(payload: UserLoginSchema, db: Session = Depends(get_db)):
    email_clean = payload.email.strip().lower()
    user = db.query(User).filter(User.email == email_clean).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    user.last_login = datetime.datetime.utcnow()
    db.commit()

    profile = db.query(Profile).filter(Profile.user_id == user.id).first()
    if not profile:
        profile = Profile(user_id=user.id, full_name=user.full_name, completion_percentage=20)
        db.add(profile)
        db.commit()
        db.refresh(profile)

    return {
        "message": "Login successful",
        "access_token": f"rescue_ai_jwt_{user.id}_{uuid.uuid4().hex[:12]}",
        "user": serialize_user_data(user, profile)
    }


@router.post("/auth/google")
def google_auth(payload: Dict[str, Any], db: Session = Depends(get_db)):
    email = payload.get("email", "user@google.com").strip().lower()
    full_name = payload.get("full_name", "Google User")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        user = User(
            full_name=full_name,
            email=email,
            hashed_password=hash_password(uuid.uuid4().hex),
            last_login=datetime.datetime.utcnow()
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        profile = Profile(user_id=user.id, full_name=full_name, completion_percentage=20)
        db.add(profile)
        db.commit()
        db.refresh(profile)
    else:
        profile = db.query(Profile).filter(Profile.user_id == user.id).first()

    return {
        "message": "Google authentication successful",
        "access_token": f"rescue_ai_jwt_{user.id}_{uuid.uuid4().hex[:12]}",
        "user": serialize_user_data(user, profile)
    }


@router.get("/auth/me")
def get_current_user(email: str = "user@example.com", db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email.strip().lower()).first()
    if not user:
        # Fallback to first registered user if testing
        user = db.query(User).first()
        if not user:
            raise HTTPException(status_code=404, detail="User profile not found")

    profile = db.query(Profile).filter(Profile.user_id == user.id).first()
    return serialize_user_data(user, profile)


@router.put("/auth/profile")
def update_profile(user_email: str, payload: ProfileUpdateSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_email.strip().lower()).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    profile = db.query(Profile).filter(Profile.user_id == user.id).first()
    if not profile:
        profile = Profile(user_id=user.id)
        db.add(profile)

    update_dict = payload.model_dump(exclude_unset=True)
    for field, value in update_dict.items():
        if hasattr(profile, field):
            setattr(profile, field, value)

    profile.completion_percentage = calculate_completion(profile)
    profile.last_sync_time = datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")

    db.commit()
    db.refresh(profile)

    return {
        "message": "Profile updated successfully",
        "user": serialize_user_data(user, profile)
    }


@router.post("/auth/sync")
def sync_local_profile(payload: Dict[str, Any], db: Session = Depends(get_db)):
    email = payload.get("email", "").strip().lower()
    local_data = payload.get("local_profile", {})

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User account not found for sync")

    profile = db.query(Profile).filter(Profile.user_id == user.id).first()
    if not profile:
        profile = Profile(user_id=user.id)
        db.add(profile)

    # Populate fields from local data if provided
    for key, val in local_data.items():
        if hasattr(profile, key) and val:
            setattr(profile, key, val)

    profile.completion_percentage = calculate_completion(profile)
    profile.last_sync_time = datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")

    db.commit()
    db.refresh(profile)

    return {
        "message": "Local profile successfully synced with Cloud Account",
        "user": serialize_user_data(user, profile)
    }


@router.post("/auth/avatar")
def upload_avatar(
    user_email: str,
    payload: Optional[Dict[str, Any]] = None,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == user_email.strip().lower()).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    profile = db.query(Profile).filter(Profile.user_id == user.id).first()
    if not profile:
        profile = Profile(user_id=user.id)
        db.add(profile)

    avatar_url = (payload or {}).get("avatar_url", "")
    if avatar_url:
        user.profile_image = avatar_url
        profile.profile_photo = avatar_url
        profile.completion_percentage = calculate_completion(profile)
        db.commit()
        db.refresh(user)
        db.refresh(profile)

    return {
        "message": "Avatar updated successfully",
        "avatar_url": avatar_url,
        "user": serialize_user_data(user, profile)
    }


@router.delete("/auth/account")
def delete_account(user_email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_email.strip().lower()).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user)
    db.commit()
    return {"message": "Account deleted successfully"}

