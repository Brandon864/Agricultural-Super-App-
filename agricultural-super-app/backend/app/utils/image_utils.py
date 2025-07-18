import os
from werkzeug.utils import secure_filename
from uuid import uuid4

ALLOWED_EXTENSIONS = set(os.getenv('ALLOWED_EXTENSIONS', 'jpg,jpeg,png,gif').split(','))


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def save_image(file, upload_folder):
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        unique_name = f"{uuid4().hex}_{filename}"
        file_path = os.path.join(upload_folder, unique_name)
        file.save(file_path)
        return unique_name
    return None
