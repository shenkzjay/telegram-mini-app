import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { Earn } from "./pages/earn.tsx";
import { Wallet } from "./pages/wallet.tsx";
import { Task } from "./pages/task.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/earn",
    element: <Earn />,
  },
  {
    path: "/wallet",
    element: <Wallet />,
  },
  {
    path: "/task",
    element: <Task />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
