// components/SearchResults.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseCliente';
import ProductCard from '@/components/products/ProductCard';
import { Product } from '@/types';

interface SearchResultsProps {
    query: string;
}

export default function SearchResults({ query }: SearchResultsProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const searchProducts = async () => {
            setLoading(true);

            let queryBuilder = supabase
                .from('public_products_with_components')
                .select('*');

            if (query) {
                queryBuilder = queryBuilder
                    .or(`name.ilike.%${query}%,description.ilike.%${query}%`);
            }

            const { data, error } = await queryBuilder;

            if (!error) {
                setProducts(data || []);
            }

            setLoading(false);
        };

        searchProducts();
    }, [query]);

    if (loading) {
        return <div className="py-8 text-center">Buscando produtos...</div>;
    }

    if (products.length === 0) {
        return <div className="py-8 text-center">Nenhum produto encontrado para &quot;{query}&quot;</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard
                    key={String(product.id)}
                    product={{
                        id: String(product.id),
                        nome: product.name,
                        preco: product.sale_price_virtual_store,
                        imagem_url: product.images?.[0] || '',
                        descricao: product.description,
                        isComposition: product.is_composition,
                    }}
                />
            ))}
        </div>
    );
}