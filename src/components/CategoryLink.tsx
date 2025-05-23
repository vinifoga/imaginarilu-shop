import Link from 'next/link';

interface CategoryLinkProps {
    href: string;
    categoryName: string;
    children: React.ReactNode;
}

export default function CategoryLink({ href, categoryName, children }: CategoryLinkProps) {
    return (
        <Link
            href={`/categories/${href}`}
            className="text-blue-500 hover:underline"
            aria-label={`Ver todos os produtos da categoria ${categoryName}`}
        >
            {children}
        </Link>
    );
}