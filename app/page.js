import HeroBanner from "@/components/HeroBanner";
import ClientFilter from "@/components/ClientFilter";

export const dynamic = "force-static";
export const fetchCache = "force-cache";

export default function Home() {
    return (
        <>
            <HeroBanner />
            <section className="max-w-6xl mx-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-semibold">Products</h2>
                </div>
                <ClientFilter />
            </section>
        </>
    );
}
