// components/CategoryLink.tsx
'use client';

import Link from 'next/link';
import { useLoading } from './LoadingContext';

export default function CategoryLink({
    href,
    children
}: {
    href: string;
    children: React.ReactNode
}) {
    const { setIsLoading } = useLoading();

    return (
        <Link
            href={href}
            onClick={() => setIsLoading(true)}
            className="text-primary hover:underline"
        >
            {children}
        </Link>
    );
}