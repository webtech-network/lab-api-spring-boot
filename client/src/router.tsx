import { Navigate, createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { NewSetupPage } from '@/pages/NewSetupPage';
import { SetupDetailsPage } from '@/pages/SetupDetailsPage';
import { EditSetupPage } from '@/pages/EditSetupPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
    { path: '/', element: <HomePage /> },
    { path: '/setups/new', element: <NewSetupPage /> },
    { path: '/setups/:id', element: <SetupDetailsPage /> },
    { path: '/setups/:id/edit', element: <EditSetupPage /> },
    { path: '/404', element: <NotFoundPage /> },
    { path: '*', element: <Navigate to="/404" replace /> },
]);
