"use client";
import React, { useEffect, useState } from "react";
import ProductForm from "@/components/ProductForm";

export default function AdminPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true; // prevent state updates after unmount

        const fetchProducts = async () => {
            setLoading(true);
            const res = await fetch("/api/products");
            const data = await res.json();
            if (isMounted) {
                setProducts(data);
                setLoading(false);
            }
        };

        fetchProducts();

        return () => {
            isMounted = false;
        };
    }, []);

    async function handleCreate(product) {
        const adminKey = prompt(
            "Enter admin key for demo (use ADMIN_KEY in env):"
        );
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-admin-key": adminKey || "",
            },
            body: JSON.stringify(product),
        });
        if (res.ok) {
            await refreshProducts();
            alert("Created");
        } else {
            alert("Create failed: " + (await res.text()));
        }
    }

    async function handleUpdate(id, updates) {
        const adminKey = prompt("Enter admin key to update:");
        const res = await fetch(`/api/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-admin-key": adminKey || "",
            },
            body: JSON.stringify(updates),
        });
        if (res.ok) {
            await refreshProducts();
            alert("Updated");
        } else {
            alert("Update failed: " + (await res.text()));
        }
    }

    // separate out refetch logic to reuse
    async function refreshProducts() {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
    }

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Admin Panel</h2>
            </div>

            <div className="bg-white p-6 rounded shadow-sm mb-6">
                <h3 className="font-medium mb-3">Add product</h3>
                <ProductForm onSubmit={handleCreate} />
            </div>

            <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium mb-3">Existing products</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        {products.map((p) => (
                            <div
                                key={p.id}
                                className="py-3 flex justify-between items-center"
                            >
                                <div>
                                    <div className="font-medium">{p.name}</div>
                                    <div className="text-sm text-gray-500">
                                        Slug: {p.slug}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            const newInv = prompt(
                                                "New inventory",
                                                String(p.inventory)
                                            );
                                            if (newInv !== null)
                                                handleUpdate(p.id, {
                                                    inventory: Number(newInv),
                                                });
                                        }}
                                        className="px-3 cursor-pointer py-1 rounded bg-indigo-600 text-white text-sm"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
