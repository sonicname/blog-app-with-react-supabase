import { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.scss";
import "swiper/css";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/supabase-context";

import ScreenLoading from "./components/loading/ScreenLoading";
import PrivateRouter from "./components/layouts/PrivateRouter";

const HomePage = lazy(() => import("./pages/HomePage"));
const PostPage = lazy(() => import("./pages/PostPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const CreatePostPage = lazy(() => import("./pages/CreatePostPage"));
const PostDetailPage = lazy(() => import("./pages/PostDetailPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Suspense fallback={<ScreenLoading />}>
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
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
              <Route path={"/posts"} element={<PostPage />} />
              <Route path={"/post/:postID"} element={<PostDetailPage />} />
              <Route
                path={"/profile"}
                element={
                  <PrivateRouter>
                    <ProfilePage />
                  </PrivateRouter>
                }
              />
            </Routes>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
      <ToastContainer pauseOnHover={false} position={"top-right"} />
    </Suspense>
  </>,
);
