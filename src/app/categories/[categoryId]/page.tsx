import ProductCard from '@/components/products/ProductCard';
import { supabase } from '@/lib/supabaseCliente';
import { CategoryWithProducts, Product } from '@/types';
import Link from 'next/link';

interface CategoryPageProps {
    params: {
        categoryId: string;
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    // Buscar todos os produtos (como na página inicial)
    const { data: products } = await supabase
        .from('public_products_with_components')
        .select('*')
        .limit(50);

    // Processar os produtos para agrupar por categoria
    const categoriesWithProducts: CategoryWithProducts[] = [];
    products?.forEach((product) => {
        product.categories?.forEach((category: { id: string | number; name: string }) => {
            const existingCategory = categoriesWithProducts.find(
                (c) => String(c.id) === String(category.id)
            );

            const formattedProduct: Product = {
                ...product,
                id: String(product.id),
                nome: product.name,
                preco: product.sale_price_virtual_store,
                imagem_url: product.images?.[0] || '',
                slug: String(product.id),
                descricao: product.description,
                isComposition: product.is_composition,
            };

            if (existingCategory) {
                existingCategory.products.push(formattedProduct);
            } else {
                categoriesWithProducts.push({
                    id: category.id,
                    name: category.name,
                    products: [formattedProduct],
                });
            }
        });
    });

    // Encontrar a categoria específica
    const currentCategory = categoriesWithProducts.find(
        (category) => String(category.id) === params.categoryId
    );

    if (!currentCategory) {
        return (
            <main className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Categoria não encontrada</h1>
                    <Link href="/" className="text-blue-500 hover:underline">
                        Voltar para a página inicial
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8">
            {/* Cabeçalho da categoria */}
            <section className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{currentCategory.name}</h1>
                {/* <p className="text-gray-600">
                    {currentCategory.products.length} produtos disponíveis
                </p> */}
            </section>

            {/* Lista de produtos */}
            <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {currentCategory.products.map((product) => (
                        <ProductCard
                            key={String(product.id)}
                            product={{
                                ...product,
                                id: String(product.id),
                                nome: product.name,
                                preco: product.sale_price_virtual_store,
                                imagem_url: product.images?.[0] || '',
                                categories: product.categories ?? undefined,
                            }}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}