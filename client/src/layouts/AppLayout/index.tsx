import type { ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';

export function AppLayout({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
            <Toaster richColors theme="dark" position="top-right" />
        </>
    );
}
