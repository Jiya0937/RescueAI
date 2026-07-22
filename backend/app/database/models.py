import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.database.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    profile_image = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    last_login = Column(DateTime, nullable=True)
    account_status = Column(String(50), default="active")

    profile = relationship("Profile", back_populates="user", uselist=False, cascade="all, delete-orphan")


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)

    # Personal Information
    full_name = Column(String(255), nullable=True)
    gender = Column(String(50), nullable=True)
    dob = Column(String(50), nullable=True)
    age = Column(String(10), nullable=True)
    phone = Column(String(50), nullable=True)
    alt_phone = Column(String(50), nullable=True)
    address = Column(Text, nullable=True)
    city = Column(String(100), nullable=True)
    state = Column(String(100), nullable=True)
    country = Column(String(100), nullable=True)
    postal_code = Column(String(20), nullable=True)
    nationality = Column(String(100), nullable=True)

    # Medical Information
    blood_group = Column(String(10), nullable=True)
    height = Column(String(20), nullable=True)
    weight = Column(String(20), nullable=True)
    bmi = Column(String(20), nullable=True)
    known_diseases = Column(Text, nullable=True)
    allergies = Column(Text, nullable=True)
    medications = Column(Text, nullable=True)
    disabilities = Column(Text, nullable=True)
    pregnancy_status = Column(String(50), nullable=True)
    organ_donor = Column(Boolean, default=False)
    medical_notes = Column(Text, nullable=True)
    family_history = Column(Text, nullable=True)
    vaccination_status = Column(String(100), nullable=True)
    primary_doctor = Column(String(255), nullable=True)
    hospital_preference = Column(String(255), nullable=True)

    # Emergency Information (Up to 5 Contacts)
    emergency_contact_1_name = Column(String(255), nullable=True)
    emergency_contact_1_relationship = Column(String(100), nullable=True)
    emergency_contact_1_phone = Column(String(50), nullable=True)

    emergency_contact_2_name = Column(String(255), nullable=True)
    emergency_contact_2_relationship = Column(String(100), nullable=True)
    emergency_contact_2_phone = Column(String(50), nullable=True)

    emergency_contact_3_name = Column(String(255), nullable=True)
    emergency_contact_3_relationship = Column(String(100), nullable=True)
    emergency_contact_3_phone = Column(String(50), nullable=True)

    emergency_contact_4_name = Column(String(255), nullable=True)
    emergency_contact_4_relationship = Column(String(100), nullable=True)
    emergency_contact_4_phone = Column(String(50), nullable=True)

    emergency_contact_5_name = Column(String(255), nullable=True)
    emergency_contact_5_relationship = Column(String(100), nullable=True)
    emergency_contact_5_phone = Column(String(50), nullable=True)

    preferred_hospital = Column(String(255), nullable=True)
    preferred_language = Column(String(50), default="en")

    # Biometric Information (Status flags only)
    profile_photo = Column(String(500), nullable=True)
    fingerprint_enabled = Column(Boolean, default=False)
    face_auth_enabled = Column(Boolean, default=False)
    voice_auth_enabled = Column(Boolean, default=False)
    biometric_last_updated = Column(String(100), nullable=True)

    # Device Information
    device_name = Column(String(255), nullable=True)
    platform = Column(String(100), nullable=True)
    emergency_offline_status = Column(String(100), default="Active")
    last_sync_time = Column(String(100), nullable=True)

    # Demographic Information (Optional)
    occupation = Column(String(100), nullable=True)
    education = Column(String(100), nullable=True)
    marital_status = Column(String(50), nullable=True)
    religion = Column(String(100), nullable=True)
    community = Column(String(100), nullable=True)

    # Profile Completion Metrics
    completion_percentage = Column(Integer, default=20)

    user = relationship("User", back_populates="profile")
