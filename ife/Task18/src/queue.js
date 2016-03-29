
// namespace ;
var Global = {}

window.onload = function() {
	
	Global.number = document.getElementById("number");
	Global.output = document.getElementById("output");

	var buttons = new Array();
	buttons[0] = document.getElementById("AddLf");
	buttons[1] = document.getElementById("AddRi");
	buttons[2] = document.getElementById("DeleteLf");
	buttons[3] = document.getElementById("DeleteRi");

	//Add lintener to each Buttons;
	for (var i = 0; i < 4; i++) {
		if (buttons[i].id == "AddLf") buttons[i].addEventListener("click", AddLeft);
		else if (buttons[i].id == "AddRi") buttons[i].addEventListener("click", AddRight);
		else if (buttons[i].id == "DeleteLf") buttons[i].addEventListener("click", DeleteLeft);
		else if (buttons[i].id == "DeleteRi") buttons[i].addEventListener("click", DeleteRight);
	}
}

//Add an element to the left;
function AddLeft() {
	if (!CheckData()) return;
	var newElement = document.createElement("div");
	newElement.innerText = Global.number.value;
	newElement.className += "output";
	newElement.addEventListener("click", SelfDelete);
	var firstchild = Global.output.firstchild;
	Global.output.insertBefore(newElement, firstchild);
	
}

//Add an element to the right;
function AddRight() {
	if (!CheckData()) return;
	var newElement = document.createElement("div");
	newElement.innerText = Global.number.value;
	newElement.className += "output";
	newElement.addEventListener("click", SelfDelete);
	var firstchild = Global.output.firstchild;
	Global.output.appendChild(newElement);
}

//Delete an element on the left;
function DeleteLeft() {
	alert("Delete: " + output.firstChild.innerText);
	output.removeChild(output.firstChild);
}

//Delete an element on the right;
function DeleteRight() {
	alert("Delete: " + output.lastChild.innerText);
	output.removeChild(output.lastChild);
}

//Check whether the data is a number;
function CheckData() {
	var data = Global.number.value;
	if (!/^[0-9]*$/.test(data) || data == "") { console.log(1); return false; }
	return true;
}

//The way to delete the clicked elements;
function SelfDelete() {
	console.log(this.innerText);
	alert("Delete: " + this.innerText);
	output.removeChild(this);
}