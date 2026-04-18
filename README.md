# Rental & Land Sales - Initial Application Plan

This starter project gives you a practical baseline for a rental and land-sale website using **Node.js + SQL**.

## Can we use Node.js + SQL in the renderer?
Short answer: **do not connect SQL directly from the renderer/browser**.

- Browser (renderer) code is public and insecure for DB credentials.
- SQL must run on a trusted **server layer** (Node.js backend).
- Frontend should call backend APIs (e.g., `/api/users`) and backend talks to SQL.

## Initial website features (MVP)
1. **Landing page**
   - Search rentals / land sales by location and budget
2. **User registration / lead capture**
   - Name, email, phone, buyer/seller role
3. **Listing module**
   - Add rental or land listing with title, location, price, details
4. **Admin basic dashboard**
   - View users and listings
5. **Contact / inquiry form**
   - Save interest against a listing

## How user details are saved (recommended flow)
1. User submits form in frontend.
2. Frontend sends HTTPS request to Node API.
3. Node validates/sanitizes data.
4. Node stores data in SQL (PostgreSQL/MySQL).
5. API returns safe response (no sensitive internals).

## Included in this repo
- `src/server.js`: Express API with endpoint to save users
- `src/db.js`: PostgreSQL pool connection
- `db/schema.sql`: tables for users and listings
- `public/index.html`: simple form posting to backend
- `.env.example`: environment variables for local setup

## Quick start
```bash
npm install
cp .env.example .env
# create database: rental_land_sales
# then run schema SQL in your DB
npm start
```

Open: `http://localhost:4000`

## Next recommended improvements
- JWT authentication + password hashing (`bcrypt`)
- Role-based access (admin/agent/user)
- File upload for listing images (S3/Cloudinary)
- Proper validation library (`zod`/`joi`)
- Production deployment (Nginx + PM2 + managed PostgreSQL)
