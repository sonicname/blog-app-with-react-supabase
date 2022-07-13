import { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "./index.scss";

import { ToastContainer } from "react-toastify";
import ScreenLoading from "./components/loading/ScreenLoading";

const HomePage = lazy(() => import("./pages/HomePage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Suspense fallback={<ScreenLoading />}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/signup"} element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer pauseOnHover={false} position={"top-right"} />
    </Suspense>
  </>,
);
