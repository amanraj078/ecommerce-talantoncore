// app/dashboard/page.js
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/product";

export const dynamic = "force-dynamic";

async function getInventoryStats() {
    await connectToDatabase();

    const total = await Product.countDocuments();
    const lowStock = await Product.countDocuments({ inventory: { $lt: 5 } });
    const products = await Product.find({}).sort({ lastUpdated: -1 });

    return { total, lowStock, products };
}

export default async function Dashboard() {
    const { total, lowStock, products } = await getInventoryStats();

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Inventory Dashboard</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-sm text-gray-500">Total Products</h3>
                    <p className="text-3xl font-bold">{total}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-sm text-gray-500">
                        Low Stock (&lt; 5)
                    </h3>
                    <p className="text-3xl font-bold text-red-500">
                        {lowStock}
                    </p>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-3">Latest Products</h3>
                <div className="divide-y divide-gray-200">
                    {products.map((p) => (
                        <div
                            key={p._id.toString()}
                            className="py-3 flex justify-between items-center"
                        >
                            <div>
                                <div className="font-medium text-gray-900">
                                    {p.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                    Updated:{" "}
                                    {new Date(p.lastUpdated).toLocaleString()}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-gray-800 font-medium">
                                    ₹{p.price}
                                </div>
                                <div className="text-sm text-gray-600">
                                    Stock: {p.inventory}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
