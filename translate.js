var words = JSON.parse(localStorage.getItem('wordsArr')) || [];

var addWord = function(russian, english){
	return {
		russian: russian.toLowerCase(),
		english: english.toLowerCase()
	}
}

var addWords = function( value ){
	var wordsarr = value.split(',');
	for(var i = 0; i<wordsarr.length; i++){
			var index = wordsarr[i].indexOf('-');
			var english = wordsarr[i].substring(0,index).trim();
			var russian = wordsarr[i].substring(index+1, wordsarr[i].length).trim();
			words.push(addWord(russian, english));
		}
}

var addruword = document.getElementById('addruword');
var addenword = document.getElementById('addenword');

var adwsbutt = document.getElementById('addWords');
adwsbutt.addEventListener('click', function(){
	var wordsArea = document.getElementById('wordsArea');
	var value = wordsArea.value;
	addWords(value);
	localStorage.setItem('wordsArr', JSON.stringify(words));
	wordsArea.value = '';
})

var adwbutt = document.getElementById('addWordButton');
adwbutt.addEventListener("click", function() {
	var newWord = addWord(addruword.value.toLowerCase(), addenword.value.toLowerCase());
	words.push(newWord);
	document.getElementById('addruword').value = '';
	document.getElementById('addenword').value = '';
	localStorage.setItem('wordsArr', JSON.stringify(words));
})

var wordsArr = JSON.parse(localStorage.getItem('wordsArr'));
var wordsList;

var shuffle = function(){
  wordsList = Array.prototype.slice.call(wordsArr, 0)
	wordsList.sort(function(){
		return Math.floor(Math.random() - 0.5 )
	})
}

var currWord = 0;
var ruword = document.getElementById("ruword");
var isStarted = false;

var startbutt = document.getElementById('startbutt');
startbutt.addEventListener('click', function(){
	if(!isStarted){
		shuffle();
		isStarted = true;
		numberOfWords.setAttribute('disabled' ,'disabled');
		input.removeAttribute('disabled');
		input.value = '';
		currWord = 0;
		ruword.innerHTML = wordsList[currWord].russian.charAt(0).toUpperCase() + wordsList[currWord].russian.substring(1,wordsList[currWord].length);
		incorrWords.length = 0;
		mistkArr.length = 0;
		clearMistkTable();
		table.style.visibility = 'hidden';
	}
})

var input = document.getElementById("translate");
var value;
var incorrWords = [];
var mistkArr = [];
var table = document.getElementById('mistakes');
var numberOfWords = document.getElementById('numberOfWords');

var createMistkTable = function(words, mistk){
	for(var i = 0; i < words.length; i++){
		var tr = document.createElement('tr');
		var td1 = document.createElement('td');
		var td2 = document.createElement('td');
		var td3 = document.createElement('td');
		var td4 = document.createElement('td');

		td1.innerHTML = i+1;
		td2.innerHTML = words[i].english.charAt(0).toUpperCase() + words[i].english.substring(1,words[i].english.length);
		td3.innerHTML = words[i].russian.charAt(0).toUpperCase() + words[i].russian.substring(1,words[i].russian.length);
		td4.innerHTML = mistk[i];
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);

		table.appendChild(tr);
		table.style.visibility = 'visible';
	}
}

var clearMistkTable = function(){
	table.innerHTML = '<tr><th>№</th><th>English</th><th>Russian</th><th>Mistake</th></tr>';
}

input.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
		var value = input.value;
		var nmbvalue = numberOfWords.value;
		if(nmbvalue == 'All'){
			nmbvalue = wordsList.length;
	  }
		if( value.toLowerCase() != wordsList[currWord].english){
			incorrWords.push( wordsList[currWord]);
		    mistkArr.push( value.toLowerCase() );
		}
		if( currWord + wordsList.length - nmbvalue + 1 == wordsList.length){
			input.value = '';
			input.disabled = 'disabled';
			isStarted = false;
			createMistkTable( incorrWords, mistkArr );
			numberOfWords.removeAttribute('disabled');
		}
		else{
		 	currWord++;
			ruword.innerHTML = wordsList[currWord].russian.charAt(0).toUpperCase() + wordsList[currWord].russian.substring(1,wordsList[currWord].length);
			input.value = '';
		}

}});
