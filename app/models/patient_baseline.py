import uuid

from sqlalchemy import Float, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin, UUIDPrimaryKeyMixin


class PatientBaseline(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "patient_baselines"

    patient_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("patients.id", ondelete="CASCADE"),
        unique=True,
        index=True,
        nullable=False,
    )
    baseline_hr: Mapped[float | None] = mapped_column(Float, nullable=True)
    baseline_spo2: Mapped[float | None] = mapped_column(Float, nullable=True)
    baseline_temperature: Mapped[float | None] = mapped_column(Float, nullable=True)
    baseline_rr: Mapped[float | None] = mapped_column(Float, nullable=True)
    baseline_systolic_bp: Mapped[float | None] = mapped_column(Float, nullable=True)
    baseline_diastolic_bp: Mapped[float | None] = mapped_column(Float, nullable=True)
    calculated_from_hours: Mapped[int] = mapped_column(Integer, nullable=False)

    patient: Mapped["Patient"] = relationship(back_populates="baseline")
