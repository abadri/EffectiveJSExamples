'use strict';


function MySingleton() {
	if (MySingleton.prototype._this) {
		return MySingleton.prototype._this;
	}
	MySingleton.prototype._this = this;
	this.counter = 1;
	this.getCounter = () => this.counter;
	this.updateCounter = () => ++this.counter;
}

var a = new MySingleton();
var b = new MySingleton();

console.log(a.getCounter());
console.log(b.updateCounter());
console.log(a.getCounter());

