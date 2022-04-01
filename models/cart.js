const pool = require('../config/pool');

module.exports = class Cart {
    constructor(user_id, items) {
        this.user_id = user_id;
        this.items = items;
    }

    static getCartByUserId(user_id) {
        return pool.query(
            'SELECT * FROM carts WHERE user_id = $1',
            [user_id]
        )
    };

    createCart() {
        return pool.query(
            `INSERT INTO carts (user_id, items)
                VALUES ($1, $2)`,
            [this.user_id, this.items]
        )
    };

    static updateCart(items, user_id) {
        return pool.query(
            `UPDATE carts SET
                items = $1
                WHERE user_id = $2`,
            [items, user_id]
        )
    };

    static deleteCart(user_id) {
        return pool.query(
            'DELETE FROM carts WHERE user_id = $1',
            [user_id]
        )
    };
}