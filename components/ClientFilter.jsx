"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

export default function ClientFilter() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("all");

    // Fetch products on component mount
    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('/api/products');
                if (!res.ok) throw new Error('Failed to fetch products');
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    // Get unique categories
    const categories = Array.from(
        new Set(products.map((p) => p.category))
    );

    // Filter products based on search query and category
    const filtered = products.filter((p) => {
        const matchCategory = category === "all" || p.category === category;
        const matchText =
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            (p.description && p.description.toLowerCase().includes(query.toLowerCase()));
        return matchCategory && matchText;
    });

    if (loading) {
        return <div className="text-center py-8">Loading products...</div>;
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row gap-2 mb-6">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className="border border-gray-300 rounded-md px-4 py-2 flex-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="all">All Categories</option>
                    {categories.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No products found. Try adjusting your search.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((product) => (
                        <ProductCard 
                            key={product._id || product.id} 
                            product={product} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
