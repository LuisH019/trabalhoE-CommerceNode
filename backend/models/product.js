const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Product = sequelize.define('Product', {
        idProduct: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },

        description: {
            type: Sequelize.STRING,
            allowNull: true
        },

        price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },

        stock: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    Product.associate = (models) => {
        Product.belongsToMany(models.User, {
            through: models.CartItem,
            foreignKey: 'idProduct',
            as: 'users'
        });
    };

    return Product;
};
