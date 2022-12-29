"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCarSchema = exports.createCarSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "Car name is required",
        }),
        title: (0, zod_1.string)({
            required_error: "Car title is required",
        }),
        year: (0, zod_1.string)({
            required_error: "Year is required",
        }),
        make: (0, zod_1.string)({
            required_error: "Make is required",
        }),
        model: (0, zod_1.string)({
            required_error: "Model is required",
        }),
        milleage: (0, zod_1.number)({
            required_error: "Milleage is required",
        }),
        description: (0, zod_1.string)({
            required_error: "Description is required",
        }).min(120, "Description should be at least 120 characters long"),
        price: (0, zod_1.number)({
            required_error: "Price is required",
        }),
        installment: (0, zod_1.number)({
            required_error: "Installment is required",
        }),
        images: (0, zod_1.string)().array(),
    }),
};
const params = {
    params: (0, zod_1.object)({
        carId: (0, zod_1.string)({
            required_error: "Car Id is required",
        }),
    }),
};
exports.createCarSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.getCarSchema = (0, zod_1.object)(Object.assign({}, params));
