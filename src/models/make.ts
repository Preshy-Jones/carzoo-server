import mongoose from "mongoose";
import slugify from "slugify";

const { Schema } = mongoose;

const makeSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

makeSchema.pre("validate", function (next) {
  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

const CarMake = mongoose.model("Make", makeSchema);

export default CarMake;
