import pytest
from app import app, db
from app.models.user import User

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

def test_profile_view_and_update(client):
    # Register and login
    client.post('/api/auth/register', json={
        'username': 'user1', 'email': 'user1@example.com', 'password': 'pass123'} )
    login_resp = client.post('/api/auth/login', json={
        'email': 'user1@example.com', 'password': 'pass123'})
    token = login_resp.get_json()['token']
    headers = {'Authorization': f'Bearer {token}'}

    # View profile
    resp = client.get('/api/user/profile', headers=headers)
    assert resp.status_code == 200
    # Update profile
    resp = client.put('/api/user/profile', json={'bio': 'New bio'}, headers=headers)
    assert resp.status_code == 200
    assert resp.get_json()['bio'] == 'New bio'

def test_follow_unfollow(client):
    # Register two users
    client.post('/api/auth/register', json={
        'username': 'user1', 'email': 'user1@example.com', 'password': 'pass123'})
    client.post('/api/auth/register', json={
        'username': 'user2', 'email': 'user2@example.com', 'password': 'pass123'})
    login_resp = client.post('/api/auth/login', json={
        'email': 'user1@example.com', 'password': 'pass123'})
    token = login_resp.get_json()['token']
    headers = {'Authorization': f'Bearer {token}'}
    # Follow user2
    resp = client.post('/api/user/follow', json={'username': 'user2'}, headers=headers)
    assert resp.status_code == 200
    # Unfollow user2
    resp = client.post('/api/user/unfollow', json={'username': 'user2'}, headers=headers)
    assert resp.status_code == 200
