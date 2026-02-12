import Link from 'next/link';

export default function ProductNotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h2 className="text-2xl font-bold text-[#002f34]">Oops! This product is gone.</h2>
            <p className="text-gray-600 mt-2">The product you are looking for might have been sold or removed.</p>
            <Link href="/" className="mt-6 text-blue-600 font-bold underline">
                Back to Home
            </Link>
        </div>
    );
}