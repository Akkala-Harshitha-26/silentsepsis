from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from app.core.security import create_access_token, hash_password, verify_password
from app.models.role import Role
from app.models.user import User
from app.schemas.auth import AdminCreateUser


class AuthServiceError(Exception):
    message = "Authentication service error"


class InvalidCredentialsError(AuthServiceError):
    message = "Invalid email or password"


class DuplicateEmailError(AuthServiceError):
    message = "Email is already registered"


class DuplicateStaffIdError(AuthServiceError):
    message = "Staff ID is already registered"


class InvalidRoleError(AuthServiceError):
    message = "Invalid role"


class BootstrapCompletedError(AuthServiceError):
    message = "Bootstrap has already been completed"


def authenticate_user(db: Session, email: str, password: str) -> User:
    normalized_email = email.strip().lower()
    user = db.scalar(
        select(User)
        .options(joinedload(User.role))
        .where(User.email == normalized_email)
    )
    if user is None or not verify_password(password, user.hashed_password):
        raise InvalidCredentialsError()

    user.last_login = datetime.now(timezone.utc)
    db.commit()
    db.refresh(user)
    return user


def create_user(db: Session, payload: AdminCreateUser) -> User:
    if db.scalar(select(User.id).where(User.email == payload.email)) is not None:
        raise DuplicateEmailError()

    if db.scalar(select(User.id).where(User.staff_id == payload.staff_id)) is not None:
        raise DuplicateStaffIdError()

    role = db.scalar(select(Role).where(Role.name == payload.role_name))
    if role is None:
        raise InvalidRoleError()

    user = User(
        email=payload.email,
        staff_id=payload.staff_id,
        full_name=payload.full_name,
        hashed_password=hash_password(payload.password),
        role_id=role.id,
        role=role,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def bootstrap_admin(db: Session, payload: AdminCreateUser) -> User:
    admin_role = db.scalar(select(Role).where(Role.name == "Admin"))
    if admin_role is None:
        raise InvalidRoleError()

    existing_admin = db.scalar(select(User.id).where(User.role_id == admin_role.id))
    if existing_admin is not None:
        raise BootstrapCompletedError()

    admin_payload = payload.model_copy(update={"role_name": "Admin"})
    return create_user(db, admin_payload)


def create_access_token_for_user(user: User) -> str:
    return create_access_token(subject=str(user.id), role=user.role.name)


def to_user_out(user: User) -> dict[str, object]:
    return {
        "id": user.id,
        "email": user.email,
        "staff_id": user.staff_id,
        "full_name": user.full_name,
        "role": user.role.name,
        "created_at": user.created_at,
    }
