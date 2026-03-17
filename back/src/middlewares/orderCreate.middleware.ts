import { NextFunction, Request, Response } from "express";
import { ClientError } from "../utils/errors";
import { checkProductExists } from "../services/products.service";

const validateOrderFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { products, checkout } = req.body;

  if (!Array.isArray(products))
    return next(new ClientError("Products must be an array"));
  if (products.length === 0)
    return next(new ClientError("Order must have at least one item"));

  for (const item of products) {
    if (!item || typeof item !== "object") {
      return next(new ClientError("Each product must be an object"));
    }

    if (!Number.isInteger(item.id) || item.id <= 0) {
      return next(new ClientError("Invalid product id"));
    }

    if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
      return next(new ClientError("Invalid product quantity"));
    }
  }

  if (!checkout || typeof checkout !== "object")
    return next(new ClientError("Checkout data is required"));

  const required = ["name", "email", "address", "city", "postalCode", "deliveryMethod"];
  for (const field of required) {
    if (!checkout[field] || String(checkout[field]).trim() === "") {
      return next(new ClientError(`Missing checkout field: ${field}`));
    }
  }

  if (!["envio", "retiro"].includes(checkout.deliveryMethod)) {
    return next(new ClientError("Invalid delivery method"));
  }

  next();
};

const validateItemsExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { products } = req.body;

  for await (const item of products) {
    const exists = await checkProductExists(item.id);
    if (!exists) {
      return next(
        new ClientError("One or more items do not exist in the database")
      );
    }
  }

  next();
};

export default [validateOrderFields, validateItemsExist];