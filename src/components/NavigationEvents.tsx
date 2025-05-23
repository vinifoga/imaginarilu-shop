// components/NavigationEvents.tsx
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLoading } from './LoadingContext';

export function NavigationEvents() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { setIsLoading } = useLoading();

    useEffect(() => {
        setIsLoading(false);
    }, [pathname, searchParams, setIsLoading]);

    return null;
}