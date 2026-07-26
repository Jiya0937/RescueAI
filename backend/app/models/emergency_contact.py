"""
SQLAlchemy model for a user's personal emergency contacts
(e.g. family members, friends) shown on the SOS page.
"""

from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func

from app.database.database import Base


class EmergencyContact(Base):
    __tablename__ = "emergency_contacts"

    id = Column(Integer, primary_key=True, index=True)

    # NOTE: if you already have user auth (see app.api.auth.auth), add:
    #   user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    # and filter every query in emergency.py by the logged-in user.
    # Left out here so this works standalone without assuming your User model's shape.

    name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    relation = Column(String(50), nullable=True)
    is_primary = Column(Boolean, default=False, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
