// app/search/page.tsx
import ProductCard from '@/components/products/ProductCard';
import { supabase } from '@/lib/supabaseCliente';

interface SearchParams {
    q?: string;
}

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
    const searchTerm = searchParams.q || '';

    let query = supabase
        .from('public_products_with_components')
        .select('*');

    if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
    }

    const { data: products } = await query;

    const formattedProducts = products?.map((product) => ({
        ...product,
        id: String(product.id),
        nome: product.name,
        preco: product.sale_price_virtual_store,
        imagem_url: product.images?.[0] || '',
        slug: String(product.id),
        descricao: product.description,
        isComposition: product.is_composition,
    }));

    return (
        <main className="container mx-auto px-4 py-8">
            <section className="mb-12">
                <h1 className="text-3xl font-bold mb-6">
                    Resultados para: &quot;{searchTerm}&quot;
                </h1>
                {formattedProducts?.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {formattedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">Nenhum produto encontrado.</p>
                )}
            </section>
        </main>
    );
}