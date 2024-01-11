import express from 'express';
import {createProduct, getProducts} from "../dataAccess/ProductDA"
import productFilterDto from '../dataAccess/models/productFilterDto';

let productRouter = express.Router();

productRouter.route('/product').post( async (req, res) => {
  return res.json(await createProduct(req.body));
})

productRouter.route('/product').get( async (req, res) => {  
    var queryParams = new productFilterDto(req.query)
  return res.json(await getProducts(queryParams));
})

//add rest of routes for product