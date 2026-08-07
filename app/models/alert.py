import enum
import uuid
from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, Index, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin, UUIDPrimaryKeyMixin


class AlertSeverity(str, enum.Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class AlertStatus(str, enum.Enum):
    NEW = "NEW"
    ACKNOWLEDGED = "ACKNOWLEDGED"
    RESOLVED = "RESOLVED"
    DISMISSED = "DISMISSED"


class Alert(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "alerts"
    __table_args__ = (
        Index("ix_alerts_patient_status_created_at", "patient_id", "status", "created_at"),
    )

    patient_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("patients.id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )
    prediction_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("predictions.id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )
    severity: Mapped[AlertSeverity] = mapped_column(
        Enum(AlertSeverity, name="alert_severity"),
        index=True,
        nullable=False,
    )
    status: Mapped[AlertStatus] = mapped_column(
        Enum(AlertStatus, name="alert_status"),
        index=True,
        nullable=False,
    )
    message: Mapped[str] = mapped_column(Text, nullable=False)
    acknowledged_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )
    resolved_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )
    acknowledged_by: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="SET NULL"),
        index=True,
        nullable=True,
    )

    patient: Mapped["Patient"] = relationship(back_populates="alerts")
    prediction: Mapped["Prediction"] = relationship(back_populates="alerts")
    acknowledged_by_user: Mapped["User | None"] = relationship(
        back_populates="acknowledged_alerts",
        foreign_keys=[acknowledged_by],
    )
    feedback: Mapped[list["Feedback"]] = relationship(
        back_populates="alert",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
