import bcrypt
import jwt
from datetime import datetime, timedelta
import os

SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'default-secret')


def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def check_password(password, hashed):
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))


def create_access_token(identity, expires_delta=timedelta(hours=1)):
    payload = {
        'sub': identity,
        'exp': datetime.utcnow() + expires_delta
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')


def decode_access_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
