import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Users from "./components/User/Users/Users";
import { createBrowserRouter } from "react-router-dom";

const routerConfig = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Home /> }, // Render Home component when URL is '/'
      //   {
      //     path: "login",
      //     element: <LogIn />,
      //   },
      //   {
      //     path: "signup",
      //     element: <UserCreate />,
      //   },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
];

// Export router as an instantiated object
// -----------------------------------------------------
export const router = createBrowserRouter(routerConfig);
