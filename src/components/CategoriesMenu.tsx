// components/CategoriesMenu.tsx
import Link from 'next/link';

interface Category {
    id: string | number;
    name: string;
}

interface CategoriesMenuProps {
    categories: Category[];
}

export default function CategoriesMenu({ categories }: CategoriesMenuProps) {
    return (
        <div className="overflow-x-auto py-4">
            <div className="flex space-x-4 min-w-max">
                {categories.map((category) => (
                    <Link
                        key={String(category.id)}
                        href={`/categorias/${category.id}`}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium whitespace-nowrap transition-colors text-black"
                    >
                        {category.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}