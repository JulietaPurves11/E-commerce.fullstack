import { CreateOrderDto } from "../dtos/createOrderDto";
import { Order } from "../entities/Order";
import { OrderRepository } from "../repositories/order.repository";
import { ProductRepository } from "../repositories/product.repository";
import { UserRepository } from "../repositories/user.repository";

export const createOrderService = async (
  createOrderDto: CreateOrderDto
): Promise<Order> => {
  const productsF = [];

  for await (const id of createOrderDto.products) {
    const product = await ProductRepository.findOneBy({ id });
    if (!product) throw new Error("Product not found");
    productsF.push(product);
  }

  const userF = await UserRepository.findOneBy({ id: createOrderDto.userId });
  if (!userF) throw new Error("User not found");

  const newOrder = OrderRepository.create();

  newOrder.status = "approved";
  newOrder.date = new Date();
  newOrder.user = userF;
  newOrder.products = productsF;
  newOrder.customerName = createOrderDto.checkout.name;
  newOrder.customerEmail = createOrderDto.checkout.email;
  newOrder.customerAddress = createOrderDto.checkout.address;
  newOrder.customerCity = createOrderDto.checkout.city;
  newOrder.customerPostalCode = createOrderDto.checkout.postalCode;
  newOrder.deliveryMethod = createOrderDto.checkout.deliveryMethod;

  await OrderRepository.save(newOrder);
  return newOrder;
};
