

function lance_de(){
    return Math.ceil(Math.random() * 6)
}

function verif(de){
    if(de == 6){
        return 0
    }
    else{
        return de
    }
}

function somme(liste_de){
    var somme = 0
    for (var de of liste_de){
        somme += verif(de)
    }
    return somme
}

function tour_comp(tours){
    var list = []
    for (var i=0; i< tours;i++){
        de = lance_de()
        list.push(de)
    }
    return list
}

/*
function choix_joueur(coup_comp,choix,de){ // choix = True -> relancer, choix = False -> conserve
    if (choix == true && coup_comp > 0){
        return 0
    }
    else {
        return de
    }
}

function tour_comp(tours){
    var list = []
    for (var i=0; i< tours;i++){
        list.push(lance_de())
    }
    return list
}

function choix_cont(){
    
}


function tour_joueur(coup_comp,liste_de){
    var de = lance_de()
    console.log(de)
    var recommence = true
    while (recommence && coup_comp > 0){
        var choix = choix_cont() // à récup via les boutons
        val = choix_joueur(coup_comp,choix,de)
        if (val != 0){
            recommence = false
            liste_de.push(val)
        }
        else{
            de = lance_de()
            coup_comp -= 1
        }
    }
    if (coup_comp == 0){
        var list = tour_comp(8 - liste_de.length)
        liste_de = liste_de.concat(list)
    }
    return liste_de
}

function parti_joueur(){
    var liste_de = []
    var coup_comp = 5
    while (liste_de.length < 8){
        liste_de = tour_joueur(coup_comp, liste_de)
    }
    return somme(list_de)
}
*/

module.exports = {
    lance_de: lance_de,
    somme: somme,
    tour_comp: tour_comp,
}