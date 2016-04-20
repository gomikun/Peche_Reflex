var changeniveau = (function(){
	"use strict";
	var changeniveau = function(jeu){
		_jeu = jeu;
	}

	changeniveau.prototype = {
		init: function(niveau){
			this.niveau = niveau;
			//console.log(niveau);
		},

		preload : function(){
			if(this.niveau < _jeu.jsMaitre.niveaux.length)
			{
				_jeu.load.json('niveauActuel', _jeu.jsMaitre.niveaux[this.niveau].fichier);
			}

		},

		create: function(){
			if(this.niveau < _jeu.jsMaitre.niveaux.length)
			{
				_jeu.infoNiveau = _jeu.cache.getJSON("niveauActuel");
				//console.log(_jeu.infoNiveau);
				_jeu.state.start("Jouer", true, false, this.niveau);
			}
			else
			{
				_jeu.state.start("Gagnant", true, false);
			}




		}

	}
	return changeniveau;
})();
