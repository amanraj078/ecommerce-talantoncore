import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamic = "auto";
export const revalidate = 60; // ISR: regenerate every 60 seconds

async function getProductBySlug(slug) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/products/${slug}`,
        { next: { revalidate: 60 } }
    );

    if (!res.ok) return null;
    return res.json();
}

export async function generateStaticParams() {
    // Pre-generate some product pages at build time
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/products`,
        { cache: "force-cache" }
    );

    if (!res.ok) return [];
    const products = await res.json();
    return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) return notFound();

    return (
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                    <Image
                        width={300}
                        height={300}
                        src="/placeholder.png"
                        alt={product.name}
                        className="rounded-md w-full h-auto object-cover"
                    />
                </div>

                <div className="flex-1">
                    <h1 className="text-2xl font-semibold mb-1">
                        {product.name}
                    </h1>
                    <p className="text-sm text-gray-500 mb-4">
                        {product.category}
                    </p>
                    <p className="text-gray-700 mb-4">{product.description}</p>

                    <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-800">
                            ₹{product.price}
                        </span>
                        <span
                            className={`text-sm ${
                                product.inventory < 5
                                    ? "text-red-500"
                                    : "text-gray-600"
                            }`}
                        >
                            Stock: {product.inventory}
                        </span>
                    </div>
                    <div className="mt-6">
                        <button className="bg-purple-600 hover:bg-purple-700 transition-colors duration-200 hover:cursor-pointer text-white px-4 py-2 rounded">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
