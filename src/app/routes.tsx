import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { TeacherProfile } from "./components/TeacherProfile";
import { Files } from "./components/Files";
import { Login } from "./components/Login";
import { NotFound } from "./components/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: Home },
      { path: "teacher/:id", Component: TeacherProfile },
      { path: "files", Component: Files },
      { path: "*", Component: NotFound },
    ],
  },
]);