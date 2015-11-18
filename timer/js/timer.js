window.onload = function() {
	var begin = document.getElementById('begin');
	var clear = document.getElementById('clear');
	var minute = document.getElementById('minute-output');
	var second = document.getElementById('second-output');
	var minInput = document.getElementById('minute-input');
	var secInput = document.getElementById('second-input');
	var buttonArea = document.getElementById('button-area');
	var button = buttonArea.getElementsByTagName('button');

	begin.addEventListener('click', timeInputChecker);
	clear.addEventListener('click', clearTime);

	minInput.addEventListener('blur', minHint);
	secInput.addEventListener('blur', secHint);

	minInput.addEventListener('click', removeInput);
	secInput.addEventListener('click', removeInput);

	minute.addEventListener('click', function(event) {
		event.preventDefault();
	});
	second.addEventListener('click', function(event) {
		event.preventDefault();
	});

	for(var i = 0; i < 3; i++) {
		button[i].addEventListener('click', defaultTime)
	}


}

function defaultTime(i) {
	var minInput = document.getElementById('minute-input');
	var secInput = document.getElementById('second-input');

	minInput.value = 0;
	secInput.value = this.value;
	minInput.className = "input";
	secInput.className = "input";
}

function timeInputChecker(i) {

	var minute = parseInt(document.getElementById('minute-input').value);
	var second = parseInt(document.getElementById('second-input').value);
	var pause = document.getElementById('pause');

	var minOutput = document.getElementById('minute-output');
	var secOutput = document.getElementById('second-output');

	// 若只输入分钟或者秒秒钟，默认另一个为0, 防止NaN全错，用isNaN()函数
	if (isNaN(minute)) {
		if (!isNaN(second)) {
			minute = 0;
		}
	} else {
		if (isNaN(second)) {
			second = 0;
		}
	}

	if (minOutput.value == 0 && secOutput.value == 0) { // 从新开始
		if (minute < 99 && minute >= 0 && second >= 0 && (minute * 60) <= 5999) { //确保输入的时间小于99分59秒
			second += minute * 60;
			minOutput.value = Math.floor(second / 60);
			secOutput.value = Math.floor(second % 60);
			timeFunction("begin");
			pause.addEventListener('click', pauseTime);
		} else {
			alert("请输入0～100分钟的时间进行倒计时");
		}
	} else { //　暂停后继续的开始
		timeFunction("removetimer");
		timeFunction("begin");
		pause.addEventListener('click', pauseTime);
	}
}

function timeFunction(cmd) {
	var minOutput = document.getElementById('minute-output');
	var secOutput = document.getElementById('second-output');
	var state = document.getElementById('state');
	var begin = document.getElementById('begin');

	if (cmd == "begin") {
		state.innerHTML = "倒计时中...";
		Timer = setInterval(timeCounter, 1000);
	} else if(cmd == "end") {
		begin.innerHTML = "开始";
		state.innerHTML = "请输入或选择时间点击开始按钮";
		pause.removeEventListener('click', pauseTime);
		clearInterval(Timer);
		secOutput.value = 0;
		minOutput.value = 0;
	} else if(cmd == "pause") {
		begin.innerHTML = "继续";
		state.innerHTML = "暂停中...点击继续";
		clearInterval(Timer);
		pause.removeEventListener('click', pauseTime);
	} else if(cmd == "removetimer") {
		clearInterval(Timer);
	}
}
function timeCounter() {
	var minOutput = document.getElementById('minute-output');
	var secOutput = document.getElementById('second-output');
	var state = document.getElementById('state');

	if (secOutput.value == 0 && minOutput.value > 0) {
			secOutput.value = 60;
			minOutput.value--;
			secOutput.value--;
	} else if (secOutput.value == 0 && minOutput.value == 0) {
		timeFunction("end");
		alert("时间到！");
	} else {
		secOutput.value--;
		if (minOutput.value == 0 && secOutput.value < 4) {
			state.innerHTML = "时间马上就要到了！"
		}
	}
}

function pauseTime() {
	timeFunction("pause");
}
function clearTime() {
	timeFunction("end");
}

function minHint() {
	if (this.value == "") {
		this.value = "请输入分钟";
		this.className = "input-hint";
	}
}

function secHint() {
	if (this.value == "") {
		this.value = "请输入秒钟";
		this.className = "input-hint";
	}
}

function removeInput() {
	if (typeof this.value != "number") {
		this.value = "";
		this.className = "input";
	}
}