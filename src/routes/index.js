const express = require('express');
const path = require('path');
const ProductService = require('../services');
const receipt = '../assets/receipt.pdf'

const platziStore = (app) => {
  const router = express.Router();
  app.use('/api/', router);

  const productService = new ProductService();

  router.get('/', (req, res) => {
    res.send(`API v2`);
  });

  router.get('/receipts', (req, res, next) => {
    let file = path.join(__dirname, receipt);
    res.sendFile(file);
  });
  
  
  
  router.get('/products', async (req, res, next) => {
    const { tags } = req.query;
    const storeProducts = await productService.getProducts({ tags })
    res.status(200).json({
      data: storeProducts,
      message: 'products listed',
    });
  });

   /* Get product function */
   router.get('/products/:productId', async function (req, res, next) {

    /* Use req.params when the parameter is specified in the URL */
    const { productId } = req.params;

    try {
      const products = await productService.getProduct({ productId });
      res.status(200).json({
        data: products,
        message: 'product retrieved',
      });
    } catch (err) {
      next(err);
    }
  });

  /* Create product function */
  router.post('/products/', async function (req, res, next) {

    const { body: product } = req;
    console.log(product)
    try {
      const createdproductId = await productService.createProduct({ product });
      res.status(201).json({
        data: createdproductId,
        message: 'product created',
      });
    } catch (err) {
      next(err);
    }
  });

  /* w5NKVv2ZHytilUQe */

  /* Update product function */
  router.put('/products/:productId',  async function (req, res, next) {

    /* Use body from req when data is sending in the body of the request */
    const { body: product } = req;
    const { productId } = req.params;

    try {
      const updatedproductId = await productService.updateProduct({ productId, product });
      res.status(200).json({
        data: updatedproductId,
        message: 'product updated',
      });
    } catch (err) {
      next(err);
    }
  });

  /* Patch function */
  router.patch('/products/:productId',  async function (req, res, next) {

    const { body: product } = req;
    const { productId } = req.params;

    try {
      const patchedproductId = await productService.patchProduct({ productId, product });
      res.status(200).json({
        data: patchedproductId,
        message: 'product patched',
      });
    } catch (err) {
      next(err);
    }
  });

  /* Delete function */
  router.delete('/products/:productId', async function (req, res, next) {

    const { productId } = req.params;

    try {
      const deletedproductId = await productService.deleteProduct({ productId });
      res.status(200).json({
        data: deletedproductId,
        message: 'product deleted',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('*', (req, res) => {
    res.status(404).send('Error 404');
  });
}

module.exports = platziStore;