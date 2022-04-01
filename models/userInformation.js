const pool = require('../config/pool');

module.exports = class UserInformation{
    constructor(user_id, address_street, address_city, address_state, address_country, address_zip_code, photo) {
        this.user_id = user_id;
        this.address_street = address_street;
        this.address_city = address_city;
        this.address_state = address_state;
        this.address_country = address_country;
        this.address_zip_code = address_zip_code;
        this.photo = photo
    }

    static getUserInformationById(user_id) {
        return pool.query(
            'SELECT * FROM user_information WHERE user_id = $1',
            [user_id]
        )
    };

    static getUserInformationById(user_id) {
        return pool.query(
            `SELECT * FROM user_information where user_id = $1`,
            [user_id]
        )
    };

    static getUserPhoto(user_id) {
        return pool.query(
            `SELECT photo FROM user_information WHERE user_id = $1`,
            [user_id]
        )
    };

    static addUserPhoto(photo, user_id) {
        return pool.query(
            `UPDATE general_info SET
                image = $1
                WHERE user_id = $2`,
            [image, user_id]
        )
    };

    createUserInformation() {
        return pool.query(
            `INSERT INTO user_information(user_id, address_street, address_city, address_state, address_country, address_zip_code, photo)
                VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [this.user_id, this.address_street, this.address_city, this.address_state, this.address_country, this.address_zip_code, this.photo]
        )
    };

    static updateUserInformation(address_street, address_city, address_state, address_country, address_zip_code, photo) {
        return pool.query(
            `UPDATE user_information SET
                address_street = $1,
                address_city = $2,
                address_state = $3,
                address_country = $4,
                address_zip_code = $5,
                photo = $6`,
            [address_street, address_city, address_state, address_country, address_zip_code, photo]
        )
    };

    static deleteUserInformationById(user_id) {
        return pool.query(
                'DELETE FROM user_information WHERE user_id = $1',
                [user_id]
        )
    };
};