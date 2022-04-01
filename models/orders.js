const pool = require('../config/pool');

module.exports = class Orders {
    constructor(products, user_email, user_id, ordered_at, order_id, order_total) {
        this.products = products;
        this.user_email = user_email;
        this.user_id = user_id;
        this.ordered_at = ordered_at;
        this.order_id = order_id;
        this.order_total;
    }

    static getOrderByUserId(user_id) {
        return pool.query(
            'SELECT * FROM orders WHERE user_id = $1 DESC',
            [user_id]
        )
    };

    static getLatestOrderByUser(user_id) {
        return pool.query(
            `SELECT * FROM orders WHERE user_id = $1 ORDER BY create_at LIMIT 1`,
            [user_id]
        )
    };

    static getOrders() {
        return pool.query(
            'SELECT * FROM orders ORDER BY ordered_at DESC LIMIT 50',
        )
    };

    createOrder() {
        return pool.query(
            `INSERT INTO ordrers (products, user_email, user_id, ordered_at, order_total)
                VALUES ($1, $2, $3, $4)`,
            [this.products, this.user_email, this.user_id, this.ordered_at, this.order_total]
        )
    };

    static updateOrder(order_id, user_id, products, order_total) {
        return pool.query(
            `UPDATE orders SET
                products = $1, 
                order_total = $2,
                WHERE order_id = $3 AND user_id $4`,
            [products, order_total, order_id, user_id]
        )
    };

    static deleteOrder(order_id) {
        return pool.query(
            'DELETE FROM orders WHERE order_id = $1',
            [order_id]
        )
    };
}