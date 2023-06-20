module.exports = {
    PORT: process.env.PORT || 8080,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || '5500',
    DB_USERNAME: process.env.DB_USERNAME || 'luminews',
    DB_USERNAME_PASSWORD: process.env.DB_USERNAME_PASSWORD || 'luminews1234',
    DB_NAME: process.env.DB_NAME || 'luminews_db',
};