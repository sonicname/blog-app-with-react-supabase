import { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

import { AuthProvider } from './context/supabase-context';

import PrivateRouter from './components/layouts/PrivateRouter';

const HomePage = lazy(() => import('./pages/HomePage'));
const PostPage = lazy(() => import('./pages/PostPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const SignInPage = lazy(() => import('./pages/SignInPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const CreatePostPage = lazy(() => import('./pages/CreatePostPage'));
const PostDetailPage = lazy(() => import('./pages/PostDetailPage'));

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense
    fallback={
      <div className='fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-70'>
        <div className='w-[35px] lg:w-[70px] h-[35px] lg:h-[70px] rounded-full border-4 border-t-transparent animate-spin' />
      </div>
    }
  >
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path={'/'} element={<HomePage />} />
            <Route
              path={'/create'}
              element={
                <PrivateRouter>
                  <CreatePostPage />
                </PrivateRouter>
              }
            />
            <Route path={'/signup'} element={<SignUpPage />} />
            <Route path={'/signin'} element={<SignInPage />} />
            <Route path={'/posts'} element={<PostPage />} />
            <Route path={'/post/:postID'} element={<PostDetailPage />} />
            <Route
              path={'/profile'}
              element={
                <PrivateRouter>
                  <ProfilePage />
                </PrivateRouter>
              }
            />
          </Routes>
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
    <ToastContainer pauseOnHover={false} position={'top-right'} />
  </Suspense>,
);
