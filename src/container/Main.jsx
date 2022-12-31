import React, { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Loader from "./Loader";

// Pages
const Home = lazy(() => import('../components/Home'))
const Quiz = lazy(() => import('../components/Quiz'))
const Result = lazy(() => import('../components/Result'))
const FourOFour = lazy(() => import('../components/FourOFour'))

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/quiz",
    element: <Quiz />,
  },
  {
    path: "/result",
    element: <Result />,
  },
  {
    path: "*",
    element: <FourOFour />,
  },
]);



const Main = () => {

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Main;