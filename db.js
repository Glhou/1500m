const { Sequelize, DataTypes, Model } = require('sequelize');

path = require('path')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'db.sqlite')
});


const joueur = require('./models/joueur')
const jeu = require("./models/jeu")

const Joueur = joueur(sequelize)
const Jeu = jeu(sequelize);

(async () => {
    // await sequelize.sync({ force: true });
    await sequelize.sync();
})()


module.exports = {
    sequeleize: sequelize,
    models:{
        Joueur:Joueur,
        Jeu:Jeu,
    }
}