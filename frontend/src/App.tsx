import { useEffect } from "react";

import AppRouter from "./routes/AppRouter";

import { useAppDispatch } from "./store/hooks";
import { restoreCheckout } from "./store/slices/checkoutSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const saved = localStorage.getItem("selected-product");

    if (saved) {
      dispatch(
        restoreCheckout(
          JSON.parse(saved),
        ),
      );
    }
  }, [dispatch]);

  return <AppRouter />;
}

export default App;