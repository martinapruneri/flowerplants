import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Layout";
import Home from "./views/Home";
import MyPlants from "./views/MyPlants";
import About from "./views/About";
import PlantDetails from "./views/PlantDetails";
import PlantEdit from "./views/PlantEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "my-plants", element: <MyPlants /> },
      { path: "my-plants/:id", element: <PlantDetails /> },
      { path: "my-plants/:id/edit", element: <PlantEdit /> },
      { path: "about", element: <About /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}