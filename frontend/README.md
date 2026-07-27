# Fullstack Payment Flow - Frontend

Frontend application developed with **React**, **TypeScript**, **Vite**, and **Material UI** for the Fullstack Payment Flow technical challenge.

The application allows users to browse products, complete a secure checkout process, simulate payments through a NestJS backend integrated with the Wompi Sandbox API, and view the transaction result.

---

# Features

- Product catalog
- Order summary
- Checkout flow
- Payment processing
- Success and Failed payment pages
- Responsive design
- Checkout persistence after browser refresh
- Loading indicators
- Form validation with React Hook Form + Zod
- Input sanitization
- Redux Toolkit state management
- Axios API integration

---

# Tech Stack

- React 19
- TypeScript
- Vite
- React Router DOM
- Redux Toolkit
- Axios
- Material UI
- React Hook Form
- Zod
- Vitest
- Testing Library

---

# Project Structure

```text
src/
│
├── api/
├── assets/
├── checkout/
├── components/
├── layout/
├── pages/
├── routes/
├── schemas/
├── services/
├── store/
├── theme/
├── types/
└── utils/
```

---

# Requirements

- Node.js 20+
- npm

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Enter the project

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the project root.

```env
VITE_API_URL=http://localhost:3000
```

---

# Running the Application

Development

```bash
npm run dev
```

Production build

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

# Testing

Run all tests

```bash
npm test
```

Run coverage

```bash
npm run test:coverage
```

The project includes unit tests for:

- API layer
- Services
- Checkout flow
- Redux slice
- Validation schemas
- Reusable form components
- Main pages

---

# Quality

- ✅ TypeScript
- ✅ React Hook Form
- ✅ Zod validation
- ✅ Redux Toolkit
- ✅ Axios API layer
- ✅ Unit tests with Vitest
- ✅ Testing Library
- ✅ Coverage report (>80%)

---

# Payment Flow

1. Browse available products.
2. Select a product.
3. Complete the checkout form.
4. Create the transaction.
5. Process the payment.
6. Display the payment result.
7. Update product stock.
8. Clear checkout information after a successful purchase.

---

# Payment Provider

The frontend communicates with a NestJS backend that integrates with the **Wompi Sandbox API**.

Flow:

- Create transaction
- Process payment
- Retrieve transaction details
- Update stock
- Display transaction status

---

# Implemented Improvements

- Client-side validation
- Responsive layout
- Checkout persistence using Local Storage
- Automatic input sanitization
- Loading indicators
- Success and Failed pages
- Redux Toolkit state management
- Modular service architecture
- Reusable UI components

---

# Current Status

- ✅ Product catalog
- ✅ Checkout flow
- ✅ Payment integration
- ✅ Form validation
- ✅ Responsive UI
- ✅ Checkout persistence
- ✅ Success page
- ✅ Failed page
- ✅ API integration
- ✅ Unit tests