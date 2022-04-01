const pool = require('../config/pool');

module.exports = class Products {
    constructor(title, price, description, image_url, creator_id, created_at, product_id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.image_url = image_url;
        this.creator_id = creator_id;
        this.created_at = created_at;
        this.product_id = product_id;
    }

    static getProductById(product_id) {
        return pool.query(
            'SELECT * FROM products WHERE product_id = $1',
            [product_id]
        )
    };

    static getNewestProduct(creator_id) {
        return pool.query(
            `SELECT * FROM products WHERE creator_id = $1 ORDER BY product_id DESC LIMIT 1`,
            [creator_id]
        )
    };

    static getProducts() {
        console.log("pre-query")
        return pool.query(
            'SELECT * FROM products ORDER BY created_at DESC'
        )
    };

    createProduct() {
        return pool.query(
            `INSERT INTO products (title, price, description, image_url, creator_id)
                VALUES ($1, $2, $3, $4, $5)`,
            [this.title, this.price, this.description, this.image_url, this.creator_id]
        )
    };

    static updateProductById(creator_id, title, description, price, product_id) {
        return pool.query(
            `UPDATE products SET 
                creator_id = $1, 
                title = $2, 
                description = $3,
                price = $4
                WHERE product_id = $5`,
                [creator_id, title, description, price, product_id]
        )
    };

    static deleteProductById(product_id) {
        console.log(product_id)
        return pool.query(
            'DELETE FROM products WHERE product_id = $1',
            [product_id]
        )
    };

    static deleteProductsByAuthor(creator_id) {
        return pool.query(
            'DELETE FROM products WHERE creator_id = $1',
            [creator_id]
        )
    };

};