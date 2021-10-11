

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Jeu', {
        score: {
            type: DataTypes.JSON,
            allowNull: false
        },
    }, {
        // Other model options go here
    });
}