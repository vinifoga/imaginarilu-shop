// src/app/search/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchResults from '@/components/SearchResults';
import SearchBar from '@/components/SearchBar';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const [query, setQuery] = useState('');
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const q = searchParams?.get('q') || '';
            setQuery(q);
            setIsReady(true);
        }
    }, [searchParams]);

    if (!isReady) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">Buscar Produtos</h1>
                    <SearchBar defaultValue="" />
                </div>
                <div>Carregando...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Buscar Produtos</h1>
                <SearchBar defaultValue={query} />
            </div>
            <SearchResults query={query} />
        </div>
    );
}