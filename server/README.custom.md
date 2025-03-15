# Luxurious API Server

This is the API server for the Luxurious application, built with NestJS and PostgreSQL.

## Authentication System

The authentication system is built using JWT (JSON Web Tokens) and provides the following endpoints:

### Register a new user

```
POST /auth/register
```

Request body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isAdmin": false
  }
}
```

### Login

```
POST /auth/login
```

Request body:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isAdmin": false
  }
}
```

### Get user profile

```
GET /auth/profile
```

Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Response:
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "john.doe@example.com",
  "isAdmin": false
}
```

## User Management

The API also provides endpoints for user management:

### Get all users (admin only)

```
GET /users
```

Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Get user by ID

```
GET /users/:id
```

Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Update user

```
PUT /users/:id
```

Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Request body:
```json
{
  "firstName": "John",
  "lastName": "Smith"
}
```

### Delete user (admin only)

```
DELETE /users/:id
```

Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Environment Variables

The application uses the following environment variables:

- `DB_HOST`: PostgreSQL host (default: postgres)
- `DB_PORT`: PostgreSQL port (default: 5432)
- `DB_USERNAME`: PostgreSQL username (default: luxurioushc)
- `DB_PASSWORD`: PostgreSQL password (default: Admin@123)
- `DB_DATABASE`: PostgreSQL database name (default: luxuriousdb)
- `JWT_SECRET`: Secret key for JWT tokens (default: luxurious-secret-key)
- `PORT`: Port for the API server (default: 4000)

## Development

To run the application in development mode:

```bash
npm run start:dev
```

## Production

To build and run the application in production mode:

```bash
npm run build
npm run start:prod
```

## Docker

The application can be run using Docker Compose:

```bash
docker-compose up -d
```

This will start the PostgreSQL database, pgAdmin, the API server, and the web frontend. 