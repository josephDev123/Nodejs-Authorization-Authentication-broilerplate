import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { registerAction } from "./actions/registerAction";

export const mainroutes = createBrowserRouter([
  {
    path: "/",
    element: "welcome",
    errorElement: "error",
  },

  {
    path: "/login",
    element: <Login />,
    errorElement: "error",
  },

  {
    path: "/register",
    element: <Register />,
    errorElement: "error",
    action: registerAction,
  },
]);
