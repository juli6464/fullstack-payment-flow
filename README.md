# 💳 Fullstack Payment Flow

A full-stack e-commerce checkout application that simulates a real payment workflow using the Wompi Sandbox API.

The project includes a React frontend and a NestJS backend following a clean architecture approach, allowing customers to purchase products, process payments, and automatically update inventory after successful transactions.

---

# 🚀 Features

- Product catalog
- Product checkout
- Customer information capture
- Delivery information
- Payment processing
- Wompi Sandbox integration
- Transaction management
- Automatic stock update
- Success and Failed payment pages
- Checkout persistence after browser refresh
- Responsive interface
- Form validation with Zod
- Unit testing

---

# 🏗 Architecture

### Frontend

- React 19
- TypeScript
- Vite
- Material UI
- Redux Toolkit
- React Router
- React Hook Form
- Zod
- Axios

### Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Swagger
- Jest

---

# 📂 Project Structure

```
payment-flow/
│
├── backend/
│   ├── src/
│   └── README.md
│
├── frontend/
│   ├── src/
│   └── README.md
│
└── README.md
```

---

# ⚙️ Getting Started

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies for both projects.

## Backend

```bash
cd backend
npm install
```

Run

```bash
npm run start:dev
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---


# 🔄 Checkout Flow

1. Browse available products.
2. Select a product.
3. Complete the checkout form.
4. Create a transaction.
5. Process payment through Wompi Sandbox.
6. Update stock if payment is approved.
7. Display the transaction result.

---

# ✅ Implemented

- Product catalog
- Checkout flow
- Payment integration
- Transaction management
- Stock management
- Responsive UI
- Form validation
- Persistent checkout after refresh
- Success and Failed pages
- Unit testing
- Swagger API documentation

---

# 📖 Documentation

Each project contains its own documentation.

- `backend/README.md`
- `frontend/README.md`