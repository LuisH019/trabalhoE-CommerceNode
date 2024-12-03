const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const CartItem = sequelize.define('CartItem', {
        idCartItem: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        idUser: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },

        idProduct: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Product',
                key: 'idProduct'
            },
            onDelete: 'CASCADE'
        },

        nameProduct:{
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 1
        },

        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        
        partialTotalCost:{
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        }
    });

    return CartItem;
};
