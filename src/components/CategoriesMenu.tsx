'use client';
import Link from 'next/link';
import { useLoading } from '@/components/LoadingContext';

export default function CategoriesMenu({ categories }: { categories: Array<{ id: string | number; name: string }> }) {
    const { setIsLoading } = useLoading();

    return (
        <div className="flex flex-wrap gap-2 justify-center mb-6">
            {categories.map((category) => (
                <Link
                    key={String(category.id)}
                    href={`/categorias/${category.id}`}
                    className="px-4 py-2 bg-gray-100 text-black hover:bg-gray-200 rounded-full transition-colors"
                    onClick={() => setIsLoading(true)}
                >
                    {category.name}
                </Link>
            ))}
        </div>
    );
}