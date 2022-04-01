// const { id } = require('pdfkit/js/reference');
const pool = require('../config/pool');

module.exports = class User {
    constructor(id, email, password, username) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.username = username;
    }

    static getUserById(id) {
        return pool.query(
            ' SELECT * FROM users where id = $1',
            [id]
        )
    };

    static getUsers() {
        return pool.query(
            'SELECT * FROM users'
        )
    };

    static getProfileById(user_id) {
        return pool.query(
            `SELECT * FROM user_information WHERE id = $1`,
            [user_id]
        )
    };

    static getProfiles() {
        return pool.query(
            ` SELECT * FROM user_information;`
        )
    };

    static getUserByEmail(email) {
        return pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        )
    };

    static getUserById(id) {
        return pool.query(
            'SELECT * FROM users WHERE id = $1',
            [id]
        )
    };

    static getUsers() {
        return pool.query(
            'SELECT * FROM users ORDER BY id DESC'
        )
    };

    // this function is for testing/admin purposes
    createUser() {
        return pool.query(
            `INSERT INTO users (id, email, password, username)
                VALUES ($1, $2, $3, $4)`,
            [this.id, this.email, this.password, this.username]
        )
    };

    // this is the registration at initial login function
    createLoginUser() {
        return pool.query(
            `INSERT INTO users (id, email, password, username)
                VALUES ($1, $2, $3, $4)`,
                [this.id, this.email, this.password, this.username]
        )
    };

    static updateUser(username, email, id) {
        return pool.query(
            `UPDATE users SET name = $1, email = $2 WHERE id = $3`,
            [username, email, id]
        )
    };

    // for an instance of total deletion of user
    static deleteUserInformation(id) {
        return pool.query(
            `DELETE FROM users WHERE users.id = $1`,
            [id]
        )
    };
};



// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     email: {
//         type: String,
//         required: true
//     },

//     password: {
//         type: String,
//         required: true
//     },
//     resetToken: String,
//     resetTokenExpiration: Date,
//     cart: {
//         items: [
//             {
//                 productId: {
//                     type: Schema.Types.ObjectId,
//                     ref: "Product",
//                     required: true
//                 },
//                 quantity: { type: Number, required }
//             }
//         ]
//     }
// });

// userSchema.methods.addToCarts = function(product) {
//     const cartProductIndex = this.cart.items.findIndex(cp => {
//         return cp.productId.toString() === product._id.toString();
//     });
//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items]; 

//     if (cartProductIndex >= 0) {
//         newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//         updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//         updatedCartItems.push({
//             productId: product._id,
//             quantity: newQuantity
//         });
//     }
//     const updatedCart = {
//         items: updatedCartItems
//     };

//     this.cart = updatedCart;
//     return this.save();
// };

// userSchema.methods.removeFromCart = function(productId) {
//     const updatedCartItems = this.cart.items.filter(item => {
//         return item.productId.toString() !== productId.toString();
//     });

//     this.cart.items = updatedCartItems;
//     return this.save();
// }

// userSchema.methods.clearCart = function() {
//     this.cart = { items: [] };
//     return this.save();
// };

// module.exports = mongoose.model('User', userSchema);