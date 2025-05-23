'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLoading } from '../LoadingContext';

interface Product {
    id: string;
    nome: string;
    preco: number;
    imagem_url: string;
    descricao?: string;
    isComposition?: boolean;
    categories?: Array<{
        id: string | number;
        name: string;
    }>;
}

export default function ProductCard({ product }: { product: Product }) {
    const { setIsLoading } = useLoading();

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
            <Link href={`/products/${product.id}`} className="block h-full" onClick={() => setIsLoading(true)}>
                {/* Imagem do produto com badge */}
                <div className="relative h-48">
                    <Image
                        src={product.imagem_url || '/placeholder-product.jpg'}
                        alt={product.nome}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    />

                    {/* Badges */}
                    {/* <div className="absolute top-2 left-2 flex gap-2">
                        {product.isComposition && (
                            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                Kit
                            </span>
                        )}
                        {product.preco < 100 && (
                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                                Promoção
                            </span>
                        )}
                    </div> */}
                </div>

                {/* Informações do produto */}
                <div className="p-4 flex flex-col h-[calc(100%-12rem)]">
                    <h3 className="font-semibold text-lg mb-1 text-gray-900 group-hover:text-primary transition-colors">
                        {product.nome}
                    </h3>

                    {/* {product.descricao && (
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                            {product.descricao}
                        </p>
                    )} */}

                    {/* Categorias */}
                    {/* {product.categories && product.categories.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                            {product.categories.slice(0, 2).map((category) => (
                                <span
                                    key={String(category.id)}
                                    className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                                >
                                    {category.name}
                                </span>
                            ))}
                        </div>
                    )} */}

                    {/* Preço e botão */}
                    <div className="mt-auto">
                        <p className="text-primary font-bold text-lg text-black">
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(product.preco)}
                        </p>
                        <button
                            className="mt-3 w-full bg-primary text-black py-2 rounded hover:bg-primary-dark transition-colors"
                            onClick={(e) => e.preventDefault()}
                        >
                            Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
}