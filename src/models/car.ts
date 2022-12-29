import mongoose from "mongoose";

const { Schema } = mongoose;

const carSchema = new Schema(
  {
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
    installment:{
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
  },
  {
    timestamps: true,
  }
);


const Car = mongoose.model("Car", carSchema);

export default Car;
