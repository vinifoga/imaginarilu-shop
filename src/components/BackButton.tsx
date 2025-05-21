// components/BackButton.tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
    return (
        <Link
            href="/"
            className="flex items-center text-primary hover:underline mb-4"
        >
            <ArrowLeft className="mr-2" size={18} />
            Voltar
        </Link>
    );
}