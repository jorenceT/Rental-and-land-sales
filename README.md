# Rental & Land Sales - Node API + Angular UI

Yes — for this product, the right architecture is:

`Angular UI (renderer) → Node.js API server → SQL database`

Do **not** connect SQL directly from browser/renderer code.

## What is included

### Backend (Node.js + Express + PostgreSQL)
- `src/server.js`:
  - `GET /api/health`
  - `POST /api/users`
- `src/db.js`: PostgreSQL connection pool
- `db/schema.sql`: `users` and `listings` schema

### Frontend (Angular)
- `frontend-angular/`: Angular standalone UI with reactive form
- `frontend-angular/src/app/user-api.service.ts`: API integration to backend
- `frontend-angular/src/app/app.component.*`: lead form and response rendering

## MVP website scope (initial)
1. Home + search UI for rentals and land listings
2. Lead capture (name/email/phone/role)
3. Listing module (rental / land sale)
4. Inquiry flow for each listing
5. Basic admin panel (next step)

## How user details are saved
1. User submits Angular form.
2. Angular calls `POST /api/users`.
3. Node server validates and writes to SQL.
4. Server returns created user record.

## Run backend
```bash
npm install
cp .env.example .env
# Create DB and run db/schema.sql
npm start
```

## Run Angular UI
```bash
cd frontend-angular
npm install
npm start
```
Angular dev server default: `http://localhost:4200`

## Android-ready path (later)
Because UI is Angular, you can later wrap it using Ionic + Capacitor:
1. Add Ionic components/screens
2. Build Angular app
3. Sync with Capacitor Android project
4. Open in Android Studio
