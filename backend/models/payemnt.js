const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Payment = sequelize.define('Payment', {
        idPayment: {
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

        totalCost: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },

        paymentMethod :{
            type: Sequelize.STRING,
            allowNull: false
        },

        status :{
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Payment;
};