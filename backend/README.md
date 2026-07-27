# Fullstack Payment Flow - Backend

Backend API developed with **NestJS**, **TypeScript**, **Prisma ORM**, and **PostgreSQL** implementing a complete payment checkout flow integrated with **Wompi Sandbox**.

---

# Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- Docker
- Swagger
- Axios
- Helmet
- Jest

---

# Features

- Product catalog
- Transaction creation
- Customer registration
- Delivery information
- Payment processing with Wompi Sandbox
- Card tokenization
- Payment Source creation
- Integrity Signature generation
- Wompi transaction creation
- Transaction status synchronization
- Automatic inventory update after approved payments
- Swagger API documentation
- Request validation
- Seed script for sample products
- Ports & Adapters (Hexagonal Architecture)
- Coverage report (>80%)

---

# Requirements

- Node.js 20+
- Docker Desktop
- npm

---

# Installation

Clone the repository

```bash
git clone <repository-url>
cd backend
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file.

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/payment_flow?schema=public"

PORT=3000

PAYMENT_BASE_URL=https://api-sandbox.co.uat.wompi.dev/v1

PAYMENT_PUBLIC_KEY=

PAYMENT_PRIVATE_KEY=

PAYMENT_INTEGRITY_KEY=
```

---

# Database

Start PostgreSQL

```bash
docker compose up -d
```

or

```bash
docker run --name payment-db \
-e POSTGRES_USER=postgres \
-e POSTGRES_PASSWORD=postgres \
-e POSTGRES_DB=payment_flow \
-p 5432:5432 \
-d postgres:16
```

Generate Prisma Client

```bash
npx prisma generate
```

Run migrations

```bash
npx prisma migrate dev
```

Seed products

```bash
npx prisma db seed
```

Open Prisma Studio

```bash
npx prisma studio
```

---

# Run the application

Development

```bash
npm run start:dev
```

Production

```bash
npm run build
npm run start:prod
```

---

# API Documentation

Swagger is available at

```
http://localhost:3000/api
```

---

# Available Endpoints

## Products

```
GET /products
```

Returns the available product catalog.

---

## Transactions

```
POST /transactions
GET /transactions
GET /transactions/{id}
```

Allows creating and querying purchase transactions.

---

## Payments

```
POST /payments/process
```

Processes a payment through the Wompi Sandbox API.

---

# Checkout Flow

```
GET /products

↓

POST /transactions

↓

POST /payments/process

↓

GET /transactions/{id}
```

---

# Security

- Helmet security headers
- DTO validation
- Global ValidationPipe
- Input sanitization
- Environment variables

---

# Architecture

The payment integration follows a **Ports & Adapters (Hexagonal Architecture)** approach.

Business logic depends on the `PaymentPort` abstraction while the Wompi integration is implemented as an adapter (`PaymentProvider`). This allows replacing the payment gateway without modifying the application layer.

---

# Testing

Run tests

```bash
npm test
```

Coverage

```bash
npm run test:cov
```

---
Run transaction service tests only

```bash
npm test -- transactions.service.spec.ts
```

Run payment service tests only

```bash
npm test -- payments.service.spec.ts
```
---

# Current Status

- ✅ Product API
- ✅ Transaction API
- ✅ Payment API
- ✅ Wompi Sandbox Integration
- ✅ PostgreSQL
- ✅ Prisma ORM
- ✅ Docker
- ✅ Swagger
- ✅ Request Validation
- ✅ Security Headers (Helmet)
- ✅ Ports & Adapters
- ✅ Unit Tests
- 🚧 Cloud Deployment