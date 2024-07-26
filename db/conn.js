const path = require('path');
const { Sequelize } = require('sequelize')
const { MSG_DB_CONNECTION } = require('../constants/constants')

const dotenvPath = path.resolve(__dirname, '../.env');

require('dotenv').config({ path: path.resolve(__dirname, dotenvPath) });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log(MSG_DB_CONNECTION)
} catch (err) {
    console.log(`Falha ao conectar com o banco de dados: ${err}`)
}

module.exports = sequelize