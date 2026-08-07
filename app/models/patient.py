import enum
import uuid
from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin, UUIDPrimaryKeyMixin


class Gender(str, enum.Enum):
    MALE = "MALE"
    FEMALE = "FEMALE"
    OTHER = "OTHER"
    UNKNOWN = "UNKNOWN"


class PatientStatus(str, enum.Enum):
    ADMITTED = "ADMITTED"
    TRANSFERRED = "TRANSFERRED"
    DISCHARGED = "DISCHARGED"
    DECEASED = "DECEASED"


class Patient(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "patients"

    hospital_patient_id: Mapped[str] = mapped_column(
        String(80),
        unique=True,
        index=True,
        nullable=False,
    )
    full_name: Mapped[str] = mapped_column(String(160), index=True, nullable=False)
    age: Mapped[int] = mapped_column(Integer, nullable=False)
    gender: Mapped[Gender] = mapped_column(
        Enum(Gender, name="patient_gender"),
        nullable=False,
    )
    admission_date: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        index=True,
        nullable=False,
    )
    discharge_date: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )
    diagnosis: Mapped[str | None] = mapped_column(Text, nullable=True)
    ward_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("wards.id", ondelete="RESTRICT"),
        index=True,
        nullable=False,
    )
    current_status: Mapped[PatientStatus] = mapped_column(
        Enum(PatientStatus, name="patient_status"),
        index=True,
        nullable=False,
    )

    ward: Mapped["Ward"] = relationship(back_populates="patients")
    baseline: Mapped["PatientBaseline | None"] = relationship(
        back_populates="patient",
        cascade="all, delete-orphan",
        passive_deletes=True,
        uselist=False,
    )
    vital_readings: Mapped[list["VitalReading"]] = relationship(
        back_populates="patient",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
    predictions: Mapped[list["Prediction"]] = relationship(
        back_populates="patient",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
    alerts: Mapped[list["Alert"]] = relationship(
        back_populates="patient",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
