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

def register_and_login(client, username, email):
    client.post('/api/auth/register', json={
        'username': username, 'email': email, 'password': 'pass123'})
    login_resp = client.post('/api/auth/login', json={
        'email': email, 'password': 'pass123'})
    token = login_resp.get_json()['token']
    return {'Authorization': f'Bearer {token}'}

def test_send_and_receive_message(client):
    headers1 = register_and_login(client, 'user1', 'user1@example.com')
    headers2 = register_and_login(client, 'user2', 'user2@example.com')
    # Send message from user1 to user2
    resp = client.post('/api/messages/', json={
        'recipient': 'user2', 'content': 'Hello!'}, headers=headers1)
    assert resp.status_code == 201
    # User2 fetches messages
    resp = client.get('/api/messages/', headers=headers2)
    assert resp.status_code == 200
    assert any(m['content'] == 'Hello!' for m in resp.get_json())
