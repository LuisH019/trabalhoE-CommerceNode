const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Supplier = sequelize.define('Supplier', {
        idSupplier: {
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
    });

    return Supplier;
};
