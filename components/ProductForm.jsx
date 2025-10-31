"use client";
import React, { useState } from "react";

export default function ProductForm({ onSubmit }) {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [price, setPrice] = useState(0);
    const [inventory, setInventory] = useState(0);
    const [category, setCategory] = useState("general");
    const [description, setDescription] = useState("");

    function submit(e) {
        e.preventDefault();
        onSubmit({ name, slug, price, inventory, category, description });
        setName("");
        setSlug("");
        setPrice(0);
        setInventory(0);
        setDescription("");
    }

    return (
        <form
            onSubmit={submit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
            {/* Name */}
            <div className="flex flex-col">
                <label
                    htmlFor="name"
                    className="font-medium text-gray-700 mb-1"
                >
                    Product Name
                </label>
                <input
                    id="name"
                    className="border border-gray-300 rounded p-2"
                    placeholder="e.g., Wooden Chair"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            {/* Slug */}
            <div className="flex flex-col">
                <label
                    htmlFor="slug"
                    className="font-medium text-gray-700 mb-1"
                >
                    Slug (unique)
                </label>
                <input
                    id="slug"
                    className="border border-gray-300 rounded p-2"
                    placeholder="e.g., wooden-chair"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                />
            </div>

            {/* Price */}
            <div className="flex flex-col">
                <label
                    htmlFor="price"
                    className="font-medium text-gray-700 mb-1"
                >
                    Price (₹)
                </label>
                <input
                    id="price"
                    className="border border-gray-300 rounded p-2"
                    placeholder="e.g., 999"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
            </div>

            {/* Inventory */}
            <div className="flex flex-col">
                <label
                    htmlFor="inventory"
                    className="font-medium text-gray-700 mb-1"
                >
                    Inventory
                </label>
                <input
                    id="inventory"
                    className="border border-gray-300 rounded p-2"
                    placeholder="e.g., 50"
                    type="number"
                    value={inventory}
                    onChange={(e) => setInventory(Number(e.target.value))}
                />
            </div>

            {/* Category */}
            <div className="flex flex-col sm:col-span-2">
                <label
                    htmlFor="category"
                    className="font-medium text-gray-700 mb-1"
                >
                    Category
                </label>
                <input
                    id="category"
                    className="border border-gray-300 rounded p-2"
                    placeholder="e.g., furniture"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
            </div>

            {/* Description */}
            <div className="flex flex-col sm:col-span-2">
                <label
                    htmlFor="description"
                    className="font-medium text-gray-700 mb-1"
                >
                    Description
                </label>
                <textarea
                    id="description"
                    className="border border-gray-300 rounded p-2"
                    placeholder="Enter a short product description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2 mt-2">
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                    Create Product
                </button>
            </div>
        </form>
    );
}
