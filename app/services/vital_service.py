from datetime import datetime, timezone
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.vital_reading import VitalReading
from app.services.patient_service import get_patient


class VitalServiceError(Exception):
    message = "Vital service error"


class VitalPatientNotFoundError(VitalServiceError):
    message = "Patient not found"


def record_vital(
    db: Session,
    patient_id: UUID,
    payload,
    recorded_by: UUID,
) -> VitalReading:
    patient = get_patient(db, patient_id)

    recorded_at = payload.recorded_at or datetime.now(timezone.utc)
    if recorded_at.tzinfo is None:
        recorded_at = recorded_at.replace(tzinfo=timezone.utc)
    else:
        recorded_at = recorded_at.astimezone(timezone.utc)

    vital = VitalReading(
        patient_id=patient.id,
        recorded_by=recorded_by,
        heart_rate=payload.heart_rate,
        respiratory_rate=payload.respiratory_rate,
        systolic_bp=payload.systolic_bp,
        diastolic_bp=payload.diastolic_bp,
        spo2=payload.spo2,
        temperature=payload.temperature,
        recorded_at=recorded_at,
    )
    db.add(vital)
    db.commit()
    db.refresh(vital)
    return vital


def record_vitals_batch(
    db: Session,
    patient_id: UUID,
    payload,
    recorded_by: UUID,
) -> list[VitalReading]:
    patient = get_patient(db, patient_id)

    vitals: list[VitalReading] = []
    for reading in payload.readings:
        recorded_at = reading.recorded_at or datetime.now(timezone.utc)
        if recorded_at.tzinfo is None:
            recorded_at = recorded_at.replace(tzinfo=timezone.utc)
        else:
            recorded_at = recorded_at.astimezone(timezone.utc)

        vital = VitalReading(
            patient_id=patient.id,
            recorded_by=recorded_by,
            heart_rate=reading.heart_rate,
            respiratory_rate=reading.respiratory_rate,
            systolic_bp=reading.systolic_bp,
            diastolic_bp=reading.diastolic_bp,
            spo2=reading.spo2,
            temperature=reading.temperature,
            recorded_at=recorded_at,
        )
        db.add(vital)
        vitals.append(vital)

    try:
        db.commit()
    except Exception:
        db.rollback()
        raise

    for vital in vitals:
        db.refresh(vital)
    return vitals


def get_vitals_history(
    db: Session,
    patient_id: UUID,
    start_time: datetime | None = None,
    end_time: datetime | None = None,
    limit: int = 100,
    offset: int = 0,
) -> list[VitalReading]:
    get_patient(db, patient_id)

    query = select(VitalReading).where(VitalReading.patient_id == patient_id)
    if start_time is not None:
        query = query.where(VitalReading.recorded_at >= start_time)
    if end_time is not None:
        query = query.where(VitalReading.recorded_at <= end_time)
    query = query.order_by(VitalReading.recorded_at.desc())

    return list(db.scalars(query.limit(limit).offset(offset)).all())


def get_latest_vital(db: Session, patient_id: UUID) -> VitalReading | None:
    get_patient(db, patient_id)

    return db.scalar(
        select(VitalReading)
        .where(VitalReading.patient_id == patient_id)
        .order_by(VitalReading.recorded_at.desc())
        .limit(1)
    )
