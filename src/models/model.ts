import mongoose from "mongoose";

const { Schema } = mongoose;

const modelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    makes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Make",
      },
    ],
  },
  {
    timestamps: true,
  }
);



const CarModel = mongoose.model("Model", modelSchema);

export default CarModel;
