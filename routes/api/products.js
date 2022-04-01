const express = require("express");

const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Users = require('../../models/users');
const Cart = require('../../models/cart');
const Orders = require('../../models/orders');
const Products = require('../../models/products');
const UserInformation = require("../../models/userInformation");
// const { post } = require("./users");

// @Router Post api/products
// @Desc Create a Product
// @Access Private
router.post(
    "/", 
    [
        auth, 
        [
            check("Title", "Title is required!").not().isEmpty(),
            check("Price", "Price is required").not().isEmpty(),
            check("Description", "Description is required").not().isEmpty(),
            check("image_url", "Image url is required").not().isEmpty()
        ]
    ],
    async (req, res) => {

        console.log(req.body);
        const title = req.body.title;
        const price = req.body.price;
        const description = req.body.description;
        const image_url = req.body.image_url;
        const creator_id = req.body.id;
        console.log(req.user.id + "line 33");

        try {
            let product = new Products(title, price, description, image_url, creator_id);
            await product.createProduct();
            product = await Products.getNewestProduct(req.user.id);
            console.log(product.rows[0]);

            res.status(201).json(product.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error in products.js");
        }   
    }
)

// @route GET api/shop
// @desc Get all shop
// access Public

router.get("/", async (req, res) => {
    try {
        const product = await Products.getProducts();
        // console.log(product.rows);
        res.json(product.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: "Server error in products.js"});
    }
});

// @Router GET api/products/:id
// @desc GET single post
// @access public 
router.get("/:id", async (req, res) => {
    console.log(req.body);
    try {
        console.log("hello")
        console.log(req.body);
        const product = await Products.getProductById(req.params.id);
        res.status(200).json(product.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error in products.js");
    }
});

// @route DELETE api/products/:id
// @Desc DELETE a single post
// @access private
router.delete("/:id", auth, async (req, res) => {
    const product_id = req.params.id;
    try {
        const product = await Products.getProductById(product_id);
        console.log(product);

        if (product.rows.length === 0) {
            return res.status(404).json({ msg: "Product not found" });
        }
        // Make sure user is admin
        // TRUE is admin, FALSE is not admin
        console.log(req);
        if (req.user.id !== product.rows[0].creator_id) {
            return res.status(401).json({ msg: "User is not authorized to delete this product" });
        }
        console.log(product_id);
        await Products.deleteProductById(product_id);

        res.status(200).json({ msg: "Product was removed" });
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({msg: "Product not found"});
        }
        res.status(500).send("Server error in products.js");
    }
});

// @route PUT api/products/:id
// @desc UPDATE a single post
// @access private
router.patch("/:id", auth, async (req, res) => {
    try {
        const creator_id = req.user.id;
        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        const product_id = req.params.id;
        console.log("line 123");
        console.log(req.user);

        const admin = await Users.getUserById(creator_id);

        const admin_status = admin.rows[0].admin;

        console.log(admin_status);

        // Make sure user is admin
        // TRUE is admin, FALSE is not admin
        if (!admin_status) {
            return res.status(401).json({ msg: "User is not authorized to update this product"});
        }

        console.log("past conditional");


        await Products.updateProductById(creator_id, title, description, price, product_id);

        res.status(200).json({ msg: "Product was updated" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error in products.js");
    }
});

module.exports = router;
