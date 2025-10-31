"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";

export default function HeroBanner() {
    return (
        <section className="relative bg-linear-to-br from-blue-50 to-white py-20 md:py-28 overflow-hidden">
            <div className="container relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-xl text-center md:text-left"
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                        Discover Products You’ll{" "}
                        <span className="text-blue-600">Love</span>
                    </h1>
                    <p className="text-gray-600 text-lg mb-8">
                        Shop the latest trends, electronics, and essentials —
                        all in one place. Fast shipping, secure checkout, and
                        unbeatable deals.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link
                            href="/products"
                            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all"
                        >
                            Shop Now
                        </Link>
                        <Link
                            href="/about"
                            className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-all"
                        >
                            Learn More
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="w-full max-w-2xl"
                >
                    <Image
                        width={600}
                        height={600}
                        src="https://plus.unsplash.com/premium_vector-1682303477571-3f31fc4c1ac4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600"
                        alt="Shopping illustration"
                        className="rounded-2xl shadow-lg"
                    />
                </motion.div>
            </div>

            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 opacity-30 blur-3xl rounded-full" />
            </div>
        </section>
    );
}
