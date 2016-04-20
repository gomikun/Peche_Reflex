/*MAIN : JEU */

var jouer = (function () {

	var jouer = function (jeu) {
		_jeu = jeu;
	};
	jouer.prototype = {
		/* INIT */
		init : function(niveau){
			this.niveauActuel = niveau || 0;
		},
		/* PRELOAD */

		preload : function(){

		},

		/* CREATE */

		create: function () { // À la creation du jeu

			_jeu.niveauActif = 0;

			/*COMPOSANTS JEU*/

			_jeu.gravite = _jeu.infoNiveau.gravite;
			_jeu.score = 0;
			_jeu.scoreAtteindre = _jeu.infoNiveau.score;
			_jeu.tmpsEau = _jeu.infoNiveau.tmpsEau; //temps de descente de l'eau en secondes
			_jeu.poissonOK = true; //poisson pret a etre attrapés
			//_jeu.poissonLance = true; //lancement de poisson possible au demarrage

			_jeu.scale.startFullScreen(true);

			//TIMER
			//source : http://phaser.io/examples/v2/time/custom-timer
			_jeu.timer = _jeu.time.create(false);
			_jeu.timer.loop(Phaser.Timer.SECOND * _jeu.tmpsEau, this.descendreEau, this);
			_jeu.timer.start();

			/*FX*/
			_jeu.plop = _jeu.add.audio('plop');

			_jeu.plop.volume = 1;

			/*MUSIQUE */

			_jeu.musiqueNiveaux.play();
			_jeu.musiqueNiveaux.loop = true;

			if(_jeu.muteMusique == true){
				_jeu.musiqueNiveaux.pause();
				_jeu.plop.volume = 0;
			}

			/* SYSTEME PHYSIQUE */
			_jeu.physics.startSystem(Phaser.Physics.ARCADE);
			Phaser.Physics.enableBody = true;

			//Modification pour les problèmes de collisions
			//source : http://www.html5gamedevs.com/topic/4929-20-arcaded-tile-collision-issue/
			_jeu.physics.arcade.TILE_BIAS = 200;

			//gravité
			_jeu.physics.arcade.gravity.y = _jeu.gravite;

			//creation niveau
			_jeu.niveau = _jeu.add.tilemap('niveau');
			_jeu.niveau.addTilesetImage('tuiles');
			_jeu.couche = _jeu.niveau.createLayer('niveau');
			_jeu.niveau.setCollisionBetween(13, 31, true, _jeu.couche);

			//debug
			//_jeu.couche.debug = true;

			/*CURSEUR */
			_jeu.fleche = _jeu.add.sprite(64*5, 0, 'fleche');
			_jeu.fleche.anchor.setTo(0,0);
			_jeu.fleche.scale.setTo(2,2);

			/*EAU*/
			_jeu.eauG = _jeu.add.sprite(0,64, 'eauG');
			_jeu.physics.enable(_jeu.eauG);
			_jeu.eauG.body.allowGravity = false;

			_jeu.eauD = _jeu.add.sprite(64*11,64*5, 'eauD');

			/*PECHEUR*/
			_jeu.pecheur = _jeu.add.sprite(64*12,64*3, 'pecheur');

			//RESERVE POISSONS

			//groupe physique poisson
			_jeu.pgPoisson = _jeu.add.physicsGroup(Phaser.Physics.ARCADE);

			//instantiation 60 poissons aléatoires
			for(i=0; i<60; i++) {

				//couleur aléatoire
				hasard = Math.floor(Math.random() * 3) + 1;
				switch(hasard){
					case 1:
						var couleur = "pRouge";
						break;
					case 2:
						var couleur = "pJaune";
						break;
					case 3:
						var couleur = "pVert";
						break;
				}

				var poisson = new Poisson(_jeu, 0, 0, couleur);

				_jeu.pgPoisson.add(poisson);

				poisson.kill();
			}

			/*POISSONS DECOR */
			_jeu.poissonDecorV = new Poisson (_jeu, 64*13 , 64*7, 'pVert');
			_jeu.poissonDecorR = new Poisson (_jeu, 64*15 , 64*8, 'pRouge');
			_jeu.poissonDecorJ = new Poisson (_jeu, 64*17 , 64*9, 'pJaune');

			//retire la gravité
			_jeu.poissonDecorV.body.allowGravity = false;
			_jeu.poissonDecorR.body.allowGravity = false;
			_jeu.poissonDecorJ.body.allowGravity = false;

			// deplacement
			_jeu.poissonDecorV.body.velocity.x = -50;
			_jeu.poissonDecorR.body.velocity.x = 40;
			_jeu.poissonDecorJ.body.velocity.x = -30;

			_jeu.poissonDecorV.body.collideWorldBounds = true;
			_jeu.poissonDecorR.body.collideWorldBounds = true;
			_jeu.poissonDecorJ.body.collideWorldBounds = true;

			/*PLACEMENT POISSONS DEPART*/
			//console.log(_jeu.infoNiveau.rangee);
			//rangées des poissons
			var tabPoisson = 0;
			for(var j = 1 ; j <= _jeu.infoNiveau.rangee ; j++) {
				for(var i = 0 ; i <= 10 ; i++) {
					_jeu.pgPoisson.add(new Poisson (_jeu, 64*i , 64*j, _jeu.infoNiveau.poissons[tabPoisson].couleur));
					tabPoisson++;
					if(tabPoisson >= 5){
						tabPoisson = 0;
					}
				}
			}


			_jeu.pgPoisson.setAll("scale", new Phaser.Point(2, 2));
			//_jeu.pgPoisson.setAll("mass", 0.1);


			//sprites au dessus
			_jeu.world.bringToTop(_jeu.pgPoisson);
			_jeu.world.bringToTop(_jeu.fleche);

			//affichage texte scores


			_jeu.txtScore = _jeu.add.text(64*9, 64*10.5, "Score : 0", _jeu.monStyle);

			//affichage score à atteindre
			_jeu.txtScoreAtteindre = _jeu.add.text(64*12, 64*1, "Score à atteindre : 0", _jeu.monStyle);

			/* UI MOBILE */
			if(!_jeu.device.desktop){
				_jeu.btnHaut = _jeu.add.button(64*17, 64*10, "btn_haut", this.btnHaut, this);
				_jeu.btnHaut.scale.setTo(1.25);
				_jeu.btnBas = _jeu.add.button(64*15, 64*10, "btn_bas", this.btnBas, this);
				_jeu.btnBas.scale.setTo(1.25);
				_jeu.btnGauche = _jeu.add.button(64*2, 64*10, "btn_gauche", this.btnGauche, this);
				_jeu.btnGauche.scale.setTo(1.25);
				_jeu.btnDroite = _jeu.add.button(64*4, 64*10, "btn_droite", this.btnDroite, this);
				_jeu.btnDroite.scale.setTo(1.25);
			}

			/* DEFINITION CONTROLES */

			_jeu.controles = _jeu.input.keyboard.createCursorKeys();
			_jeu.wasd = {
				up: _jeu.input.keyboard.addKey(Phaser.Keyboard.W),
				down: _jeu.input.keyboard.addKey(Phaser.Keyboard.S),
				left: _jeu.input.keyboard.addKey(Phaser.Keyboard.A),
				right: _jeu.input.keyboard.addKey(Phaser.Keyboard.D),
			};
		},


		/* UPDATE */

		update: function () { // Sur chaque frame

			/*HACK POUR EVITER QUE LES POISSONS SE SUPERPOSENT */
			//source : http://www.html5gamedevs.com/topic/7810-how-to-increase-rigidity-of-arcade-sprite-bodies/#entry46648

			/*_jeu.physics.arcade.collide(_jeu.pgPoisson, _jeu.pgPoisson, function(poisson) {
				// si le poisson n'a pas bougé à la dernière frame
				// il ne bougera plus
				if (poisson.body.deltaAbsY() < 1) {
					poisson.body.moves = false;
				}
			});*/

			/* GESTION COLLISION */

			_jeu.physics.arcade.collide(_jeu.pgPoisson, _jeu.couche); //poisson avec le décor
			_jeu.physics.arcade.collide(_jeu.fleche, _jeu.couche, this.collisionFleche); //fleche avec le décor
			_jeu.physics.arcade.collide(_jeu.pgPoisson, _jeu.pgPoisson); //avec les autres poissons
			_jeu.physics.arcade.collide(_jeu.poissonAttrape, _jeu.pgPoisson, this.collisionPoisson); // meme couleur ?
			//_jeu.physics.arcade.collide(_jeu.poissonAttrape, _jeu.poissonAttrape, this.collisionPoisson); // meme couleur ?
			//collisions poissons decor
			_jeu.physics.arcade.collide(_jeu.poissonDecorV, _jeu.couche); //poisson avec le décor
			_jeu.physics.arcade.collide(_jeu.poissonDecorR, _jeu.couche);
			_jeu.physics.arcade.collide(_jeu.poissonDecorJ, _jeu.couche);

			//mouvement gauche-droite des poissons décor WIP
			if (_jeu.poissonDecorV.body.blocked.left || _jeu.poissonDecorV.body.blocked.right){
				_jeu.poissonDecorV.body.velocity.x = -_jeu.poissonDecorV.body.velocity.x;
			}
			if (_jeu.poissonDecorJ.body.blocked.left || _jeu.poissonDecorJ.body.blocked.right){
				_jeu.poissonDecorJ.body.velocity.x = -_jeu.poissonDecorJ.body.velocity.x;
			}
			if (_jeu.poissonDecorR.body.blocked.left || _jeu.poissonDecorR.body.blocked.right){
				_jeu.poissonDecorR.body.velocity.x = -_jeu.poissonDecorR.body.velocity.x;
			}


			/*SCORE*/
			_jeu.txtScore.setText("Score : " + _jeu.score); //affichage du score
			_jeu.txtScoreAtteindre.setText("Score à atteindre : " + _jeu.scoreAtteindre); //affichage du score à atteindre

			if(_jeu.score == _jeu.infoNiveau.score){
				this.niveauActuel++;
				_jeu.musiqueNiveaux.stop();
				_jeu.state.start("ChangeNiveau", true, false, this.niveauActuel);
			}

			/* CONTROLES */

			if (_jeu.controles.left.isDown || _jeu.wasd.left.isDown || _jeu.gauche==true) { //gauche

				this.bougeFleche(-1);
				_jeu.gauche=false;
			}

			if (_jeu.controles.right.isDown || _jeu.wasd.right.isDown || _jeu.droite==true) { //droite

				this.bougeFleche(1);
				_jeu.droite=false;
			}

			if (_jeu.controles.up.isDown || _jeu.wasd.up.isDown || _jeu.haut==true) { //haut - on pêche

				if(_jeu.poissonOK) { //si on peut pecher à nouveau

					//recup dernier poisson

					_jeu.poissonAttrape = _jeu.pgPoisson.getFirstDead();
					//console.log(_jeu.poissonAttrape);

					//affichage du poisson attrapé
					_jeu.bulle = _jeu.add.sprite(64*13, 64*1.5, 'bulle');
					_jeu.poissonBulle = _jeu.add.sprite(64*13.5, 64*2, _jeu.poissonAttrape.couleur);
					_jeu.ligne = _jeu.add.sprite(0, 0, 'ligne');

					_jeu.poissonBulle.scale.x = 2;
					_jeu.poissonBulle.scale.y = 2;
					_jeu.poissonOK = false;
					_jeu.poissonLance = true;

					_jeu.haut=false;
					//console.log("poisson attrapé");
				}
			}

			if (_jeu.controles.down.isDown || _jeu.wasd.down.isDown || _jeu.bas==true) { //bas - on jette le poisson

				_jeu.poissonOK = true; //poisson attrapé

				if(_jeu.poissonLance && _jeu.fleche.enMouvement == false){ // poisson pret à etre lancé et fleche qui ne bouge pas

					_jeu.poissonBulle.destroy(); //retire la bulle
					_jeu.bulle.destroy();
					_jeu.ligne.destroy();

					//_jeu.poissonAttrape.tomberPoisson(_jeu.fleche);
					_jeu.fleche.enMouvement = false;

					_jeu.poissonAttrape.revive();
					_jeu.poissonAttrape.x = _jeu.fleche.x;
					_jeu.poissonAttrape.y = _jeu.fleche.y;
					_jeu.world.bringToTop(_jeu.poissonAttrape);

					//console.log("chute de poisson");

					_jeu.poissonLance = false;

					_jeu.bas=false;
				}

				if (_jeu.poissonLance == false) {
					//console.log("poisson non attrapé !")
					_jeu.bulle = _jeu.add.sprite(64*13,64*1.5, 'bulle');
					_jeu.nonPoisson = _jeu.add.sprite(64*13.5,64*2, "croix");
				}
			}

			/*EMPECHE LA FLECHE DE SORTIR DU FILET */
			if(_jeu.fleche.x > 64*10.5){
				console.log("fleche en dehors");
				_jeu.add.tween(_jeu.fleche).to({x: 64*10}, 1, Phaser.Easing.Quadratic.InOut, true).onComplete.add(function() { _jeu.fleche.enMouvement = false;}, this);
			}

			if(_jeu.fleche.x < -32){
				console.log("fleche en dehors");
				_jeu.add.tween(_jeu.fleche).to({x: 0}, 1, Phaser.Easing.Quadratic.InOut, true).onComplete.add(function() { _jeu.fleche.enMouvement = false;}, this);
			}

		},

		/* RENDER */
		render: function render() {
			//debug timer
			//_jeu.debug.text('Temps avant descente eau: ' + _jeu.timer.duration.toFixed(0), 64*12, 32);
			//debug body
			//_jeu.debug.bodyInfo(_jeu.fleche, 0, 32);4
			//_jeu.debug.text(_jeu.time.fps || '--', 2, 14, "#a7aebe");
		},

		/*FONCTIONS PERSO*/

		/*FCT deplacement fleche par tile - WIP: passe au travers du décor*/
		//source: http://www.html5gamedevs.com/topic/7361-tile-based-movement/
		bougeFleche: function (x) {
			if (_jeu.fleche.enMouvement) { return; } //empeche le joueur de changer la direction lorsque la fleche est en mouvement
			_jeu.fleche.enMouvement = true;

			// Tween la fleche

			_jeu.add.tween(_jeu.fleche).to({x: _jeu.fleche.x + x * 64}, 250, Phaser.Easing.Quadratic.InOut, true).onComplete.add(function() { _jeu.fleche.enMouvement = false;}, this);

		},

		/*FCT descente de l'eau */
		descendreEau: function () {

			if(_jeu.eauG.y == 64 * 10) {
				_jeu.eauG.y = 64 * 10;
				//gameover
				//console.log("GAME OVER");
				_jeu.state.start("Perdant", false);
			} else {
				_jeu.add.tween(_jeu.eauG).to({y: _jeu.eauG.y + 64}, 1000, Phaser.Easing.Quadratic.InOut, true);
				this.verifEau(_jeu.eauG.y);
			}

		},

		/*FCT verification du niveau de l'eau par rapport aux poissons à chaque descente*/
		verifEau: function (eau) {
			//console.log("verifEau");

			for (var i = 0; i <= _jeu.pgPoisson.length-1; i++) {
				if (_jeu.pgPoisson.children[i].alive && _jeu.pgPoisson.children[i].body.touching.down){
					_jeu.hauteurPoissonMax = _jeu.pgPoisson.children[i].y;
					//console.log("hauteurPoissonMax:" + _jeu.hauteurPoissonMax);

					if(eau > _jeu.hauteurPoissonMax) { //si l'eau est en dessous d'un poisson
						//gameover - charger state
						//console.log("GAME OVER");
						_jeu.state.start("Perdant", false);
					}
				}

			}
		},

		/*FCT collision Poisson /!\ soucis de collisions aléatoires ?*/
		collisionPoisson: function (p1, p2) {
			if(_jeu.poissonLance == false) {
				if(p1.couleur == p2.couleur){

					/*PARTICULES*/
					emissionParticule(p1, p2);

					//on detruit les 2 poissons
					p1.kill();
					p2.kill();

					_jeu.plop.play(); //FX explosion
					_jeu.plop.loop = false;
					_jeu.score+=100;
					//console.log("score augmenté de 100");

					function emissionParticule(p1, p2) {

						//définit la couleur de la particule
						switch(p1.couleur){
							case 'pJaune':
							var couleur = 'partVert';
							break;

							case 'pVert':
							var couleur = 'partJaune';
							break;

							case 'pRouge':
							var couleur = 'partRouge';
							break;
						}

						//propriétés emetteur particules 1
						_jeu.emetteur1 = _jeu.add.emitter(p1.x+32, p1.y+32, 50);

						_jeu.emetteur1.width = p1.width;
						_jeu.emetteur1.height = p1.height;

						_jeu.emetteur1.makeParticles(couleur);

						_jeu.emetteur1.setRotation(-100, 100);
						_jeu.emetteur1.setXSpeed(0,0);
						_jeu.emetteur1.setYSpeed(0,0);
						_jeu.emetteur1.minParticleScale = 1;
						_jeu.emetteur1.maxParticleScale = 5;
						_jeu.emetteur1.gravity = 0;

						_jeu.world.bringToTop(_jeu.emetteur1);

						//demarrage emetteur 1
						_jeu.emetteur1.start(false, 500, 1, 1000);

						var t = _jeu.add.tween(_jeu.emetteur1).to({x: p1.x+32 ,y: p1.y+32}, 1000, Phaser.Easing.Bounce.Out, true);

						//destruction de l'emetteur 1
						t.onComplete.add(function() { _jeu.emetteur1.destroy();}, this);

						//propriétés emetteur particules 2
						_jeu.emetteur2 = _jeu.add.emitter(p2.x+32, p2.y+32, 50);

						_jeu.emetteur2.width = p2.width;
						_jeu.emetteur2.height = p2.height;

						_jeu.emetteur2.makeParticles(couleur);

						_jeu.emetteur2.setRotation(-100, 100);
						_jeu.emetteur2.setXSpeed(0,0);
						_jeu.emetteur2.setYSpeed(0,0);
						_jeu.emetteur2.minParticleScale = 1;
						_jeu.emetteur2.maxParticleScale = 5;
						_jeu.emetteur2.gravity = 0;

						_jeu.world.bringToTop(_jeu.emetteur2);

						//demarrage emetteur 2
						_jeu.emetteur2.start(false, 500, 1, 1000);

						var t = _jeu.add.tween(_jeu.emetteur2).to({x: p2.x+32 ,y: p2.y+32}, 1000, Phaser.Easing.Bounce.Out, true);

						//destruction de l'emetteur 2
						t.onComplete.add(function() { _jeu.emetteur2.destroy();}, this);

					}
				}
			}

		},

		/*FCT bouton mouvements mobile */
		btnHaut: function () {
			_jeu.haut = true;
		},

		btnBas: function () {
			_jeu.bas = true;
		},

		btnGauche: function () {
			_jeu.gauche = true;
		},

		btnDroite: function () {
			_jeu.droite = true;
		}

	};
	return jouer;

})();
