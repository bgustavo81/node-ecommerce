const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const keys = require('../../config/keys');
const { check, validationResult } = require("express-validator");

const User = require("../../models/users");

// @Route Get api/auth
// @Desc Test Route
// @Access Public

router.get("/", auth, async (req, res) => {
    try {
        const user = await User.getUserById(req.user.id);
        res.json(user.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// @Route Post api/auth
// @Desc Authenticate user, retrieve token as well
// @Access Public

router.post(
    "/",
    [
        check("email", "Please enter a valid email").isEmail(),
        check(
            "password",
            "Please enter a password with six or more characters"
        ).exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;


        try {
            let user = await User.getUserByEmail(email);
            console.log(user);
            // Checking if user exists
            console.log(user.rows[0]);
            if ( user.rows.length === 0) {
                return res.status(400).json({ errors: [{ message: "Invalid credentials"}] });
            }
            // Check plain text against encrypted password
            const isMatch = await bcrypt.compare(password, user.rows[0].password);

            console.log(isMatch);

            if (!isMatch) {
                return res 
                    .status(400)
                    .json({ errors: [{ message: "Invalid credentials" }] });
            }

            // Create payload
            const payload = {
                user: {
                    id: user.rows[0].id
                }
            };

            // Expiration date
            jwt.sign(
                payload,
                keys.jwtSecret,
                {
                    expiresIn: 36000000
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token
                    });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

module.exports = router;