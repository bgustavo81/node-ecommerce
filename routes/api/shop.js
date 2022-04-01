const path = require("path");

const express = require("express");

// const shopController = require("../../controllers/shop");

const isAuth = require('../../middleware/auth');

const router = express.Router();

// router.get('/', shopController.getHome);

// router.get('/products', shopController.getProducts);

// router.get("/products/:productId", shopController.getProduct);

// router.get("cart", isAuth, shopController.getCart);

// router.post("/cart", isAuth, shopController.postCart);

// router.delete('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

// router.get("/checkout", isAuth, shopController.getCheckout);

// router.get('/checkout/success', shopController.getCheckoutSuccess);

// router.get('/checkout/cancel', shopController.getCheckoutCancel);

// router.get('/order', isAuth, shopController.getOrders);

// router.get('/orders/:orderId', isAuth, shopController.getInvoice);

module.exports = router;