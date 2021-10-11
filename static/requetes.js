function getCookie(name){
    cookies = document.cookie
    list = cookies.split(",")
    for (var x of list){
        [n, v] = x.split("=")
        if (n == name){
            return parseInt(v)
        }
    }
    return undefined
}
document.getElementById("garder_de").addEventListener("click", (event) => {
    console.log("on garde le dé")
    data = {
        'id_joueur': getCookie("id_joueur"),
        'de': parseInt(document.getElementById("new").textContent),
    }
    fetch('/api/new_de/', {
                    'method': 'POST',
                    'headers': {
                        'Content-Type': 'application/json'
                    },
                    'body': JSON.stringify(data)
                })
    
    event.preventDefault()
    location.reload()
})

document.getElementById("reinit").addEventListener("click", (event) => {
    console.log("on reinitialise le joueur")
    fetch('/delcookie?id_joueur=' + getCookie("id_joueur"))
    event.preventDefault()
    location.reload()
})


document.getElementById("relancer").addEventListener("click", (event) => {
    console.log("on relance")
    data = {
        'id_joueur': getCookie("id_joueur"),
    }
    fetch('/api/relance', {
                    'method': 'POST',
                    'headers': {
                        'Content-Type': 'application/json'
                    },
                    'body': JSON.stringify(data)
                })
    event.preventDefault()
    location.reload()
})

function load_page(){
    data = {
        'id_joueur': getCookie("id_joueur"),
    }
    // on fetch les infos du joueur actuel
    fetch('/api/affichage', {
                    'method': 'POST',
                    'headers': {
                        'Content-Type': 'application/json'
                    },
                    'body': JSON.stringify(data)
                })
    .then(response => response.json())
    .then((resultat) => {
        console.log(resultat)
        document.getElementById("new").textContent = resultat["de"]
        document.getElementById("coup_comp").textContent = resultat["coup_comp"]
        document.getElementById("score").textContent = resultat["score"]
        list_de = resultat["list_de"]
        enumeration = ["un","deux","trois","quatre","cinq","six","sept","huit"]
        for(var i=0; i < list_de.length;i++){
            document.getElementById(enumeration[i]).textContent = list_de[i]
            if(list_de[i] == 6) {
                document.getElementById(enumeration[i]).style = "color : red;"
            }
        }
        /*
        if (list_de.length == 8){
            fetch("/somme?list_de=" + list_de.join(","))
            .then(response => response.json())
            .then(resultat => document.getElementById("scoreboard").textContent += resultat["somme"])
        }*/
    })
    // on fetch le tableau des scores
    fetch("/api/scores", {
        'method':'POST',
        'headers': {
            'Content-Type': 'application/json'
        },
    }).then((joueur) => joueur.json())
    .then((joueur) =>{
        var indice = 0
        for (var i=0; i< joueur.length; i++){
            if (joueur[i].score != null){
                indice += 1
                document.getElementById("scoreboard").innerHTML += "<p>" + "Joueur " + (indice) + " : " + joueur[i].score + "</p>"
            }
        }
    })
}



load_page();