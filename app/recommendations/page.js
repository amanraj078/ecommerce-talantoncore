"use client";

import { useState, useEffect } from "react";

export default function Recommendations() {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRecommendations() {
            try {
                const res = await fetch("/api/recommendations");
                if (!res.ok) throw new Error("Failed to fetch recommendations");
                const data = await res.json();
                setRecommendations(data);
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchRecommendations();
    }, []);

    if (loading) return <div className="p-6">Loading recommendations...</div>;

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Recommended for you</h2>
                <p className="text-sm text-gray-500">
                    Personalized recommendations just for you
                </p>
            </div>

            {recommendations.length === 0 ? (
                <p>No recommendations available at the moment.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendations.map((r) => (
                        <div
                            key={r._id}
                            className="bg-white p-4 rounded shadow-sm"
                        >
                            <h3 className="font-medium">{r.name}</h3>
                            <p className="text-sm text-gray-500">₹{r.price}</p>
                            <p className="text-sm text-gray-500">
                                {r.description}
                            </p>
                            <div className="mt-3">
                                <button
                                    className="px-3 py-1 bg-indigo-500 text-white rounded-sm text-sm hover:bg-indigo-600 transition-colors"
                                    onClick={() =>
                                        alert(
                                            "Use the product page to add to wishlist"
                                        )
                                    }
                                >
                                    Add to Wishlist
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
