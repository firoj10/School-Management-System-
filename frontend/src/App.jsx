import React from "react";
import { RouterProvider } from "react-router-dom"; 
import { router } from "./Routes/Routes";

const App = () => {
  return <RouterProvider router={router} />; // Wrap the router with RouterProvider
};

export default App;
