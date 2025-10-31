import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/product";

export async function GET() {
  try {
    await connectToDatabase();
    const recommendations = await Product.find()
      .sort({ price: -1 })
      .limit(6)
      .lean();
    
    // Convert _id to string for serialization
    const serialized = recommendations.map(item => ({
      ...item,
      _id: item._id.toString()
    }));
    
    return Response.json(serialized);
  } catch (error) {
    console.error("Error in recommendations API:", error);
    return Response.json(
      { error: "Failed to fetch recommendations" },
      { status: 500 }
    );
  }
}
