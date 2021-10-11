# TODO LIST

[X] - gérer qui joue avec un cookie d'authentification en gros qu'on stoque avec le jeu dans la db c'est même la clé primaire, donc si le cookie n'existe pas on créer l'entrée dans la db et on créer le cookie. A la fin du jeu on supprime ce cookie -> créer les entrées et les cookie
[ ] - quand on est sur la page, la db a stoqué les données
[ ] - si on relance on fait juste une requete qui renvoie un nouveau dé.
    [X] - un simple fetch
    [X] - mais on réduit le nombre de coup_comp  
    [ ] - et si 0 on redirige
[ ] - si on garde le dé on fait une requete post pour stoquer le dé et on recharge la page. -> /api/new_de/ #id_cookie_joueur
[ ] - En back si il n'y a plus de coup_comp on fait les derniers dés. -> à la fin du /api/new_de/ on recalcul
[ ] - Si il y a 8 de dans /api/new_de/ on calcul le score et on l'entre dans le "JEU" et on supprime le cookie_joueur
[ ] - En front à chaque fois qu'on charge la page on charge le scoreboard. -> route /api/scoreboard/ #id_cookie_jeu [après]
[ ] - changer de partie en supprimant le cookie de jeu [après]

[ ] - afficher les 6 en rouge aussi

[ ] - Joueur (int id, int coup_comp, int array des)
[ ] - Jeu (int id, json (id_joueur,scores))[après]