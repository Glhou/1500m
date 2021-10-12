

const path = require('path')
const cookieParser = require('cookie-parser')

const jeu = require('./back/script'); //import

const express = require('express');
//const { json } = require('./sequelize/types');

const db = require('./db');
const joueur = require('./models/joueur');

const app = express()

const hostname = '127.0.0.1';
const port = 3000;

app.use(cookieParser())
app.use(express.json())


app.use(function (req, res, next) {
    date = new Date(Date.now())
    console.log('Time:', date.toLocaleDateString(), date.toLocaleTimeString(), "; url :", req.url);
    next(); // sans cette ligne on ne pourra pas poursuivre.
})



app.use((req, res, next)=> {
    if(req.cookies["id_joueur"]){
        db.models.Joueur.findByPk(req.cookies["id_joueur"])
        .then((joueur)=>{
            if (joueur != null){
                if (joueur.list_de.length == 8){
                    joueur.score = jeu.somme(joueur.list_de)
                    joueur.save()
                }
            }
        })
    }

    next();
})


app.get('/', (req, res) => {
    res.redirect(301, '/static/index.html')
})

app.use("/static", express.static(path.join(__dirname, '/static')))

/*
app.get(encodeURI('/somme'), (req, res) => {
    list_de_q = req.query["list_de"]
    var list_de = list_de_q.split(",")
    for (var i = 0; i< list_de.length; i++){
        list_de[i] = parseInt(list_de[i])
    }
    res.json({
        somme : jeu.somme(list_de), 
    })
})
*/
/*
app.get(encodeURI('/choix'), (req, res) => {
    choix = req.query["c"]
    console.log(choix)

    res.json({
        choix : choix,
    })
})
*/

app.post("/api/cookie",(req, res, next)=> { // il charge ça aussi pour les fichiers css et js mdr d'où les 3 entrées ok j'ai trouvé une solution dégueulasse dans l'affichage
    db.models.Joueur.create({
        coup_comp: 5,
        new_de : jeu.lance_de(),
        list_de: [], // on met un array parceque le setter need un array
    }).then((joueur) => {
        res.cookie('id_joueur', joueur.id)
        res.json({"id_joueur":joueur.id})
    }).catch((err) => {
        console.log(err)
    })

})

app.post("/api/affichage", (req, res) => {
    db.models.Joueur.findByPk(req.body.id_joueur)
    .then((joueur) =>{
        if (joueur != null){
            res.json({
                list_de : joueur.list_de,
                de : joueur.new_de, 
                coup_comp: joueur.coup_comp,
                score: joueur.score
            })
        }
    })
})

app.post("/api/scores", (req,res)=>{
    db.models.Joueur.findAll()
    .then((joueur)=>{
        res.json(joueur)
    })
})

app.post('/api/relance', (req, res) => {
    db.models.Joueur.findByPk(req.body.id_joueur)
    .then((joueur) => {
        if(joueur.coup_comp > 0){
            joueur.coup_comp -= 1
            joueur.new_de = jeu.lance_de()
            if (joueur.coup_comp < 1){
                if (isNaN(joueur.list_de[0])){ // obilger de retirer ce putain d'élément de merde qui apparait tout seul
                    var list = jeu.tour_comp(9-joueur.list_de.length) // on compte null en plus du coup
                    var temp_list = joueur.list_de
                    temp_list = temp_list.concat(list)
                    temp_list.shift()
                    joueur.list_de = temp_list
                }
                else{
                    var list = jeu.tour_comp(8-joueur.list_de.length)
                    joueur.list_de = joueur.list_de.concat(list)
                }
            }
            joueur.save()
        }
    }).catch((err) => {
        res.end("error")
        console.log(err)
    })

})

/*
app.post("/api/create/jeu", (req, res) => {

    db.models.Jeu.create({
        score: {},
    }).then((message) => {
        res.json(message)
    }).catch((err) => {
        console.log(err)
    })
})
*/

/*
app.post("/api/list/",(req,res) => {
    id_joueur = req.query["id_joueur"]
    db.models.Joueur.findByPk(id_joueur)
    .then((joueur) => {
        list_de = joueur.list_de
        res.json(list_de)
    }).catch((err) => {
        res.end("error")
        console.log(err)
    })
})
*/

app.post("/api/new_de/", (req,res) => {
    
    db.models.Joueur.findByPk(req.body.id_joueur)
    .then((joueur) => {
        list_de = joueur.list_de // trouver comment récupèrer
        if (isNaN(list_de[0])){ // obilger de retirer ce putain d'élément de merde qui apparait tout seul
            list_de.shift() 
        }
        if (list_de.length < 8){
            list_de.push(req.body.de)
        }
        if(list_de.length == 8){
            res.json({"somme": jeu.somme(list_de)})
        }
        joueur.new_de = jeu.lance_de()
        joueur.list_de = list_de
        joueur.save()
        console.log(joueur)
    }).catch((err) => {
        //res.end("error")
        console.log(err)
    })

    // il faut reload la page
})

/*
app.post("/api/create/joueur", (req, res) => {

    db.models.Joueur.create({
        coup_comp: 5,
        list_de:[],
    }).then((joueur) => {
        res.json(joueur)
    }).catch((err) => {
        console.log(err)
    })
}) */
/*
app.get("/cookie/", (req, res) => {
    console.log(req.query)
    for (const property in req.query) {
        // console.log(`${property}: ${req.query[property]}`);

        res.cookie(property, req.query[property]) 
        res.redirect("/static/index.html")
      }
})
*/
app.get("/delcookie/", (req, res) => {
    for (const property in req.query) {
        //console.log(`${property}: ${req.query[property]}`);

        res.clearCookie(property, req.query[property])
        res.redirect("/static/index.html")   
      }
})



app.use(function (req, res) {
    console.log("et c'est le 404 : " + req.url);

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');

    res.end("<html><head><title>la quatre cent quatre</title></head><body><h1>Et c'est la 404.</h1></body></html>");

})

app.listen(port, hostname);
console.log(`Server running at http://${hostname}:${port}/`);