import ClientFilter from "@/components/ClientFilter";

// Force static generation (SSG)
export const dynamic = "force-static";
export const fetchCache = "force-cache";

async function getProducts() {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${base}/api/products`, {
        cache: "force-cache",
    });

    if (!res.ok) return [];
    return res.json();
}

export default async function Home() {
    const products = await getProducts();

    return (
        <section className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-semibold">Products</h2>
            </div>

            <div id="filter-root" className="mb-6">
                <ClientFilter initialProducts={products} />
            </div>
        </section>
    );
}
