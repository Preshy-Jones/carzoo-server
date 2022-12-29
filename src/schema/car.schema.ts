import { object, string, number, array, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Car name is required",
    }),
    title: string({
      required_error: "Car title is required",
    }),
    year: string({
      required_error: "Year is required",
    }),
    make: string({
      required_error: "Make is required",
    }),
    model: string({
      required_error: "Model is required",
    }),
    milleage: number({
      required_error: "Milleage is required",
    }),

    description: string({
      required_error: "Description is required",
    }).min(120, "Description should be at least 120 characters long"),
    price: number({
      required_error: "Price is required",
    }),
    installment: number({
      required_error: "Installment is required",
    }),
    images: string().array(),
  }),
};

const params = {
  params: object({
    carId: string({
      required_error: "Car Id is required",
    }),
  }),
};

export const createCarSchema = object({
  ...payload,
});

export const getCarSchema = object({
  ...params,
});

export type CreateCarInput = TypeOf<typeof createCarSchema>;
export type GetCarInput = TypeOf<typeof getCarSchema>;
