import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/product";

export async function GET() {
    await connectToDatabase();

    try {
        const products = await Product.find({});
        const formatted = products.map((p) => ({
            id: p._id.toString(),
            name: p.name,
            slug: p.slug,
            description: p.description,
            price: p.price,
            category: p.category,
            inventory: p.inventory,
            lastUpdated: p.lastUpdated,
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error("GET /api/products error:", error);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    await connectToDatabase();

    const adminKey = req.headers.get("x-admin-key") || "";
    if (adminKey !== process.env.ADMIN_KEY) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();

        if (!body.name || !body.slug) {
            return new NextResponse("Invalid payload", { status: 400 });
        }

        const newProduct = new Product({
            name: body.name,
            slug: body.slug,
            description: body.description || "",
            price: Number(body.price) || 0,
            category: body.category || "general",
            inventory: Number(body.inventory) || 0,
            lastUpdated: new Date().toISOString(),
        });

        const savedProduct = await newProduct.save();
        return NextResponse.json(savedProduct);
    } catch (error) {
        console.error("POST /api/products error:", error);
        return NextResponse.json(
            { error: "Failed to create product" },
            { status: 500 }
        );
    }
}
