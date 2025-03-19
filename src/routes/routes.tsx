import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from '../components/Header';
import TopHeader from '../components/TopHeader';

const LoginPage = lazy(() => import('../pages/Login'));

const HomePage = lazy(() => import('../pages/Home'));
const ProjectsPage = lazy(() => import('../pages/Projects'));
const UsersPage = lazy(() => import('../pages/Users'));

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: (
      <>
        <ProtectedRoute>
          <TopHeader />
          <Header />
          <Suspense fallback={<div className="loader"></div>}>
            <Outlet />
          </Suspense>
        </ProtectedRoute>
      </>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'projects',
        element: <ProjectsPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
    ],
  },
];

export default routes;
