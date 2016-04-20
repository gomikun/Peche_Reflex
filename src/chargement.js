//CHARGEMENT ASSETS

var chargement = (function () {
	var _jeu;
	var chargement = function (jeu) {
		_jeu = jeu;
	}

	chargement.prototype = {
		preload: function () {

			//barre de chargement
			_jeu.barreChargement = _jeu.add.sprite(64*7, _jeu.world.centerY, "barre_chargement");
			_jeu.barreChargement.anchor.setTo(0, 0.5);
			_jeu.load.setPreloadSprite(_jeu.barreChargement);


			//CHARGEMENT DES SPRITES

			//chargement poissons
			//_jeu.load.image('pRouge', 'assets/pRouge_anim.png');
			//_jeu.load.image('pJaune', 'assets/pJaune_anim.png');
			//_jeu.load.image('pRouge', 'assets/pVert_anim.png');
			_jeu.load.image('fleche', 'assets/fleche.png');
			_jeu.load.image('eauG', 'assets/eau.png');
			_jeu.load.image('eauD', 'assets/eau.png');
			_jeu.load.image('bulle', 'assets/bulle.png');
			_jeu.load.image('pecheur', 'assets/pecheur.png');
			_jeu.load.image('croix', 'assets/croix.png');
			_jeu.load.image('demarrer', 'assets/btn_demarrer.png');
			_jeu.load.image('instructions', 'assets/btn_instructions.png');
			_jeu.load.image('options', 'assets/btn_options.png');
			_jeu.load.image('bloc_instructions', 'assets/instructions.png');
			_jeu.load.image('bloc_options', 'assets/options.png');
			_jeu.load.image('ligne', 'assets/ligne.png');
			_jeu.load.image('fermer', 'assets/btn_fermer.png');
			_jeu.load.image('plus', 'assets/btn_plus.png');
			_jeu.load.image('moins', 'assets/btn_moins.png');
			_jeu.load.image('sourdine', 'assets/sourdine.png');

			_jeu.load.image('partVert', 'assets/partVert.png');
			_jeu.load.image('partJaune', 'assets/partJaune.png');
			_jeu.load.image('partRouge', 'assets/partRouge.png');

			_jeu.load.image('btn_haut', 'assets/btn_haut.png');
			_jeu.load.image('btn_bas', 'assets/btn_bas.png');
			_jeu.load.image('btn_gauche', 'assets/btn_gauche.png');
			_jeu.load.image('btn_droite', 'assets/btn_droite.png');

			_jeu.load.spritesheet('pRouge', 'assets/pRouge_anim.png', 32, 32);
			_jeu.load.spritesheet('pJaune', 'assets/pVert_anim.png', 32, 32);
			_jeu.load.spritesheet('pVert', 'assets/pJaune_anim.png', 32, 32);


			//CHARGEMENT NIVEAU

			_jeu.load.tilemap('niveau', 'assets/decor.json', null, Phaser.Tilemap.TILED_JSON);
			_jeu.load.image('tuiles', 'assets/tileset.jpg');
			//_jeu.stage.backgroundColor = '#000000';


			//CHARGEMENT SONS
			// source : https://www.jamendo.com/en/list/a7686/very-best-of-med-s-chiptune-1999-2003
			//intro
			_jeu.load.audio ('musiqueIntro', 'assets/sons/Mister_Electric_Demon_-_MKD1-46ko.mp3');
			//niveaux
			_jeu.load.audio ('musiqueNiveaux', 'assets/sons/Mister_Electric_Demon_-_GUIMOVE-11ko.mp3');
			//FX
			// source : http://lasonotheque.org/detail-0648-bouchon-de-champagne-2.html
			_jeu.load.audio ('plop', 'assets/sons/plop.mp3');
		},



		//CREATE

		create: function () {

			//demarrage menu
			_jeu.state.start("Menu", false);
			_jeu.barreChargement.destroy();
		}

	}

	return chargement;
})();

