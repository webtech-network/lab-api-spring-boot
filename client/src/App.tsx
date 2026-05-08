import { AppLayout } from '@/layouts/AppLayout';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export function App() {
    return (
        <AppLayout>
            <RouterProvider router={router} />
        </AppLayout>
    );
}
