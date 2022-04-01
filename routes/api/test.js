const express = require("express");

const router = express.Router();


router.get("/", async (req, res) => {
    try {
        res.json({1: "hello"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error in products.js");
    }
});

module.exports = router;
