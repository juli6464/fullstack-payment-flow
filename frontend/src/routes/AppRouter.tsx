import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import CheckoutPage from '../pages/CheckoutPage';
import SuccessPage from '../pages/SuccessPage';
import FailedPage from '../pages/FailedPage';
import NotFoundPage from '../pages/NotFoundPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/checkout"
          element={<CheckoutPage />}
        />

        <Route
          path="/success"
          element={<SuccessPage />}
        />

        <Route
          path="/failed"
          element={<FailedPage />}
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}