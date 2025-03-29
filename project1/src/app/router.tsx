import { createHashRouter, Navigate } from "react-router";
import { MainLayout } from "./layouts/MainLayout/MainLayout";
import { ReportPage } from "@/pages";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "reports",
        element: <ReportPage />,
      },
      {
        path: "*",
        element: <Navigate to={"/reports"} replace/>,
      },
    ],
  },
];

export const router = createHashRouter(routes);
