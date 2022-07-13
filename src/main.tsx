import { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "./index.scss";

import { ToastContainer } from "react-toastify";
import ScreenLoading from "./components/loading/ScreenLoading";
import { AuthProvider } from "./context/auth-context";
import PrivateRouter from "./router/PrivateRouter";

const HomePage = lazy(() => import("./pages/HomePage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <AuthProvider>
      <Suspense fallback={<ScreenLoading />}>
        <BrowserRouter>
          <Routes>
            {/*{private route}*/}
            <Route path={"/"} element={<PrivateRouter />}>
              <Route path={""} element={<HomePage />} />
            </Route>
            <Route path={"/signup"} element={<SignUpPage />} />
            <Route path={"/signin"} element={<SignInPage />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer pauseOnHover={false} position={"top-right"} />
      </Suspense>
    </AuthProvider>
  </>,
);
