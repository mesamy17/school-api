# User Management API

Endpoints:

- POST /api/register — Register user
- POST /api/login — Login and receive JWT
- PUT /api/user — Update authenticated user (Bearer token)
- DELETE /api/user — Delete authenticated user (Bearer token)

Postman examples (JSON bodies):

1. Register
   POST http://localhost:3000/api/register
   Headers: Content-Type: application/json
   Body:
   {
   "name": "Alice",
   "email": "alice@example.com",
   "password": "strongpassword",
   "phoneNumber": "1234567890"
   }

2. Login
   POST http://localhost:3000/api/login
   Headers: Content-Type: application/json
   Body:
   {
   "email": "alice@example.com",
   "password": "strongpassword"
   }

3. Update User
   PUT http://localhost:3000/api/user
   Headers:
   Authorization: Bearer <token>
   Content-Type: application/json
   Body (any subset):
   {
   "name": "Alice Updated",
   "phoneNumber": "0987654321"
   }

4. Delete User
   DELETE http://localhost:3000/api/user
   Headers:
   Authorization: Bearer <token>

Run locally:

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies:

```bash
npm install
```

3. Start dev server:

```bash
npm run dev
```
