"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var mongoose_1 = require("mongoose");
var productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    sizes: {
        type: [String],
        default: [],
    },
    category: {
        type: String,
        default: "Formal",
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    imageFileId: {
        type: String,
    },
});
exports.Product = mongoose_1.default.model("Product", productSchema);
