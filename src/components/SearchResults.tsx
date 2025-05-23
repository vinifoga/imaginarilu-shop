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

            const { data, error } = await supabase
                .from('public_products_with_components')
                .select('*')
                .ilike('name', `%${query}%`);

            if (!error) {
                setProducts(data || []);
            }

            setLoading(false);
        };

        if (query) {
            searchProducts();
        } else {
            setProducts([]);
        }
    }, [query]);

    if (loading) {
        return <div>Buscando produtos...</div>;
    }

    if (products.length === 0) {
        return <div>Nenhum produto encontrado para &quot;{query}&quot;</div>;
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