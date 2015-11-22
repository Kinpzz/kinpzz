window.onload = function() {
	var reStart = document.getElementById('start');
	var Easier = document.getElementById('easy');
	var Harder = document.getElementById('hard');
	var title = document.getElementById('title-bar');
	var gameBody = document.getElementById('game-body');
	var empty = document.getElementById('empty');
	var info = document.getElementById('info-bar');
	var stepNum = document.getElementById('step-num');
	var difficulty = 4;

	// 创建一个拼图的构造函数
	var puzzle = function(name, sizes) {
		return {
			// 存放div 放进gamebody的元素就是这个
			puzzle: [],
			step: '0',
			get_name: function() {
				return name;
			},
			get_size: function() {
				if (sizes <= 4) {
					sizes = '4';
				} else if (sizes > 8) {
					sizes = '8';
				}
				return sizes;
			},
			createPuzzle: function() {
				var sizes = this.get_size();
				for (var i = 0; i < sizes * sizes - 1; i++) {
					this.puzzle[i] = document.createElement('div');
					this.puzzle[i].className = 'puzzle '+'puzzle-'+sizes;
					this.puzzle[i].col = i % sizes;
					this.puzzle[i].row = parseInt(i / sizes);
					this.puzzle[i].bgtop = this.puzzle[i].col * 100 / (sizes-1) + '%';
					this.puzzle[i].bgleft = this.puzzle[i].row * 100 / (sizes-1) + '%';
				}
				// 空白可以移动的位置
				this.puzzle[i] = document.createElement('div');
				this.puzzle[i].className = 'puzzle-'+sizes;
				this.puzzle[i].id = 'empty';
				this.puzzle[i].col = i % sizes;
				this.puzzle[i].row = parseInt(i / sizes);
			},
			appendPuzzle: function() {
				var sizes = this.get_size();
				for (var i = 0; i < this.puzzle.length; i++) {
					gameBody.appendChild(this.puzzle[i]);
					// 此处可能为侵式的代码，但是为了动态生成不同大小的拼图，这能这样子做了
					this.puzzle[i].style.backgroundPosition = this.puzzle[i].bgtop + ' ' + this.puzzle[i].bgleft;
					this.puzzle[i].style.left = 352 / sizes * this.puzzle[i].col + 'px';
					this.puzzle[i].style.top = 352 / sizes * this.puzzle[i].row + 'px';
				}
			},
			removePuzzle: function() {
				for (var i = 0; i < this.puzzle.length; i++) {
					gameBody.removeChild(this.puzzle[i]);
				}
			},
			changePuzzle: function() {
				var sizes = this.get_size();
				var thats = this;
				for (var i = 0; i < sizes * sizes - 1; i++) {
					this.puzzle[i].onclick = function() {
						var empty = document.getElementById('empty');
						var that = this;
						var tempLeft = empty.style.left;
						var tempTop = empty.style.top;
						var tempCol = empty.col;
						var tempRow = empty.row;
						function exchange() {
							empty.style.left = that.style.left;
							empty.style.top = that.style.top;
							that.style.left = tempLeft;
							that.style.top = tempTop;

							empty.row = that.row;
							empty.col = that.col;
							that.row = tempRow;
							that.col = tempCol;
						}
						if (this.col == empty.col) {
							if (this.row + 1 == empty.row || this.row - 1 == empty.row) {
								exchange();
								thats.step++;
								stepNum.innerHTML = 'step: ' + thats.step;
								thats.isWin();
							}
						} else if (this.row == empty.row) {
							if (this.col + 1 == empty.col || this.col - 1 == empty.col) {
								exchange();
								thats.step++;
								stepNum.innerHTML = 'step: ' + thats.step;
								thats.isWin();
							}
						}
					}
				}
			},
			randomPuzzle: function() {

				//通过打乱数组得到不重复的随机数
				var sizes = this.get_size();
				var randomArray = new Array;
				for (var i = 0; i < sizes * sizes - 1; i++) {
					randomArray[i] = i;
				}
				randomArray.sort(function() {
					return 0.5 - Math.random();
				});

				var tempCol = new Array;
				var tempRow = new Array;
				var tempLeft = new Array;
				var tempTop = new Array;
				for (i = 0; i < sizes * sizes -1; i++) {
					tempCol[i] = this.puzzle[i].col;
					tempRow[i] = this.puzzle[i].row;
					tempLeft[i] = this.puzzle[i].style.left;
					tempTop[i] = this.puzzle[i].style.top;
				}
				for (i = 0; i < sizes * sizes - 1; i++) {
					this.puzzle[i].col = tempCol[randomArray[i]];
					this.puzzle[i].style.left = tempLeft[randomArray[i]];
					this.puzzle[i].row = tempRow[randomArray[i]];
					this.puzzle[i].style.top = tempTop[randomArray[i]];
				}
			},
			isWin: function() {
				var sizes = this.get_size();
				for (var i = 0; i < sizes * sizes; i++) {
					if (this.puzzle[i].col != i % sizes || this.puzzle[i].row != parseInt(i / sizes)) {
						return false;
					}
				}
				alert('Congratulations! You pass ' + this.get_name() + ' in ' + this.step + ' step');
				info.innerHTML = 'You pass ' + this.get_name() + ' in ' + this.step + ' step';
				this.step = 0;
				stepNum.innerHTML = '';
				this.removePuzzle();
				this.init();
				return true;
			},
			init: function() {
				this.step = 0;
				stepNum.innerHTML = '';
				this.createPuzzle();
				this.appendPuzzle();
			}
		};
	};

	// 实例化初级拼图，第一个参数为模式名称，第二个为大小
	var myPuzzle = puzzle("level 1", '4');
	myPuzzle.init();
	start.onclick = function() {
		myPuzzle.randomPuzzle();
		//开始后才可以点击
		myPuzzle.changePuzzle();
		info.innerHTML = 'Use + or - to change difficulty and start';
	}
	Easier.onclick = function() {
		info.innerHTML = 'Use + or - to change difficulty and start';
		if (difficulty > 4) {
			difficulty--;
			myPuzzle.removePuzzle();
			myPuzzle = puzzle('level ' + (difficulty - 3), difficulty);
			title.innerHTML = myPuzzle.get_name();
			myPuzzle.init();
		}
	}
	Harder.onclick = function() {
		info.innerHTML = 'Use + or - to change difficulty and start';
		if (difficulty < 8) {
			difficulty++;
			myPuzzle.removePuzzle();
			myPuzzle = puzzle('level ' + (difficulty - 3), difficulty);
			title.innerHTML = myPuzzle.get_name();
			myPuzzle.init();
		}
	}
}
