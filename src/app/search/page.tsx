// src/app/search/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchResults from '@/components/SearchResults';
import SearchBar from '@/components/SearchBar';
import BackButton from '@/components/BackButton';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const [query, setQuery] = useState('');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        setQuery(searchParams.get('q') || '');
    }, [searchParams]);

    if (!isMounted) {
        return <div className="container mx-auto px-4 py-8">Carregando...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <BackButton />
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Buscar Produtos</h1>
                <SearchBar defaultValue={query} />
            </div>

            <SearchResults query={query} />
        </div>
    );
}