const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Joueur', {
        coup_comp: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        new_de: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        list_de: {
            type: DataTypes.STRING,
            allowNull: true,
            get() {
                var val = this.getDataValue("list_de")
                if (parseInt(val) == val || isNaN(val)){
                    val = val.toString()
                }
                return val.split(';').map(x => parseInt(x))
            },
            set(val) {
                this.setDataValue('list_de',val.join(';'));
            },
        },
        score:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        // Other model options go here
    });
}

