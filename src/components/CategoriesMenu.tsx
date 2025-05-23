// app/components/CategoriesMenu.tsx
'use client';
import Link from 'next/link';
import { useLoading } from '@/components/LoadingContext';

interface Category {
    id: string | number;
    name: string;
}

interface CategoriesMenuProps {
    categories: Category[];
}

export default function CategoriesMenu({ categories }: CategoriesMenuProps) {
    const { setIsLoading } = useLoading();

    return (
        <div className="flex flex-wrap gap-2 justify-center mb-6">
            {categories.map((category) => (
                <Link
                    key={String(category.id)}
                    href={`/categories/${category.id}`}
                    className="px-4 py-2 bg-gray-100 text-black hover:bg-gray-200 rounded-full transition-colors"
                    onClick={() => setIsLoading(true)}
                    aria-label={`Ver produtos da categoria ${category.name}`}
                >
                    {category.name}
                </Link>
            ))}
        </div>
    );
}