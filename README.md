# Plateforme de Traduction Securisee (Fullstack)

Application fullstack de traduction qui combine un backend FastAPI securise (JWT) et un frontend Next.js. Les textes sont traduits via l'API Hugging Face Inference (models Helsinki-NLP fr/en). L'authentification protege l'acces a la traduction et les tests backend couvrent les parcours principaux.

## Fonctionnalites
- Authentification JWT (inscription, connexion) avec FastAPI.
- Traduction fr <> en en s'appuyant sur Hugging Face Inference API.
- Interface Next.js/React avec formulaires (login, registre, traduction).
- Persistance SQLite et Docker Compose pour lancer frontend + backend.
- Tests backend (pytest + TestClient) pour auth et route protegee.

## Stack
- Backend : FastAPI, SQLAlchemy, python-jose, requests, SQLite.
- Frontend : Next.js 16 (App Router), React 19, Bootstrap 5.
- Outils : Docker, docker-compose, pytest, uvicorn.

## Arborescence
- `backend/` : API FastAPI (`APP/main.py`, `APP/auth.py`, `APP/translate.py`), models SQLAlchemy, tests.
- `frontend/app/` : application Next.js (`src/app/...`), pages accueil/login/registre/translat.
- `docker-compose.yml` : lancement coordonne des services `backend` (port 8000) et `frontend` (port 3000).

## Prerequis
- Python 3.11+ (l'image Docker utilise 3.13).
- Node.js 18+ et npm.
- Token Hugging Face Inference valide pour la traduction.

## Variables d'environnement (backend)
Creer `backend/.env` avec au minimum :
```
SECRET_KEY=change_me             # cle JWT
HF_API_TOKEN=hf_xxx              # token Hugging Face Inference
```
Sans `HF_API_TOKEN`, la route de traduction retournera une erreur API.

## Lancer en local (sans Docker)
Backend :
```bash
cd backend
python -m venv .venv && source .venv/bin/activate   # ou .venv\\Scripts\\activate sous Windows
pip install -r requirements.txt
export SECRET_KEY=change_me
export HF_API_TOKEN=hf_xxx
uvicorn APP.main:app --reload --port 8000
```

Frontend :
```bash
cd frontend/app
npm install
npm run dev   # http://localhost:3000
```
Le frontend dialogue avec l'API sur `http://127.0.0.1:8000`.

## Lancer avec Docker Compose
```bash
docker-compose up --build
```
- API : http://localhost:8000/docs
- Frontend : http://localhost:3000
Assurez-vous que `backend/.env` existe avant le build.

## API rapide
- `POST /ha/register` : inscription `{username, full_name, email, password}`.
- `POST /ha/login` : retourne `{access_token, token_type}`.
- `POST /ha/translate?Text=...&service=en-fr|fr-en` : header `Authorization: Bearer <token>`.

Exemple cURL :
```bash
TOKEN=$(curl -s -X POST http://127.0.0.1:8000/ha/login \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","password":"1234"}' | jq -r .access_token)

curl -X POST "http://127.0.0.1:8000/ha/translate?Text=Hello&service=en-fr" \
  -H "Authorization: Bearer $TOKEN"
```

## Tests
```bash
cd backend
pytest
```
Les tests utilisent une base SQLite de test (`test_db.sqlite`) et definissent automatiquement `HF_API_TOKEN` pour les appels simules.

## Notes
- Les mots de passe sont stockes en clair dans ce prototype; prevoir un hashing (bcrypt) avant production.
- Ajuster `SECRET_KEY`, la duree de validite et le stockage des tokens pour un usage reel.
