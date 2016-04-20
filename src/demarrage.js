//DEMARRAGE DU JEU

var demarrage = (function(){
	var _jeu;
	var demarrage = function(jeu){
		console.log("%cDémarrage de mon jeu", "color:white; background:red");
		_jeu = jeu;
	};

	demarrage.prototype = {

		preload: function(){

			_jeu.load.image("barre_chargement", "assets/chargement.png");
			_jeu.load.image("ecran_demarrage", "assets/demarrage.jpg");

		},

		create: function(){
			_jeu.ecran_demarrage = _jeu.add.sprite(0, 0, "ecran_demarrage");
			_jeu.state.start("Chargement", false);

		}
	}
	return demarrage;

})();
