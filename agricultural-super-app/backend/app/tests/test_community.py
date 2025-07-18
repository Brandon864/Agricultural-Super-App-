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

def register_and_login(client):
    client.post('/api/auth/register', json={
        'username': 'commuser', 'email': 'comm@example.com', 'password': 'pass123'})
    login_resp = client.post('/api/auth/login', json={
        'email': 'comm@example.com', 'password': 'pass123'})
    token = login_resp.get_json()['token']
    return {'Authorization': f'Bearer {token}'}

def test_create_and_join_community(client):
    headers = register_and_login(client)
    # Create
    resp = client.post('/api/communities/', json={'name': 'AgriGroup'}, headers=headers)
    assert resp.status_code == 201
    # Join
    resp = client.post('/api/communities/join', json={'name': 'AgriGroup'}, headers=headers)
    assert resp.status_code == 200

def test_list_communities(client):
    headers = register_and_login(client)
    client.post('/api/communities/', json={'name': 'AgriGroup'}, headers=headers)
    resp = client.get('/api/communities/', headers=headers)
    assert resp.status_code == 200
    assert any(c['name'] == 'AgriGroup' for c in resp.get_json())
