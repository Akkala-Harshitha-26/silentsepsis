import enum
import uuid

from sqlalchemy import Enum, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin, UUIDPrimaryKeyMixin


class FeedbackType(str, enum.Enum):
    CONFIRMED = "CONFIRMED"
    FALSE_POSITIVE = "FALSE_POSITIVE"
    MISSED_CASE = "MISSED_CASE"
    OTHER = "OTHER"


class Feedback(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "feedback"

    alert_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("alerts.id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )
    clinician_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="SET NULL"),
        index=True,
        nullable=True,
    )
    feedback_type: Mapped[FeedbackType] = mapped_column(
        Enum(FeedbackType, name="feedback_type"),
        index=True,
        nullable=False,
    )
    comments: Mapped[str | None] = mapped_column(Text, nullable=True)

    alert: Mapped["Alert"] = relationship(back_populates="feedback")
    clinician: Mapped["User | None"] = relationship(back_populates="feedback")
