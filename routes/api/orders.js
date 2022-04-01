const express = require("express");

const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Users = require("../../models/users");
const Cart = require("../../models/cart");
const Orders = require("../../models/orders");
const Products = require("../../models/products");
const UserInformation = require("../../models/userInformation");

// @Router post api/orders
// @Desc Create an Order
// @Access Private
// router.post("/", async (req, res) => {
//     try {
//         // take information from cart and
//         // use the information to create the order
//         const order_content = await Cart.getCartByUserId(req.user.id);
//         if(order_content.items === "") {
//             return res.status(401).json({ msg: "Cart is empty" });
//         }

        
//     }
// })