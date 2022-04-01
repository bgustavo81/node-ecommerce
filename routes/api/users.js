const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { check, validationResult }  = require("express-validator");
const User = require("../../models/users");
const keys = require("../../config/keys");

// @Route POST api/users
// @Desc This is a test route
// @Access public
router.post(
    "/",
    [
        check("username", "Username is required")
            .not()
            .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check(
            "password", "Please enter a password with seven or more characters"
        ).isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;


        // generate id
        const id = Math.floor(Math.random() * 1000000);
        try {
            let user = await User.getUserByEmail(email);
            // Check is user exists
            if (user.rows.length >=1) {
                return res.status(400).send({ errors: [{ message: "User already exiists"}] });
            }

            user = new User (
                id,
                email,
                password,
                username
            );


            // salt the password, default 10
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.createUser();

            // create payload
            const payload = {
                user: {
                    id: user.id
                }
            };
            // expiration date extreme for testing purposes
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

            // check is user exists
            // encrypt password
            // return json webtoken
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

module.exports = router;