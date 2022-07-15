import { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import "swiper/css";

import { ToastContainer } from "react-toastify";
import ScreenLoading from "./components/loading/ScreenLoading";
import { AuthProvider } from "./context/supabase-context";
import PrivateRouter from "./components/layouts/PrivateRouter";

const HomePage = lazy(() => import("./pages/HomePage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const CreatePostPage = lazy(() => import("./pages/CreatePostPage"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Suspense fallback={<ScreenLoading />}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/*{private route}*/}
            <Route path={"/"} element={<HomePage />} />
            <Route
              path={"/create"}
              element={
                <PrivateRouter>
                  <CreatePostPage />
                </PrivateRouter>
              }
            />
            <Route path={"/signup"} element={<SignUpPage />} />
            <Route path={"/signin"} element={<SignInPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <ToastContainer pauseOnHover={false} position={"top-right"} />
    </Suspense>
  </>,
);
