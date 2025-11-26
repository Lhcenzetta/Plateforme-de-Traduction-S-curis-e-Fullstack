import uuid

TEST_USERNAME = f"testuser_{uuid.uuid4().hex[:8]}"


def test_register_user(test_client):
    data = {
        "username": TEST_USERNAME,
        "full_name": "Test User",
        "email": f"{TEST_USERNAME}@mail.com",
        "password": "1234"
    }

    res = test_client.post("/ha/register", json=data)
    assert res.status_code == 200
    assert res.json()["username"] == TEST_USERNAME


def test_login_user(test_client):
    data = {
        "username": TEST_USERNAME,
        "password": "1234"
    }

    res = test_client.post("/ha/login", json=data)
    assert res.status_code == 200

    global TOKEN
    TOKEN = res.json()["access_token"]
    assert TOKEN != ""


def test_protected_translate(test_client):
    headers = {"Authorization": f"Bearer {TOKEN}"}

    res = test_client.post("/ha/translate?Text=hello&service=invalid-service", headers=headers)

    assert res.status_code == 200
    assert res.json() == "operation not fount ! please make sure you entre a right servise"
