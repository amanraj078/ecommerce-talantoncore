import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    inventory: { type: Number, required: true },
    lastUpdated: { type: String, required: true },
});

const Product =
    mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
