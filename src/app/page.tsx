import ProductCard from '@/components/products/ProductCard';
import { supabase } from '@/lib/supabaseCliente';
import SearchBar from '@/components/SearchBar';
import CategoriesMenu from '@/components/CategoriesMenu';
import { NavigationEvents } from '@/components/NavigationEvents';
import CategoryLink from '@/components/CategoryLink';
import { CategoryWithProducts, Product } from '@/types';

export default async function Home() {
  const { data: products } = await supabase
    .from('public_products_with_components')
    .select('*')
    .limit(50);

  const categoriesWithProducts: CategoryWithProducts[] = [];
  products?.forEach((product) => {
    product.categories?.forEach((category: { id: string | number; name: string }) => {
      const existingCategory: CategoryWithProducts | undefined = categoriesWithProducts.find(
        (c: CategoryWithProducts) => String(c.id) === String(category.id)
      );

      interface FormattedProduct extends Product {
        nome: string;
        preco: number;
        imagem_url: string;
        slug: string;
        descricao: string;
        isComposition: boolean;
      }

      const formattedProduct: FormattedProduct = {
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

  const uniqueCategories = categoriesWithProducts.map(category => ({
    id: category.id,
    name: category.name
  }));

  const featuredProducts = products?.slice(0, 4)?.map((product) => ({
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
      {/* Seção de Pesquisa */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Nossos Produtos</h1>
          <SearchBar />
        </div>
        {/* Menu de Categorias */}
        <CategoriesMenu categories={uniqueCategories} />
      </section>
      {/* Seção de Destaques */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Destaques</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Seções por Categoria */}
      {categoriesWithProducts.map((category) => (
        <section key={String(category.id)} className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2 xl font-bold">{category.name}</h2>
            <CategoryLink
              href={String(category.id)}
              categoryName={category.name}
            >
              Ver tudo
            </CategoryLink>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {category.products.slice(0, 4).map((product) => {
              const formattedProduct = {
                ...product,
                id: String(product.id),
                nome: product.name,
                preco: product.sale_price_virtual_store,
                imagem_url: product.images?.[0] || '',
                slug: String(product.id),
                descricao: product.description,
                isComposition: product.is_composition,
                categories: product.categories ?? undefined,
              };
              return (
                <ProductCard key={formattedProduct.id} product={formattedProduct} />
              );
            })}
          </div>
        </section>
      ))}
      <>
        <NavigationEvents />
      </>
    </main>
  );
}