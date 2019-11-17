const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const products = sequelize.define('products',{
    id:{
        type:Sequelize.INTEGER,
        autoIntrement: true,
        allowNull: false,
        primaryKey:true
    },
    title:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    price:{
        type:Sequelize.DOUBLE,
        allowNull: false,
    },
    imgUrl:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    description:{
        type:Sequelize.STRING,
        allowNull: false,

    }
})

module.exports = products;