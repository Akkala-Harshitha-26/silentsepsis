import uuid

from sqlalchemy import ForeignKey, String
from sqlalchemy.dialects.postgresql import INET, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin, UUIDPrimaryKeyMixin


class AuditLog(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "audit_logs"

    user_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="SET NULL"),
        index=True,
        nullable=True,
    )
    action: Mapped[str] = mapped_column(String(120), index=True, nullable=False)
    entity: Mapped[str] = mapped_column(String(120), index=True, nullable=False)
    entity_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        index=True,
        nullable=True,
    )
    ip_address: Mapped[str | None] = mapped_column(INET, nullable=True)

    user: Mapped["User | None"] = relationship(back_populates="audit_logs")
