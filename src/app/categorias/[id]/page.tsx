// app/categorias/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseCliente';
import ProductCard from '@/components/products/ProductCard';
import { Product, Category } from '@/types';

export default function CategoryPage() {
    const params = useParams();
    const categoryId = params.id as string;
    const [products, setProducts] = useState<Product[]>([]);
    const [categoryName, setCategoryName] = useState('Categoria');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);

            const { data: allProducts, error } = await supabase
                .from('public_products_with_components')
                .select('*');

            if (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
                return;
            }

            const filteredProducts = allProducts?.filter(product =>
                product.categories?.some((cat: { id: Category; }) => String(cat.id) === String(categoryId))
            ) || [];

            setProducts(filteredProducts as Product[]);

            if (filteredProducts.length > 0) {
                const category = filteredProducts[0].categories?.find(
                    (cat: { id: Category; }) => String(cat.id) === String(categoryId)
                );
                setCategoryName(category?.name || 'Categoria');
            }

            setLoading(false);
        };

        fetchProducts();
    }, [categoryId]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (products.length === 0) {
        return (
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Categoria: {categoryName}</h1>
                <p>Nenhum produto encontrado nesta categoria.</p>
            </main>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Categoria: {categoryName}</h1>
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
                            categories: product.categories || undefined
                        }}
                    />
                ))}
            </div>
        </main>
    );
}

function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );
}