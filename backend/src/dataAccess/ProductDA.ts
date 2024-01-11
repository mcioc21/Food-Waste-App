import Product, { ProductCreationAttributes } from "../entities/Product";
import ProductFilterDto from "./models/productFilterDto";
import { Like } from "./operators";

async function createProduct(product: ProductCreationAttributes) {
    return await Product.create(product);
}

async function getProductById(id: number) {
    return await Product.findByPk(id);
}

async function getProducts(productFilter: ProductFilterDto) {
    if (!productFilter.take)
      productFilter.take = 10;
  
    if (!productFilter.skip)
      productFilter.skip = 0;
  
    let whereClause: any = {};
    if (productFilter.productId)
      whereClause.productId = { [Like]: `%${productFilter.productId}%` };
    if (productFilter.productName)
      whereClause.productName = { [Like]: `%${productFilter.productName}%` };
    if (productFilter.productExpiry)
        whereClause.productExpiry = { [Like]: `%${productFilter.productExpiry}%` };
    if (productFilter.reservedBy)
        whereClause.reservedBy = { [Like]: `%${productFilter.reservedBy}%` };
    if (productFilter.userId)
      whereClause.userId = { [Like]: `%${productFilter.userId}%` };
    
    return await Product.findAndCountAll(
      {
        distinct: true,
        where: whereClause,
        limit: productFilter.take,
        offset: productFilter.skip * productFilter.take,
      });
}

async function deleteProduct(id: number) {
    let deleteElem = await Product.findByPk(id);

    if (!deleteElem) {
        console.log("This element does not exist, so it cannot be deleted");
        return;
    }
    return await deleteElem.destroy();
}

async function updateProduct(product: ProductCreationAttributes, id: number) {
    const findProduct = await getProductById(product.ProductId);

    if (!findProduct) {
        console.log("This product does not exist");
        return;
    }

    return await findProduct.update(product);
}

export default {
    createProduct,
    getProductById,
    getProducts,
    deleteProduct,
    updateProduct
}