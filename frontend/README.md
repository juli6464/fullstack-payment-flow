# Fullstack Payment Flow - Frontend

Frontend application developed with **React**, **TypeScript**, **Vite**, and **Material UI** for the Fullstack Payment Flow technical challenge.

The application allows users to browse products, complete a secure checkout process, simulate payments through a Wompi Sandbox integration, and view the transaction result.

---

# Features

- Product catalog
- Product detail and order summary
- Checkout form
- Form validation with React Hook Form + Zod
- Input sanitization (letters, numbers, phone and card fields)
- Payment processing
- Transaction creation
- Payment status pages (Success / Failed)
- Responsive design
- Loading states during payment processing
- Checkout persistence after browser refresh
- Redux Toolkit state management
- API integration using Axios

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

---

# Project Structure

```
src/
│
├── api/
├── assets/
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

Go to the project

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

# Run the project

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

Run tests

```bash
npm test
```

Run coverage

```bash
npm run test:coverage
```

---
# Payment Provider

The frontend communicates with a NestJS backend that integrates with the Wompi Sandbox API.

The payment flow consists of:

- Create transaction
- Process payment
- Display transaction result
- Update product stock

---
# Payment Flow

1. Select a product.
2. Go to Checkout.
3. Complete customer information.
4. Complete payment information.
5. A transaction is created.
6. Payment is processed through the backend.
7. If approved:
   - Success page is displayed.
   - Product stock is updated.
   - Checkout information is cleared.
8. If rejected:
   - Failed page is displayed.
   - Customer information is preserved.

---

# Implemented Improvements

- Client-side form validation
- Responsive layout
- Checkout recovery after browser refresh
- Automatic input sanitization
- Payment status pages
- Loading indicators while processing requests
- Redux state management
- Persistent checkout using Local Storage

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
- 🚧 Unit tests
