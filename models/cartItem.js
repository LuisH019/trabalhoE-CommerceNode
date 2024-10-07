const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const CartItem = sequelize.define('CartItem', {
        idCartItem: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        idCart: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Cart',
                key: 'idCart'
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
