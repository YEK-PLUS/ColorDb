class Game {

	constructor(level = localStorage.stagenumber,debug = true){
		this.debugs = debug;
		this.level = level;
		this.issetup = false;
		this.loadConfing();
	}

	setup(){
		if(!this.issetup){


			this.gm = new _game();
			this.gm.start();

			this.ex = new _extens();
			this.ex.reset();

			//setText(this.areas.);

			this.issetup = true;
		}
		else{
			this.debug("Oyun Zaten Kurulu");
		}

	}

	build(){
		function shuffle(collection){
			for (let i = collection.length; i; i--) {
				let j = Math.floor(Math.random() * i);
				[collection[i - 1], collection[j]] = [collection[j], collection[i - 1]]
			}
			return collection
		}

		function setColors(collection, n){

			return n < 10 ? shuffle(collection).slice(0, n) : collection
		}

		if(this.issetup && !this.isbuild){
			this.debug("Oyun İnşa Ediliyor");

			let options = setColors(this.colorArray.slice(), this.colorcount);

			this.builder(this.areas.colors, 'chip', options);
			this.builder(this.areas.board, 'tile', options, this.blockcount, true);

			this.color = this.areas.board.childNodes[0].className
			this.changeBorder(this.color);
			this.areas.board.childNodes[0].className = this.color + this.cell

			this.areas.board.setAttribute("data","");
			this.setHtml(this.areas.gameover,"");

			this.setBlocks();
			this.setLevel();

			this.checkColor(this.color);
			this.checkWin(this.ex.getMove());

			this.isbuild= true;
		}
		else if (this.issetup && this.isbuild) {
			this.debug("Oyun İnşa Edilmiş");
		}
		else{
			this.debug("Oyun Kurulmamış, Kuruluyor");
			this.setup();
			this.build();
		}


	}

	checkWin(moves){
		this.debug("Zafer Kontrolu");

		let n = 0
		let BlockCount = this.blockcount;

		moves = this.maxmove - moves;

		let cell = this.cell

		let msg = ''

		if (true) {
			if (this.areas.board.childNodes[BlockCount - 1].className.indexOf(cell) > -1) {
				for (var i = 0; i < BlockCount; i++) {
					if (this.areas.board.childNodes[i].className.indexOf(cell) > -1) {
						n++
				}
				}
			}

			if (n === BlockCount) {

				this.gm.win();

			}
			else if (n < BlockCount && moves >= this.maxmove) {

				this.gm.lose();
			}
		}
	}

	checkColor(color){
		this.debug("Renk Kontrolu");
		let BlockCount = this.blockcount;
		let cell = this.cell;
		let tiles = this.areas.board.childNodes
		for (var x = 0; x < BlockCount; x++) {
			if (tiles[x].className.indexOf(cell) > -1) {
				tiles[x].className = color + cell
				if (x + 1 < BlockCount && tiles[x + 1].className === color) {
					tiles[x + 1].className += cell
				}
				if (x + Math.sqrt(BlockCount) < BlockCount && tiles[x + Math.sqrt(BlockCount)].className === color) {
					tiles[x + Math.sqrt(BlockCount)].className += cell
				}
				if (x - 1 >= 0 && x % Math.sqrt(BlockCount) > 0 && tiles[x - 1].className === color) {
					tiles[x - 1].className += cell
				}
				if (x - Math.sqrt(BlockCount) >= 0 && x % Math.sqrt(BlockCount) > 0 && tiles[x - Math.sqrt(BlockCount)].className === color) {
				tiles[x - Math.sqrt(BlockCount)].className += cell
				}
			}
		}
	}

	setLevel(){
		return this.setText(this.areas.level,this.level);
	}

	builder(container, element, collection, count, randomize){
		container.innerHTML = ''
		count = count || collection.length
		randomize = randomize || false
		for (let i = 0; i < count; i++) {
			let child = document.createElement(element)
			child.className = randomize ? collection[Math.floor((Math.random() * collection.length))] : collection[i]
			container.appendChild(child)
		}
	}

	setBlocks(){
		this.debug("Bloklar Yenileniyor");
		let blockcount = this.blockcount;
		let a = Math.sqrt(blockcount);
		$(this.areas.board.childNodes).css("height", "calc(100% / " + a + ")");
		$(this.areas.board.childNodes).css("width", "calc(100% / " + a + ")");
	}

	Play(chip){
		if (this.gm.running && this.color !== chip) {
			this.color = chip;
			if (this.areas.board.getAttribute("data") !== 'started') {
				this.ex.timer.start();
				this.areas.board.setAttribute("data","started")
			}
			this.changeBorder(chip);
			this.ex.azalt();
			this.checkColor(chip)
			this.checkWin(this.ex.getMove())
		}
	}

	changeBorder(chip){
		this.areas.board.className = chip+"-b";
	}


	getText(area){
		return area.innerText;
	}

	setHtml(area,text){
		return area.innerHTML = text;
	}

	setText(area,text){
		return area.innerText = text;
	}

	loadLevelData(type = "local"){
		let localData = (JSON.parse( localStorage.levelData )[this.level]);
		let _default = [ 10, 100, 35 ,6 ,55];
		return ((localData != undefined)?localData:_default);
	}

	loadConfing(){

		this.debug("Konfigurasyon Yükleniyor");

		let data = this.loadLevelData();
		this.blockcount = data[1];
		this.maxmove = data[2];
		this.colorcount = data[3];
		this.times = data[4];

		this.areas = {};
		this.areas.time = document.querySelector('#stopwatch');
		this.areas.score = document.querySelector('#score>.score');
		this.areas.moves = document.querySelector('#moves>span');
		this.areas.level = document.querySelector('#level>.level');

		this.areas.board = document.querySelector('#board');
		this.areas.colors = document.querySelector('#colors');
		this.areas.gameover = document.querySelector('#game-over');

		this.colorArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
		this.color;
		this.cell = '-x';
	}

	debug(text,debug_ = this.debugs){
		if(debug_){debug(text,"Oyun")};
	}
}
