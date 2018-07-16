



$(document).on('click', "#but1", function(){
	removeProduct("123ff");
	console.log(localStorage["123ff"]);
});
function $_GET(key) {
    var s = window.location.search;
    s = s.match(new RegExp(key + '=([^&=]+)'));
    return s ? s[1] : false;
}
function addProduct(articule){
	if(localStorage.getItem(articule))
		localStorage[articule]++;
	else
		localStorage.setItem(articule, 1);
	
}
function removeProduct(articule){
	if(localStorage.getItem(articule)){
		if(localStorage[articule] == 1) localStorage.removeItem(articule);
		else localStorage[articule]--;
	}
}


