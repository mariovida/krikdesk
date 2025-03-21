import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from '../components/Header';
import TopHeader from '../components/TopHeader';

const LoginPage = lazy(() => import('../pages/Login'));
const SetPasswordPage = lazy(() => import('../pages/SetPasswordPage'));

const HomePage = lazy(() => import('../pages/Home'));
const ProjectsPage = lazy(() => import('../pages/projects/Projects'));
const UsersPage = lazy(() => import('../pages/users/Users'));
const AdministrationPage = lazy(
  () => import('../pages/administration/AdministrationPage')
);

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/password-create',
    element: <SetPasswordPage />,
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
      {
        path: 'administration',
        element: <AdministrationPage />,
      },
    ],
  },
];

export default routes;
