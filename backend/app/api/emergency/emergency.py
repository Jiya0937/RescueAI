"""
RescueAI — Emergency Contacts API

CRUD endpoints backing the "My Emergency Contacts" section of the SOS page.
Mounted at /api/emergency-contacts (see main.py registration in the README).
"""

from typing import List, Optional

from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.database.database import Base, engine, get_db
from app.models.emergency_contact import EmergencyContact

router = APIRouter(prefix="/emergency-contacts", tags=["Emergency Contacts"])

# Ensure the table exists (safe no-op if it's already created via main.py's
# Base.metadata.create_all(bind=engine) at startup).
Base.metadata.create_all(bind=engine)


# ---------------------------------------------------------------- schemas --

class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    phone: str = Field(..., min_length=7, max_length=20)
    relation: Optional[str] = Field(None, max_length=50)
    is_primary: bool = False


class ContactUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    phone: Optional[str] = Field(None, min_length=7, max_length=20)
    relation: Optional[str] = Field(None, max_length=50)
    is_primary: Optional[bool] = None


class ContactResponse(BaseModel):
    id: int
    name: str
    phone: str
    relation: Optional[str] = None
    is_primary: bool

    class Config:
        from_attributes = True  # pydantic v2 (use `orm_mode = True` on pydantic v1)


# --------------------------------------------------------------- endpoints --

@router.get("", response_model=List[ContactResponse])
@router.get("/", response_model=List[ContactResponse])
async def list_contacts(db: Session = Depends(get_db)):
    """Return all saved emergency contacts, primary contacts first."""
    contacts = (
        db.query(EmergencyContact)
        .order_by(EmergencyContact.is_primary.desc(), EmergencyContact.created_at.asc())
        .all()
    )
    return contacts


@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
@router.post("/", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def create_contact(payload: ContactCreate, db: Session = Depends(get_db)):
    """Save a new emergency contact (e.g. a family member or friend)."""
    contact = EmergencyContact(
        name=payload.name.strip(),
        phone=payload.phone.strip(),
        relation=payload.relation,
        is_primary=payload.is_primary,
    )
    db.add(contact)
    db.commit()
    db.refresh(contact)
    return contact


@router.put("/{contact_id}", response_model=ContactResponse)
async def update_contact(contact_id: int, payload: ContactUpdate, db: Session = Depends(get_db)):
    """Edit an existing emergency contact."""
    contact = db.query(EmergencyContact).filter(EmergencyContact.id == contact_id).first()
    if not contact:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contact not found.")

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(contact, field, value)

    db.commit()
    db.refresh(contact)
    return contact


@router.delete("/{contact_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_contact(contact_id: int, db: Session = Depends(get_db)):
    """Remove an emergency contact."""
    contact = db.query(EmergencyContact).filter(EmergencyContact.id == contact_id).first()
    if not contact:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contact not found.")

    db.delete(contact)
    db.commit()
    return None
