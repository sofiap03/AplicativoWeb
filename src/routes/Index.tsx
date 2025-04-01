// Core
import { FC } from "react";
import { useRoutes } from "react-router-dom";

// Pages
import Login from "../pages/Auth/Login";
import Home from "../pages/Home/Index";
import NotFound from "../pages/NotFound/Index";

const AppRouter: FC = () => {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "login", element: <Login /> },
    { path: "*", element: <NotFound /> },
  ]);
  return routes;
};

export default AppRouter;
