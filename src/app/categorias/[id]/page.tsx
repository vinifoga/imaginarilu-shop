// app/categorias/[id]/page.tsx
import ProductCard from '@/components/products/ProductCard';
import { supabase } from '@/lib/supabaseCliente';
import BackButton from '@/components/BackButton';

interface CategoryPageProps {
    params: {
        id: string;
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    // Busca produtos que contêm a categoria com o ID especificado
    const { data: products } = await supabase
        .from('public_products_with_components')
        .select('*');

    // Filtra os produtos no lado do cliente pois o Supabase não suporta contains com JSON array
    const filteredProducts = products?.filter(product =>
        product.categories?.some((cat: { id: string }) => cat.id === params.id)
    );

    // Obtém o nome da categoria
    const categoryName = filteredProducts?.[0]?.categories?.find(
        (cat: { id: string }) => cat.id === params.id
    )?.name || 'Categoria';

    const formattedProducts = filteredProducts?.map((product) => ({
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
            <BackButton />

            <section className="mb-12">
                <h1 className="text-3xl font-bold mb-6">
                    {categoryName}
                </h1>

                {formattedProducts?.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {formattedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">Nenhum produto encontrado nesta categoria.</p>
                )}
            </section>
        </main>
    );
}