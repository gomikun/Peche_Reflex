/* Source :
http://www.emanueleferonato.com/2014/08/28/phaser-tutorial-understanding-phaser-states/
*/

//GESTION STATES

(function () { // IIFE
	"use strict";
	var jeu = new Phaser.Game(1280, 720, Phaser.AUTO, 'jeu');

	jeu.state.add("Demarrage", demarrage); // Boot

	jeu.state.add("Chargement", chargement); // Loading
	jeu.state.add("Menu", menu); // Menu de démarrage

	jeu.state.add("Jouer", jouer); // Le jeu
	jeu.state.add("Perdant", perdu); // la fin
	jeu.state.add("Gagnant", gagne); // la victoire

	jeu.state.add("ChangeNiveau", changeniveau); // Change les niveaux

	jeu.state.start("Demarrage");

})();
