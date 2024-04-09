const { Sequelize } = require("sequelize");


const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD,{
    host: 'localhost',
    port: 3307,
    dialect: 'mysql',
    logging: false
});


module.exports = db;