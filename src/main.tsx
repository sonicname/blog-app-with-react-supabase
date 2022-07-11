import { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/index.scss";
import "react-toastify/dist/ReactToastify.css";

import SuspenseLoading from "./components/loading/SuspenseLoading";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/auth-context";
import PrivateRouter from "./router/PrivateRouter";

const HomePage = lazy(() => import("./pages/HomePage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<SuspenseLoading />}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={"/"}
            element={
              <PrivateRouter>
                <HomePage />
              </PrivateRouter>
            }
          />

          <Route path={"/signup"} element={<SignUpPage />} />
          <Route path={"/signin"} element={<SignInPage />} />

          <Route
            path={"/profile/:userID"}
            element={
              <PrivateRouter>
                <ProfilePage />
              </PrivateRouter>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer pauseOnHover={false} position={"top-center"} />
    </AuthProvider>
  </Suspense>,
);
