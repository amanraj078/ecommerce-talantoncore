"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard";

export default function ClientFilter({ initialProducts }) {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("all");

    const categories = Array.from(
        new Set(initialProducts.map((p) => p.category))
    );

    const filtered = initialProducts.filter((p) => {
        const matchCategory = category === "all" || p.category === category;
        const matchText =
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase());
        return matchCategory && matchText;
    });

    return (
        <div>
            <div className="flex gap-2 mb-4">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className="border border-gray-300 rounded-md px-3 py-2 flex-1"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2"
                >
                    <option value="all">All categories</option>
                    {categories.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p) => (
                    <ProductCard key={p.id || p.slug} product={p} />
                ))}
            </div>
        </div>
    );
}
