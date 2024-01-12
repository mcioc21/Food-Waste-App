import express from 'express';
import {createProduct, deleteProduct, getProductById, getProducts, updateProduct} from "../dataAccess/ProductDA"
import productFilterDto from '../dataAccess/models/productFilterDto';

let productRouter = express.Router();

productRouter.route('/product').post( async (req, res) => {
  return res.json(await createProduct(req.body));
})

productRouter.route('/product').get( async (req, res) => {  
    var queryParams = new productFilterDto(req.query)
  return res.json(await getProducts(queryParams));
})

productRouter.route('/product/:id').get( async (req, res) => {
  let id = parseInt(req.params.id)
  return res.json(await getProductById(id));
})

productRouter.route('/product/:id').delete( async (req, res) => {
  let id = parseInt(req.params.id)
  return res.json(await deleteProduct(id));
})

productRouter.route('/product/:id').put( async (req, res) => {
  let id = parseInt(req.params.id)
  return res.json(await updateProduct(req.body, id));
})

export default productRouter;
