//CREATION DU MENU

var menu = (function () {
	var _jeu;
	var menu = function (jeu) {
		_jeu = jeu;

	};

	menu.prototype = {

		preload: function (){
			//json maitre niveaux
			_jeu.load.json('jsMaitre', "assets/maitre.json");
		},

		create: function()
		{

			//Bouton pour démarrer le jeu
			_jeu.btnDemarrer = _jeu.add.button(_jeu.world.centerX, _jeu.world.centerY, "demarrer", this.demarrerJeu, this);
			_jeu.btnDemarrer.anchor.setTo(0.5,0.5);

			//Bouton pour instructions
			_jeu.btnInstruct = _jeu.add.button(_jeu.world.centerX, _jeu.world.centerY + 64, "instructions", this.lancerInstructions, this);
			_jeu.btnInstruct.anchor.setTo(0.5,0.5);

			//Bouton pour les options
			_jeu.btnOption = _jeu.add.button(_jeu.world.centerX, _jeu.world.centerY + 128, "options", this.lancerOptions, this);
			_jeu.btnOption.anchor.setTo(0.5,0.5);

			_jeu.monStyle = { font: "20px 'Press Start 2P'", fontWeight: "bold", fill: "#c32929"};


			//demarrage musique

			_jeu.musiqueIntro = _jeu.add.audio('musiqueIntro');
			_jeu.musiqueNiveaux = _jeu.add.audio('musiqueNiveaux');
			_jeu.musiqueIntro.volume = 0.5;
			_jeu.musiqueNiveaux.volume = 0.5;

			_jeu.musiqueIntro.play();
			_jeu.musiqueIntro.loop = true;

			_jeu.instructionsOK = false;
			_jeu.optionsOK = false;

			//fullscreen en respectant le ratio
			_jeu.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
			_jeu.input.onDown.add(this.pleinEcran, this);


		},

		demarrerJeu : function(){
			_jeu.jsMaitre = _jeu.cache.getJSON('jsMaitre');
			//console.log(_jeu.jsMaitre);
			console.log("Jouer..."); //Le jeu est démarré
			_jeu.state.start("ChangeNiveau", true, false, 0);
			_jeu.musiqueIntro.stop();
		},

		lancerInstructions : function(){
			if(_jeu.instructionsOK == false) {
				_jeu.bloc_instruct = _jeu.add.sprite(64*0.5, 64, "bloc_instructions");
				//Bouton pour fermer les instructions
				_jeu.btnFermer = _jeu.add.button(64*7, 64*1.5, "fermer", this.fermerInstructions, this);
				_jeu.btnFermer.anchor.setTo(0.5,0.5);
				_jeu.btnFermer.scale.setTo(0.75,0.75);

				_jeu.instructionsOK = true;
			}
		},

		pleinEcran: function () {
			_jeu.scale.startFullScreen(true);
		},

		lancerOptions : function(){
			if(_jeu.optionsOK == false) {
				_jeu.bloc_options = _jeu.add.sprite(64*12, 64, "bloc_options");
				//Bouton pour fermer les instructions
				_jeu.btnFermer = _jeu.add.button(64*18.5, 64*1.5, "fermer", this.fermerOptions, this);
				_jeu.btnFermer.anchor.setTo(0.5,0.5);
				_jeu.btnFermer.scale.setTo(0.75,0.75);

				_jeu.btnMoins = _jeu.add.button(64*14, 64*8, "moins", this.baisserVolume, this);
				_jeu.btnMoins.anchor.setTo(0.5,0.5);

				_jeu.btnPlus = _jeu.add.button(64*17.5, 64*8, "plus", this.augmenterVolume, this);
				_jeu.btnPlus.anchor.setTo(0.5,0.5);

				_jeu.btnSourdine = _jeu.add.button(64*15.75, 64*5.5, "sourdine", this.muteVolume, this);
				_jeu.btnSourdine.anchor.setTo(0.5,0.5);
				_jeu.btnSourdine.scale.setTo(2,2);

				_jeu.txtVolume = _jeu.add.text(64*15.75, 64*8, "5", _jeu.monStyle);
				_jeu.txtVolume.anchor.setTo(0.5,0.5);
				_jeu.optionsOK = true;
			}
		},

		fermerInstructions : function () {
			_jeu.bloc_instruct.destroy();
			_jeu.btnFermer.destroy();
			_jeu.instructionsOK = false;
		},

		fermerOptions : function () {
			_jeu.bloc_options.destroy();
			_jeu.btnFermer.destroy();
			_jeu.btnPlus.destroy();
			_jeu.btnMoins.destroy();
			_jeu.btnSourdine.destroy();
			_jeu.txtVolume.destroy();
			_jeu.optionsOK = false;
		},

		baisserVolume : function () {
			if (_jeu.musiqueIntro.volume > 0){
				_jeu.musiqueIntro.volume-=0.10;
				_jeu.musiqueNiveaux.volume-=0.10;
				_jeu.txtVolume.setText(Math.floor(_jeu.musiqueIntro.volume * 10));
			}
		},

		augmenterVolume : function () {
			if (_jeu.musiqueIntro.volume < 1){
				_jeu.musiqueIntro.volume+=0.10;
				_jeu.musiqueNiveaux.volume+=0.10;
				_jeu.txtVolume.setText(Math.floor(_jeu.musiqueIntro.volume * 10));
			}
		},

		muteVolume : function () {
			if (_jeu.musiqueIntro.isPlaying)
			{
				_jeu.musiqueIntro.pause();
				_jeu.muteMusique = true;
			}
			else
			{
				_jeu.musiqueIntro.resume();
				_jeu.muteMusique = false;
			}
		}

	};
	return menu;

})();
