module.exports = {
    cookieKey: process.env.COOKIE_KEY,
    pgUser: process.env.PG_USER,
    pgHost: process.env.PG_HOST,
    pgDatabase: process.env.PG_DATABASE,
    pgPassword: process.env.PG_PASSWORD,
    jwtSecret: process.env.JWT_SECRET,
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
    AWS_S3_ACCESS_SECRET_KEY: process.env.AWS_S3_ACCESS_SECRET_KEY
};