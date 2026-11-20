# TaskBoard API

A REST API for a small freelance and task marketplace, built with Node.js and TypeScript.

This is my first time working with Node.js and TypeScript, I'm using this project as practice.

TaskBoard allows users to create accounts, publish tasks and apply to tasks posted by other users. The project is being developed as a portfolio project to explore backend development, REST API design, database management, authentication and software architecture.

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| TypeScript | Type-safe development |
| Express | REST API framework |
| PostgreSQL | Relational database |
| Prisma ORM | Database access and migrations |
| Docker | Database containerization |
| bcrypt | Password hashing |
| JSON Web Tokens | Authentication (planned) |
| Zod | Request validation (planned) |
| Jest & Supertest | Automated testing (planned) |

## Current Features

- User registration
- Email uniqueness checks
- Password hashing using bcrypt
- PostgreSQL database integration
- Database schema and migrations using Prisma
- Separated application layers (Routes, Controllers, Services and Repositories)

## Planned Features

- User login
- JWT-based authentication
- Protected API endpoints
- Task creation, retrieval, updating and deletion
- Applying to tasks
- Application management
- Input validation using Zod
- Automated API testing

## Project Structure

```text
TaskBoard/
├── generated/
│   └── prisma/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── app.ts
│   └── server.ts
├── tests/
├── .env
├── .gitignore
├── docker-compose.yml
├── package.json
├── prisma.config.ts
└── tsconfig.json
```

## Architecture

The application uses a layered architecture to separate responsibilities and keep the code maintainable.

- **Routes:** Define the available API endpoints.
- **Controllers:** Handle incoming HTTP requests and responses.
- **Services:** Contain application logic and business rules.
- **Repositories:** Handle database operations through Prisma.
- **Config:** Contains shared application configuration, including the database connection.

This separation makes individual components easier to maintain, test and extend.

## Database

TaskBoard uses PostgreSQL as its relational database, managed through Prisma ORM.

The current database schema contains three main models:

- **User:** Stores user information and hashed passwords.
- **Task:** Represents tasks created by users.
- **Application:** Represents applications submitted by users for available tasks.

Prisma migrations are used to manage database schema changes.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Docker Desktop
- Git

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd TaskBoard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://taskboard:taskboard_dev@localhost:5432/taskboard?schema=public"
```

### 4. Start the database

Start the PostgreSQL container using Docker Compose:

```bash
docker compose up -d
```

### 5. Run database migrations

```bash
npx prisma migrate dev
```

### 6. Generate the Prisma Client

```bash
npx prisma generate
```

### 7. Start the development server

```bash
npm run dev
```

The API will be available at:

`http://localhost:3000`

## API Endpoints

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Checks whether the API is running |

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Registers a new user |

### Example: User Registration

**Request**

```http
POST /api/auth/register
Content-Type: application/json
```

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "SecurePassword123!"
}
```

**Successful Response — 201 Created**

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "test@example.com",
    "createdAt": "2026-11-18T18:55:46.836Z"
  }
}
```

## Security

Security is considered during development of the API.

Currently implemented:

- Passwords are hashed using bcrypt before being stored.
- Email addresses are unique in the database.
- Password hashes are excluded from user registration responses.

Additional security measures, including JWT authentication, authorization and request validation, are planned.

## Project Status

TaskBoard is currently under active development.

The initial API setup, PostgreSQL integration and user registration functionality have been implemented. Authentication and the core task management features are still being developed.

