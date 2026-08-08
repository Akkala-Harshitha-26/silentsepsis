from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin, UUIDPrimaryKeyMixin


class Ward(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "wards"

    ward_name: Mapped[str] = mapped_column(
        String(120),
        unique=True,
        index=True,
        nullable=False,
    )
    department: Mapped[str] = mapped_column(String(120), index=True, nullable=False)
    capacity: Mapped[int] = mapped_column(Integer, nullable=False)
    floor: Mapped[int | None] = mapped_column(Integer, nullable=True)

    patients: Mapped[list["Patient"]] = relationship(back_populates="ward")
