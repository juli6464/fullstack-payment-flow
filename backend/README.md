# Fullstack Payment Flow - Backend

Backend API developed with **NestJS**, **TypeScript**, **Prisma ORM**, and **PostgreSQL** for a payment checkout flow.

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- Swagger
- Jest
- Docker

---

## Features

- Product catalog endpoint
- Transaction creation
- Customer registration
- Delivery information
- Payment processing workflow
- Prisma ORM integration
- Swagger API documentation
- Request validation using class-validator
- Seed script for sample products
- Clean modular architecture
- Payment Provider abstraction (Ports & Adapters ready)

---

## Requirements

- Node.js 20+
- Docker Desktop
- PostgreSQL (Docker)
- npm

---

## Installation

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

## Environment Variables

Create a `.env` file.

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/payment_flow?schema=public"

PORT=3000

PAYMENT_BASE_URL=https://sandbox.wompi.co/v1

PAYMENT_PUBLIC_KEY=

PAYMENT_PRIVATE_KEY=

PAYMENT_INTEGRITY_KEY=
```

---

## Start PostgreSQL

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

---

## Prisma

Generate Prisma Client

```bash
npx prisma generate
```

Run migrations

```bash
npx prisma migrate dev
```

Seed database

```bash
npx prisma db seed
```

Open Prisma Studio

```bash
npx prisma studio
```

---

## Run the application

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

## API Documentation

Swagger documentation is available at:

```
http://localhost:3000/api
```

---

## Available Endpoints

### Products

```
GET /products
```

### Transactions

```
POST /transactions
```

### Payments

```
POST /payments/process
```

---

## Testing

Run unit tests

```bash
npm test
```

Coverage

```bash
npm run test:cov
```

---

## Project Structure

```
src/

products/

transactions/

payments/

customers/

deliveries/

prisma/

common/
```

---
## Architecture

The payment module follows a **Ports & Adapters (Hexagonal)** approach.

Business logic depends on a `PaymentPort` abstraction while the external payment gateway is implemented through a provider adapter, allowing different payment gateways to be plugged in without modifying the application layer.

---
## Current Status

- ✅ Product API
- ✅ Transaction workflow
- ✅ Payment workflow (Mock Provider)
- ✅ PostgreSQL
- ✅ Prisma ORM
- ✅ Swagger
- ✅ Request Validation
- 🚧 Payment Gateway Integration
- 🚧 Unit Tests
- 🚧 Cloud Deployment

---