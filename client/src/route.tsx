import { createBrowserRouter } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { registerAction } from "./actions/registerAction";
import { loginAction } from "./actions/loginAction";
import Otp from "./components/otp/Otp";

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
    action: loginAction,
  },

  {
    path: "/register",
    element: <Register />,
    errorElement: "error",
    action: registerAction,
  },
  {
    path: "/otp",
    element: <Otp />,
    errorElement: "error",
  },
]);
