const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Cart = sequelize.define('Cart', {
        idCart: {
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
        }
    });

    Cart.associate = (models) => {
        Cart.belongsTo(models.User, { foreignKey: 'idUser', as: 'user' });

        Cart.belongsToMany(models.Product, {
            through: models.CartItem,
            foreignKey: 'idCart',
            as: 'items'
        });
    };

    return Cart;
};
