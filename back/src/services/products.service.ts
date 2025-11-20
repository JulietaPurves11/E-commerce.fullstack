import { AppDataSource } from "../config/dataSource";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";

export const checkProductExists = async (itemId: number): Promise<boolean> => {
  const item: Product | null = await ProductRepository.findOneBy({
    id: itemId,
  });
  return !!item;
};

export async function getProductsService() {
  const repo = AppDataSource.getRepository(Product);
  return await repo.find();
}

export async function getProductByIdService(id: number) {
  const repo = AppDataSource.getRepository(Product);
  const product = await repo.findOneBy({ id });
  return product ?? null;
}
