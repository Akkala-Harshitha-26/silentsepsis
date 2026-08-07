from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator


class UserLogin(BaseModel):
    email: str
    password: str

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        return value.strip().lower()


class AdminCreateUser(BaseModel):
    email: str
    staff_id: str = Field(min_length=1, max_length=80)
    full_name: str = Field(min_length=1, max_length=160)
    password: str = Field(min_length=8)
    role_name: str = Field(min_length=1, max_length=80)

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        return value.strip().lower()

    @field_validator("staff_id", "full_name", "role_name")
    @classmethod
    def strip_required_text(cls, value: str) -> str:
        return value.strip()


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserOut(BaseModel):
    id: UUID
    email: str
    staff_id: str
    full_name: str
    role: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
