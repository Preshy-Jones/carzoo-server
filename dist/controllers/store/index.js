"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleMakeHandler = exports.getMakesHandler = exports.createMakeHandler = exports.getSingleModelHandler = exports.getModelsHandler = exports.createModelHandler = exports.getCarsHandler = exports.getCarHandler = exports.createCarHandler = void 0;
const errors_1 = require("../../errors");
const car_1 = __importDefault(require("../../models/car"));
const make_1 = __importDefault(require("../../models/make"));
const model_1 = __importDefault(require("../../models/model"));
const mongoose_1 = __importDefault(require("mongoose"));
const toId = mongoose_1.default.Types.ObjectId;
const createCarHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield car_1.default.create(req.body);
        res.status(201).send({
            success: true,
            message: "Car created successfully",
            car,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createCarHandler = createCarHandler;
const getCarHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield car_1.default.findById(req.params.carId);
        res.status(200).send({
            success: true,
            message: "Car fetched successfully",
            car,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getCarHandler = getCarHandler;
const getCarsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { model, make, minYear, maxYear } = req.query;
        console.log(typeof make);
        const minPrice = parseInt(req.query.minPrice);
        const maxPrice = parseInt(req.query.maxPrice);
        const filter = {};
        if (model || model) {
            filter["model"] = model;
        }
        if (make) {
            filter["make"] = make;
        }
        // if (year) {
        //   filter["year"] = year as string;
        // }
        if (minYear && maxYear) {
            filter["year"] = { $gte: minYear, $lte: maxYear };
        }
        else if (minYear) {
            filter["year"] = { $gte: minYear };
        }
        else if (maxYear) {
            filter["year"] = { $lte: maxYear };
        }
        if (minPrice && maxPrice) {
            filter["price"] = { $gt: minPrice, $lt: maxPrice };
        }
        else if (minPrice) {
            console.log("hello");
            filter["price"] = { $gt: minPrice };
        }
        else if (maxPrice) {
            filter["price"] = { $lt: maxPrice };
        }
        const filterFormtatted = Object.assign(Object.assign(Object.assign({}, filter), (filter.price && {
            minPrice: filter.price.$gt,
            maxPrice: filter.price.$lt,
        })), (filter.year && {
            minYear: filter.year.$gte,
            maxYear: filter.year.$lte,
        }));
        const { ["price"]: price, ["year"]: year } = filterFormtatted, filterPayload = __rest(filterFormtatted, ["price", "year"]);
        const cars = yield car_1.default.find(filter);
        res.status(200).send({
            success: true,
            message: "Cars fetched successfully",
            cars,
            filter: filterPayload,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getCarsHandler = getCarsHandler;
const createModelHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundModel = yield model_1.default.findOne({ name: req.body.name });
        if (foundModel) {
            throw new errors_1.ConflictError("Model already exist");
        }
        const model = yield model_1.default.create(req.body);
        res.status(201).send({
            success: true,
            message: "Model created successfully",
            model,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createModelHandler = createModelHandler;
const getModelsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const models = yield model_1.default.find().populate("makes");
        res.status(200).send({
            success: true,
            message: "Models fetched successfully",
            models,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getModelsHandler = getModelsHandler;
const getSingleModelHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield model_1.default.findById(req.params.modelId).populate("makes");
        res.status(200).send({
            success: true,
            message: "Model fetched successfully",
            car,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getSingleModelHandler = getSingleModelHandler;
const createMakeHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { makeName, modelName } = req.body;
        const foundMake = yield make_1.default.findOne({
            name: makeName,
            modelName: modelName,
        });
        if (foundMake) {
            throw new errors_1.ConflictError("Make already exists");
        }
        const foundModel = yield model_1.default.findOne({ name: modelName });
        if (!foundModel) {
            throw new errors_1.ConflictError("Model does not exist");
        }
        const make = yield make_1.default.create({
            name: makeName,
            modelName: modelName,
            model: foundModel._id,
        }).then((make) => {
            return model_1.default.findByIdAndUpdate(foundModel._id, {
                $push: { makes: make._id },
            }, { new: true, useFindAndModify: false });
        });
        res.status(201).send({
            success: true,
            message: "Make created successfully",
            make,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createMakeHandler = createMakeHandler;
const getMakesHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const makes = yield make_1.default.find().populate("model");
    res.status(200).send({
        success: true,
        message: "Makes fetched successfully",
        makes,
    });
});
exports.getMakesHandler = getMakesHandler;
const getSingleMakeHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield make_1.default.findById(req.params.carId);
        res.status(200).send({
            success: true,
            message: "Car fetched successfully",
            car,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getSingleMakeHandler = getSingleMakeHandler;
