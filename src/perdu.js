//ECRAN DEFAITE

var perdu = (function(){
	var _jeu;
	var perdu = function(jeu){
		_jeu = jeu;
	};

	perdu.prototype = {
		preload: function(){

			_jeu.load.image("ecran_perdu", "assets/perdu.jpg");

		},

		create: function(){
			_jeu.ecranDefaite = _jeu.add.sprite(0,0, "ecran_perdu");
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
	return perdu;

})();

