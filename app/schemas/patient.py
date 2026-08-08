from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.models.patient import Gender, PatientStatus


class PatientCreate(BaseModel):
    name: str = Field(min_length=1, max_length=160)
    age: int = Field(ge=0)
    sex: Gender
    ward_id: UUID
    bed_number: str = Field(min_length=1, max_length=40)
    admission_date: datetime
    admission_reason: str = Field(min_length=1)

    @field_validator("name", "bed_number", "admission_reason")
    @classmethod
    def strip_required_text(cls, value: str) -> str:
        return value.strip()


class PatientUpdate(BaseModel):
    ward_id: UUID | None = None
    bed_number: str | None = Field(default=None, min_length=1, max_length=40)
    discharge_date: datetime | None = None
    discharge_status: PatientStatus | None = None

    @field_validator("bed_number")
    @classmethod
    def strip_bed_number(cls, value: str | None) -> str | None:
        return value.strip() if value is not None else value


class PatientWardOut(BaseModel):
    id: UUID
    name: str
    capacity: int


class PatientOut(BaseModel):
    id: UUID
    name: str
    age: int
    sex: Gender
    ward: PatientWardOut
    bed_number: str
    admission_date: datetime
    discharge_date: datetime | None
    discharge_status: PatientStatus
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class PatientListItem(BaseModel):
    id: UUID
    name: str
    ward_name: str
    bed_number: str
    risk_tier: str | None
    current_status: PatientStatus


class PatientBaselineCreate(BaseModel):
    baseline_hr: float | None = None
    baseline_spo2: float | None = None
    baseline_temperature: float | None = None
    baseline_rr: float | None = None
    baseline_systolic_bp: float | None = None
    baseline_diastolic_bp: float | None = None
    calculated_from_hours: int = Field(ge=0)


class PatientBaselineOut(PatientBaselineCreate):
    id: UUID
    patient_id: UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
