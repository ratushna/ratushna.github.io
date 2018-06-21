if (typeof window.addEventListener != 'undefined') window.addEventListener('load', init, false);
else if (typeof window.attachEvent != 'undefined') window.attachEvent('onload', init);

var m1, m2, r;

var cols1 = null;
var cols2 = null;
var rows1 = null;
var rows2 = null;
function init(){
	cols1 = ge('cols1');
	cols1.onchange = function(){
		replaceText(rows2, this.value);
	}
	cols2 = ge('cols2');
	rows1 = ge('rows1');
	rows2 = ge('rows2');
	ge('create').onclick = function(){
		var c1 = parseInt(cols1.value);
		var r1 = parseInt(rows1.value);
		var c2 = parseInt(cols2.value);
		if(isNaN(c1)){
			cols1.focus();
			alert('Спочатку введіть усі значення');
			return;
		}
		if(isNaN(c2)){
			cols2.focus();
			alert('Спочатку введіть усі значення');
			return;
		}
		if(isNaN(r1)){
			rows1.focus();
			alert('Спочатку введіть усі значення');
			return;
		}
		ConstructMatrix(c1, r1, c2);
	}
	ge('multiple').onclick = Solve;
	ge('create').onclick();
	Solve();
}
function Solve(){
	if(typeof m1 == 'undefined' || typeof m2 == 'undefined' || typeof r == 'undefined') return;
	for(var i=0; i<m1.length; i++){
		for(var j=0; j<m2[0].length; j++){
			var sum = 0;
			for(var k=0; k<m1[i].length; k++){
				sum += m1[i][k].value*m2[k][j].value;
			}
			replaceText(r[i][j], sum);
		}
	}	
}

function ConstructMatrix(c1, r1, c2){
	m1 = [];
	m2 = [];
	r = [];
	var mat1 = ge('mat1');
	ClearElement(mat1);
	var isRandom = ge('random').checked;
	var t1 = createTable();
	var val;
	for(var i=0; i<r1; i++){
		m1[i] = [];
		var row = ce('TR');
		for(var j=0; j<c1; j++){
			val  = isRandom ? Math.round(Math.random()*10) : 0;
			m1[i][j] =  ce('INPUT', null, {type:'text', size:3,value:val});
			ac(ce('TD', m1[i][j]), row);
			
		}
		ac(row, t1.tbody);
	}
	ac(t1.table, mat1);
	
	var mat2 = ge('mat2');
	ClearElement(mat2);
	var t2 = createTable();
	for(var i=0; i<c1; i++){
		m2[i] = [];
		var row = ce('TR');
		for(var j=0; j<c2; j++){
			val  = isRandom ? Math.round(Math.random()*10) : 0;
			m2[i][j] =  ce('INPUT', null, {type:'text', size:3,value:val});
			ac(ce('TD', m2[i][j]), row);
		}
		ac(row, t2.tbody);
	}
	ac(t2.table, mat2);
	
	var rez = ge('rez');
	ClearElement(rez);
	var t3 = createTable({border:1, cellPadding:3});
	for(var i=0; i<r1; i++){
		r[i] = [];
		var row = ce('TR');
		for(var j=0; j<c2; j++){
			r[i][j] = ce('TD', '0');
			ac(r[i][j], row);
		}
		ac(row, t3.tbody);
	}
	ac(t3.table, rez);
	if(isRandom) Solve();
}

function ClearElement(e){ while(e.childNodes.length>0) e.removeChild(e.childNodes[0]); }
function ce(tag, text, attrib){
	var e = document.createElement(tag);
	if(typeof text != 'undefined' &&  text !== null){
		if(typeof text == 'object' && typeof text.tagName != 'undefined') ac(text, e);
		else addText(e, text);
	}
	if(typeof attrib == 'object') for(var a in attrib) e[a] = attrib[a];
	return e;
}
function ctn(text){ return document.createTextNode(text); }
function ge(tag){ return document.getElementById(tag); }
function gf(fname){ return document.forms[fname]; }
function ac(e, parent){ if(typeof parent == 'undefined') document.body.appendChild(e); else parent.appendChild(e); }
function addText(e, text) { e.appendChild(document.createTextNode(text)); }
function replaceText(e, text) { ClearElement(e); e.appendChild(document.createTextNode(text)); }
function addBrText(e, text){
	while(text.match(/\r?\n/) !== null){
		if(RegExp.leftContext != '') ac(ctn(RegExp.leftContext), e);
		ac(ce('BR'), e);
		text = RegExp.rightContext;
	}
	if(text!= '') ac(ctn(text), e);
}
function createTable(attrib){
	var table = {};
	table.table = ce('TABLE', null, attrib);
	table.tbody = ce('TBODY')
	ac(table.tbody, table.table);
	return table;
}
