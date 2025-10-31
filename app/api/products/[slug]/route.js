import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/product";

export async function GET(req, { params }) {
    const { slug } = await params;

    await connectToDatabase();

    try {
        const product = await Product.findOne({ slug });

        if (!product) {
            return new NextResponse("Not found", { status: 404 });
        }

        const formatted = {
            id: product._id.toString(),
            name: product.name,
            slug: product.slug,
            description: product.description,
            price: product.price,
            category: product.category,
            inventory: product.inventory,
            lastUpdated: product.lastUpdated,
        };

        return NextResponse.json(formatted);
    } catch (error) {
        console.error("GET /api/products/[slug] error:", error);
        return NextResponse.json(
            { error: "Failed to fetch product" },
            { status: 500 }
        );
    }
}
