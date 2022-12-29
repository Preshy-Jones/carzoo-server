import { Request, Response, NextFunction } from "express";
import { ConflictError } from "../../errors";
import Car from "../../models/car";
import CarMake from "../../models/make";
import CarModel from "../../models/model";
import { CreateCarInput, GetCarInput } from "../../schema/car.schema";
import mongoose from "mongoose";

const toId = mongoose.Types.ObjectId;

export const createCarHandler = async (
  req: Request<{}, {}, CreateCarInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).send({
      success: true,
      message: "Car created successfully",
      car,
    });
  } catch (err) {
    next(err);
  }
};

export const getCarHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const car = await Car.findById(req.params.carId);

    res.status(200).send({
      success: true,
      message: "Car fetched successfully",
      car,
    });
  } catch (err) {
    next(err);
  }
};

export const getCarsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { model, make, minYear, maxYear } = req.query;

    console.log(typeof make);

    const minPrice = parseInt(req.query.minPrice as string);
    const maxPrice = parseInt(req.query.maxPrice as string);

    interface Filter {
      model?: string;
      make?: string;
      year?: { $gte: number; $lte: number };
      price?: { $gt: number; $lt: number };
    }
    const filter: Record<string, any> = {};
    if (model || model) {
      filter["model"] = model as string;
    }
    if (make) {
      filter["make"] = make as string;
    }
    // if (year) {
    //   filter["year"] = year as string;
    // }

    if (minYear && maxYear) {
      filter["year"] = { $gte: minYear, $lte: maxYear };
    } else if (minYear) {
      filter["year"] = { $gte: minYear };
    } else if (maxYear) {
      filter["year"] = { $lte: maxYear };
    }

    if (minPrice && maxPrice) {
      filter["price"] = { $gt: minPrice, $lt: maxPrice };
    } else if (minPrice) {
      console.log("hello");
      filter["price"] = { $gt: minPrice };
    } else if (maxPrice) {
      filter["price"] = { $lt: maxPrice };
    }

    const filterFormtatted = {
      ...filter,
      ...(filter.price && {
        minPrice: filter.price.$gt,
        maxPrice: filter.price.$lt,
      }),
      ...(filter.year && {
        minYear: filter.year.$gte,
        maxYear: filter.year.$lte,
      }),
    };

    const {
      ["price"]: price,
      ["year"]: year,
      ...filterPayload
    } = filterFormtatted;

    const cars = await Car.find(filter);
    res.status(200).send({
      success: true,
      message: "Cars fetched successfully",
      cars,
      filter: filterPayload,
    });
  } catch (err) {
    next(err);
  }
};

export const createModelHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foundModel = await CarModel.findOne({ name: req.body.name });
    if (foundModel) {
      throw new ConflictError("Model already exist");
    }

    const model = await CarModel.create(req.body);
    res.status(201).send({
      success: true,
      message: "Model created successfully",
      model,
    });
  } catch (err) {
    next(err);
  }
};

export const getModelsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const models = await CarModel.find().populate("makes");
    res.status(200).send({
      success: true,
      message: "Models fetched successfully",
      models,
    });
  } catch (err) {
    next(err);
  }
};

export const getSingleModelHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const car = await CarModel.findById(req.params.modelId).populate("makes");
    res.status(200).send({
      success: true,
      message: "Model fetched successfully",
      car,
    });
  } catch (err) {
    next(err);
  }
};

export const createMakeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { makeName, modelName } = req.body;
    const foundMake = await CarMake.findOne({
      name: makeName,
      modelName: modelName,
    });
    if (foundMake) {
      throw new ConflictError("Make already exists");
    }

    const foundModel = await CarModel.findOne({ name: modelName });
    if (!foundModel) {
      throw new ConflictError("Model does not exist");
    }

    const make = await CarMake.create({
      name: makeName,
      modelName: modelName,
      model: foundModel._id,
    }).then((make) => {
      return CarModel.findByIdAndUpdate(
        foundModel._id,
        {
          $push: { makes: make._id },
        },
        { new: true, useFindAndModify: false }
      );
    });
    res.status(201).send({
      success: true,
      message: "Make created successfully",
      make,
    });
  } catch (err) {
    next(err);
  }
};

export const getMakesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const makes = await CarMake.find().populate("model");
  res.status(200).send({
    success: true,
    message: "Makes fetched successfully",
    makes,
  });
};

export const getSingleMakeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const car = await CarMake.findById(req.params.carId);
    res.status(200).send({
      success: true,
      message: "Car fetched successfully",
      car,
    });
  } catch (err) {
    next(err);
  }
};
