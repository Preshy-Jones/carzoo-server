"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const carSchema = new Schema({
    year: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    make: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    milleage: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    installment: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
}, {
    timestamps: true,
});
const Car = mongoose_1.default.model("Car", carSchema);
exports.default = Car;
