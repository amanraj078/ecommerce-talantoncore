import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
    return (
        <article className="bg-white rounded shadow-sm p-4 flex flex-col">
            <Image
                width={300}
                height={300}
                src="/placeholder.png"
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-sm text-gray-500 flex-1">
                {product.description?.slice(0, 90)}
            </p>
            <div className="mt-3 flex items-center justify-between">
                <div className="text-lg font-semibold">₹{product.price}</div>
                <Link
                    href={`/products/${product.slug}`}
                    className="text-sm px-3 py-1 bg-indigo-600 text-white rounded"
                >
                    View
                </Link>
            </div>
        </article>
    );
}
