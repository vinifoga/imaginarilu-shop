// src/app/search/page.tsx
import { Suspense } from 'react';
import SearchResults from '@/components/SearchResults';
import SearchBar from '@/components/SearchBar';

interface SearchPageProps {
    searchParams: {
        q?: string;
    };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const query = searchParams.q || '';

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Buscar Produtos</h1>
                <SearchBar defaultValue={query} />
            </div>

            <Suspense fallback={<div>Carregando resultados...</div>}>
                <SearchResults query={query} />
            </Suspense>
        </div>
    );
}