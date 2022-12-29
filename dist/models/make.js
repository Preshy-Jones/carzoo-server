"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const { Schema } = mongoose_1.default;
const makeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    model: {
        type: Schema.Types.ObjectId,
        ref: "Model",
    },
    modelName: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
});
makeSchema.pre("validate", function (next) {
    this.slug = (0, slugify_1.default)(this.name, { lower: true, strict: true });
    next();
});
const CarMake = mongoose_1.default.model("Make", makeSchema);
exports.default = CarMake;
