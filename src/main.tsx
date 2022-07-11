import { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/index.scss";
import SuspenseLoading from "./components/loading/SuspenseLoading";

const HomePage = lazy(() => import("./pages/HomePage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<SuspenseLoading />}>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/signup"} element={<SignUpPage />} />
        <Route path={"/signin"} element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  </Suspense>,
);
