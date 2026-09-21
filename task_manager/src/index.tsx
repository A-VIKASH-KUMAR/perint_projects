import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import {routes} from "./App"
import { BrowserRouter, RouterProvider } from "react-router";
let container = document.getElementById("app")!;
let root = createRoot(container);
root.render(
    <StrictMode>
      <RouterProvider router={routes} />
    </StrictMode>
);
