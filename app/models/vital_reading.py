import uuid
from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin, UUIDPrimaryKeyMixin


class VitalReading(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "vital_readings"
    __table_args__ = (
        Index("ix_vital_readings_patient_recorded_at", "patient_id", "recorded_at"),
    )

    patient_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("patients.id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )
    heart_rate: Mapped[float | None] = mapped_column(Float, nullable=True)
    systolic_bp: Mapped[float | None] = mapped_column(Float, nullable=True)
    diastolic_bp: Mapped[float | None] = mapped_column(Float, nullable=True)
    respiratory_rate: Mapped[float | None] = mapped_column(Float, nullable=True)
    spo2: Mapped[float | None] = mapped_column(Float, nullable=True)
    temperature: Mapped[float | None] = mapped_column(Float, nullable=True)
    recorded_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )

    patient: Mapped["Patient"] = relationship(back_populates="vital_readings")
