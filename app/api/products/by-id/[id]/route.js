import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/product";

export async function PUT(req, { params }) {
    const adminKey = req.headers.get("x-admin-key") || "";
    if (adminKey !== process.env.ADMIN_KEY) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = params;
    await connectToDatabase();

    try {
        const body = await req.json();
        const updates = {};

        if (body.name) updates.name = body.name;
        if (body.slug) updates.slug = body.slug;
        if (body.description) updates.description = body.description;
        if (body.price !== undefined) updates.price = Number(body.price);
        if (body.category) updates.category = body.category;
        if (body.inventory !== undefined)
            updates.inventory = Number(body.inventory);
        updates.lastUpdated = new Date().toISOString();

        const updated = await Product.findByIdAndUpdate(id, updates, {
            new: true,
        });

        if (!updated) {
            return new NextResponse("Not found", { status: 404 });
        }

        return NextResponse.json({
            id: updated._id.toString(),
            ...updates,
        });
    } catch (error) {
        console.error("PUT /api/products/[id] error:", error);
        return NextResponse.json(
            { error: "Failed to update product" },
            { status: 500 }
        );
    }
}
