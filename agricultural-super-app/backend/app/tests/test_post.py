import pytest
from app import app, db
from app.models.user import User
from io import BytesIO

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client
        with app.app_context():
            db.drop_all()

def register_and_login(client):
    client.post('/api/auth/register', json={
        'username': 'poster', 'email': 'poster@example.com', 'password': 'pass123'})
    login_resp = client.post('/api/auth/login', json={
        'email': 'poster@example.com', 'password': 'pass123'})
    token = login_resp.get_json()['token']
    return {'Authorization': f'Bearer {token}'}

def test_create_post(client):
    headers = register_and_login(client)
    data = {
        'title': 'Test Post',
        'content': 'This is a test post.'
    }
    response = client.post('/api/posts/', json=data, headers=headers)
    assert response.status_code == 201
    assert response.get_json()['title'] == 'Test Post'

def test_create_post_with_image(client):
    headers = register_and_login(client)
    data = {
        'title': 'Image Post',
        'content': 'Post with image.'
    }
    image = (BytesIO(b'my file contents'), 'test.jpg')
    response = client.post('/api/posts/', data={**data, 'image': image}, headers=headers, content_type='multipart/form-data')
    assert response.status_code in (201, 200)

def test_comment_and_like_post(client):
    headers = register_and_login(client)
    # Create post
    post_resp = client.post('/api/posts/', json={'title': 'A', 'content': 'B'}, headers=headers)
    post_id = post_resp.get_json()['id']
    # Comment
    resp = client.post(f'/api/posts/{post_id}/comments', json={'content': 'Nice!'}, headers=headers)
    assert resp.status_code == 201
    # Like
    resp = client.post(f'/api/posts/{post_id}/like', headers=headers)
    assert resp.status_code == 200
