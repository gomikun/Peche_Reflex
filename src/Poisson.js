var Poisson = (function () {
	var Poisson = function (jeu, x, y, frame) {

		Phaser.Sprite.call(this, jeu, x, y, frame);
		_jeu = jeu;
		//console.log(frame);

		//caractéristiques du poisson
		this.anchor.setTo(0,0);
		_jeu.physics.enable(this);
		this.body.allowGravity = true;
		this.scale.setTo(2,2);
		this.couleur = frame;

		this.animations.add('pVert', [0,1], 1, true);
		this.animations.add('pRouge', [1,0], 1, true);
		this.animations.add('pJaune', [0,1], 1, true);

		_jeu.add.existing(this);
		_jeu.world.bringToTop(this);

	}

	Poisson.prototype = Object.create(Phaser.Sprite.prototype);
	Poisson.prototype.constructor = Poisson;

	Poisson.prototype.update = function (){
		if(this.couleur == "pVert") {
			this.animations.play('pVert');
		}

		if(this.couleur == "pRouge") {
			this.animations.play('pRouge');
		}

		if(this.couleur == "pJaune") {
			this.animations.play('pJaune');
		}

	};



	return Poisson;

})();
