// app/not-found.tsx
'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function NotFound() {
    useEffect(() => {
        console.log('404 Page Not Found');
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-4xl font-bold mb-4">404 - Página não encontrada</h1>
            <Link
                href="/"
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
                Voltar para a página inicial
            </Link>
        </div>
    );
}