class _game {
	constructor(){
		this.fun = new Game(undefined,false);
		this.area = this.fun.areas.gameover;
	}
	pause(){
		this.fun.debug("Oyun Durdu",true);
		this.running = false;
		this.runningWatch = false;
	}
	start(){
		this.fun.debug("Oyun Başladı",true);
		this.running = true;
		this.runningWatch = true;
	}
	end(){
		this.fun.debug("Oyun Bitti");
		this.pause();
		game.ex.timer.pause();
		setTimeout(GameCreate,500);
		//clearTimeout(this.timer);
	}
	win(){
		localStorage.stagenumber = parseInt(localStorage.stagenumber) + 1;

		this.fun.debug("Kazandın!");
		let msg = '<span class="new-game">Kazandın!</span>';
		this.fun.setHtml(this.area,msg);
		this.end();
	}
	lose(){
		this.fun.debug("Kaybettin!");
		let msg = '<span class="new-game">Oops! Tekrar Dene...</span>';
		this.fun.setHtml(this.area,msg);
		this.end();
	}
}
class _extens {
	constructor(){
		this.fun = new Game(undefined,false);
		this.score = new _score();
		this.move = new _move();
		this.timer = new _timer();
	}

	reset(){
		this.score.reset();
		this.move.reset();
	}

	azalt(){

		if(this.move.azalt()){
				this.score.azalt();
		}

	}

	getScore(){
		return this.score.get();
	}

	getMove(){
		return this.move.get();
	}
}
class _score {
	constructor(){
		this.fun = new Game(undefined,false);
		this.setTotalScore();

		this.area = this.fun.areas.score;
	}

	setTotalScore(){
		let blockcount = (this.fun.blockcount / 3) * 5;
		this.katsayi = 35;
		this.total = parseInt(blockcount * this.katsayi);
		this.fun.debug("Maksimum Skor "+this.total,true);
		return this.total;
	}

	reset(){
		this.fun.setText(this.area,this.total);
	}

	azalt(){
		let score = this.fun.getText(this.area);

		if((score - this.katsayi) < 0 ){ score = 0}
		else{score -= this.katsayi}

		this.fun.setText(this.area,score);
	}

	get(){
		this.fun.debug("Skor: "+parseInt(this.fun.getText(this.area)),true);
		return parseInt(this.fun.getText(this.area));
	}
}
class _timer {
	constructor(){
		this.fun = new Game(undefined,false);
		this.remaining = this.fun.times;
		console.log(this.remaining);
		this.callback;
		this.timerId,this.start;
		this.setup();
		//this.times = a;
	}

	pause(){
		window.clearTimeout(this.timerId);

		$(this.fun.areas.time).width($(this.fun.areas.time).width());
		this.animateValue(0);
		this.remaining -= new Date() - this.start;
	};

	resume(){
			this.start = new Date();
			window.clearTimeout(this.timerId);
			this.timerId = window.setTimeout(this.callback,this.remaining*1000);
		};


	start(){
		this.fun.debug("Sayaç Başlıyor",true);

		setTimeout(function() {game.ex.timer.animateValue(game.ex.timer.remaining,0,"#256745")}, 1);
		this.callback = function(){
			game.gm.lose();
		}

		this.resume();
	}

	setup(){
		this.animateValue(0,100,"#239867");
	}

	animateValue(time,w,c) {
		$(this.fun.areas.time).css("transition",time+"s all ease");
		$(this.fun.areas.time).css("background",c);
		$(this.fun.areas.time).css("width",w +"%");
}
}
class _move {
	constructor(){
		this.fun = new Game(undefined,false);
		this.area = this.fun.areas.moves;
		this.maxmove = this.fun.maxmove;
		this.fun.debug("Maksimum Hareket "+this.maxmove,true);
	}
	reset(){
		this.fun.setText(this.area,this.maxmove);
	}
	azalt(){
		let move = parseInt(this.area.innerText);
		if( (move - 1) >= 0 ){
			this.fun.setText(this.area,move - 1);
			return true;
		}
	}
	get(){
		this.fun.debug("Hareket: "+parseInt(this.fun.getText(this.area)),true);
		return parseInt(this.fun.getText(this.area));
	}
}
