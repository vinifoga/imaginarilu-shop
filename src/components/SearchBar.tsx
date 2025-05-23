// components/SearchBar.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { SearchIcon } from 'lucide-react';

export default function SearchBar({ defaultValue = '' }: { defaultValue?: string }) {
    const [query, setQuery] = useState(defaultValue);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim()) {
                router.push(`/search?q=${encodeURIComponent(query)}`);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query, router]);

    return (
        <div className="relative w-full max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar produtos..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                aria-label="Buscar produtos"
            />
            {query && (
                <button
                    onClick={() => setQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    aria-label="Limpar busca"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400 hover:text-gray-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}