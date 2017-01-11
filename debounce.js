/*
* Example use case, in case of scroll/resize events, browser fires the events continuously and 
* we would like to delay the callback function for x ms before it is called.
*/

'use strict';
function debounce(fn, delay) {
	let timer;

	return function debounceInner() {
		const context = this;
		const args = arguments;
		if (timer) clearTimeout(timer);
		timer = setTimeout(function(){
			fn.apply(context, args);	
		}, delay);
		
	}
}


let deFun = debounce(console.log, 1000);

for (var i = 0; i <= 5000; i++) {
	deFun('hello');		
}
