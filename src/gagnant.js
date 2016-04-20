//ECRAN VICTOIRE

var gagne = (function(){
	var _jeu;
	var gagne = function(jeu){
		_jeu = jeu;
	};

	gagne.prototype = {
		preload: function(){

			_jeu.load.image("ecran_gagne", "assets/gagne.jpg");

		},

		create: function(){

			_jeu.ecranVictoire = _jeu.add.sprite(0, 0, "ecran_gagne");
			_jeu.txtScoreFinal = _jeu.add.text(_jeu.world.centerX, _jeu.world.centerY, "Score Final : 0", _jeu.monStyle);

			//Bouton pour redémarrer le jeu
			_jeu.bouton = _jeu.add.button(_jeu.world.centerX, _jeu.world.centerY + 64, "demarrer", this.demarrerJeu, this);
			_jeu.bouton.anchor.setTo(0.5,0.5);

		},

		update: function(){

			_jeu.txtScoreFinal.setText("Score Final : " + _jeu.score); //affichage du score final

		},

		demarrerJeu : function(){

			console.log("Jouer..."); //Le jeu est démarré
			_jeu.state.start("ChangeNiveau", true, false, 0);
			_jeu.musiqueNiveaux.stop();
		}
	}

	return gagne;

})();

