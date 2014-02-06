/**
 * Created by abadri on 2/4/14.
 */

function add(x, y) {
    return x + y;
}

function sub(x, y) {
    return x - y;
}

function mul(x, y) {
    return x * y;
}

add(3, 4);
sub(3, 4);
mul(3, 4);


function identityf(x) {
    return function () {
        return x;
    };
}

var idf3 = identityf(3);

idf3();

function addf(x) {
    return function (y) {
        return x + y;
    };
}

addf(3)(4);

/*
 * Write a function that takes a binary function, and makes it callable with
 * two invocations e.g var addf = applyf(add); addf(3)(4); //7 applyf(mul)(5)(6);
 */

function applyf(fun) {
    return function (x) {
        return function (y) {
            return fun(x, y);
        };
    };
}

var addf = applyf(add);

addf(3)(4);

applyf(mul)(5)(6);

/*
 * Write a function that takes a function and an argument, and returns a function that can
 * take second argument
 * var add3 = curry(add, 3);
 * add3(4); // 7
 * curry(mul, 5)(6); //30
 */

function curry(fun, x) {
    return function (y) {
        return fun(x, y);
    };
}

var add3 = curry(add, 3);
add3(4); // 7
curry(mul, 5)(6); //30


/*
 * Without writing any new function show three ways to create the inc function
 */

var inc = function (x) {
    return add(1, x);
};

var inc2 = function (x) {
    return applyf(add)(1)(x);
};

var inc3 = curry(add, 1);

inc(5);
inc(inc(5));
inc2(5);
inc2(inc2(5));
inc3(5);
inc3(inc2(5));

/*
 * Write a function twice that takes a binary function and returns a unary function
 * that passes its argument to the binary function twice
 */

function twice(fun) {
    return function (x) {
        return fun(x, x);
    };
}

add(11, 11); //22
var doubl = twice(add);
var square = twice(mul);
doubl(2);
square(11); //121


/*
 * Write a switcheroo function that reverses the arguments of a
 * binary function.
 */

function switcheroo(fun) {
    return function (x, y) {
        return fun(y, x);
    };
}

var bus = switcheroo(sub);
bus(3, 2); //-1

/*
  * Write a function composeu that takes two unary functions
  * and returns a unary function that calls them both
  * composeu(doubl, square)(3); //36
  * 36 = (3+3) * (3+3)
 */

function composeu(fun1, fun2) {
    return function (x) {
        return fun2(fun1(x));
    };
}

composeu(doubl, square)(3); //36

/*
 * Write a function composeb that takes two binary functions and returns
 * a function that calls them both
 * e.g. composeb(add, mul) (2, 3, 5); //25
 */

function composeb(fun1, fun2) {
    return function (x, y, z) {
        return fun2(fun1(x,y), z);
    };
}

composeb(add, mul) (2, 3, 5); //25

/*
 * Write a function that accepts a function and calls only once and returns
 * undefined when we try to call it again
 */

function once(fun) {
    return function (a, b) {
        var temp;
        if (fun) {
            temp = fun;
            fun = undefined;
            return temp (a, b);
        }
        return undefined;
    };
}

var add_once = once(add);
add_once(3, 4); // 7
add_once(3, 5); // undefined


/*
 * Write an fromTo binary function that takes from and to parameters
 * and produces that returns the values in the from to range
 * var index = fromTo(0, 3);
 * index(); //0
 * index(); //1
 * index(); //2
 * index(); //undefined
 */

function fromTo(from, to) {

    return function () {
        var result = undefined;
        if (from < to) {
            result = from;
            from++;
        }
        return result;
    };
}

var index = fromTo(0, 3);

index(); //0
index(); //1
index(); //2
index(); //undefined


/*
 * Write an element function that takes an array and an optional function
 * (like the result of fromTo) and produces a function that will produce the
 * elements of the array
 * var val = element(['a','b','c','d'], fromTo(1, 3));
 * val(); // 'b'
 * val(); // 'c'
 * val() // undefined
 */

function element(list, fun) {

    //If no fromTo method is passed send back complete array
    if (fun === undefined){
        fun = fromTo(0, list.length);
    }
    return function() {
        return list[fun()];
    };
}

var val = element(['a','b','c','d'], fromTo(1, 3));

val();
val();
val();




/*
* Write a collect function that takes a function and an array and produces
* a function that will collect the results in the array
* var array = [],
* col = collect(fromTo(1, 3), array);
* col(); //1
* col(); //2
* col(); //undefined
* console.log(array); // [1, 2]
 */

function collect(fun, array) {
    return function () {
        var val = fun();
        if(val) {
            array.push(val);
            return val;
        }
        return undefined;
    };
}

var array = [],
    col = collect(fromTo(1, 3), array);



col(); //1
col(); //2
col(); //undefined
//array; // [1, 2]

function filter(getVal, testFun){
    return function() {
       var val ;

        do {
            val = getVal();
        } while (val !== undefined && !testFun(val));

        return val;
    };
}


var fil = filter(fromTo(0, 5), function third(value) {
   return (value % 3) === 0;
});

fil(); //0
fil(); //3
fil(); //undefined


/*
 * Write a concat function that takes two sequence generating functions and
 * produces a function that combines the sequences
 * var con = concat(fromTo(1, 3), fromTo(0, 2));
 * con(); //1
 * con(); //2
 * con(); //0
 * con(); //1
 * con(); //undefined
 */

function concat(seq1, seq2) {
    return function () {
        var value;

        if (seq1 !== undefined) {
            value = seq1();
            if (value !== undefined) {
                return value;
            }
            seq1 = undefined;
        }
        return seq2();
    };
}

var con = concat(fromTo(1, 3), fromTo(0, 2));

con(); //1
con(); //2
con(); //0
con(); //1
con(); //undefined

/*
 * write a factory function that returns two functions that implement an
 * up/down counter hiding the counter
 * var counter = counterf(10),
 *     next = counter.inc,
 *    prev = counter.dec;
 *    next(); //11
 *    prev(); //10
 *    prev(); //9
 *    next(); //10
 */

var counterf = function(x) {
    return {
        inc: function(){
            return ++x;
        },

        dec: function() {
            return --x;
        }
    };
};


var counter = counterf(10),
    next = counter.inc,
    prev = counter.dec;

next(); //11
prev(); //10
prev(); //9
next(); //10

/*
 * Make a revocable function that takes a nice function and returns an object
 * contains an invoke function that can invoke the nice function and a
 * revoke function that disables the invoke function
 */


var revocable = function(log) {
    return {
        invoke: function (arg) {
            return log && log(arg);
        },
        revoke: function () {
            log = undefined;
        }
    };

};

var temp = revocable (console.log);
    invoke = temp.invoke;

//invoke(7); //7
//temp.revoke();
//invoke(8); //undefined

/*
 * Make a functin gensymf that makes a function that generates unique symbols
 * var gensymg = gensymf("G"),
 *     gensymh = gensymf("H");
 *     gyensymg();  //G1
 *     gyensymh();  //H1
 *     gyensymg();  //G2
 *     gyensymh();  //H2
 */

function gensymf(prefix) {
    var count = 0;
    return function () {
         count++;
         return prefix+count;
    };
}

var gensymg = gensymf("G"),
    gensymh = gensymf("H");

gensymg();  //G1
gensymh();  //H1
gensymg();  //G2
gensymh();  //H2


/*
 * Write a function gensymff that take a unary function and a seed
 * and retuns a gensymf
 */

function gensymff(seqFun, index) {
    return function (prefix) {
        var count = index;
        return function () {
            result = prefix + seqFun(count);
            count++;
            return result;
        }
    };
}

var gensymf = gensymff(inc, 0),
    gensymg = gensymf("G"),
    gensymh = gensymf("H");

gensymg();  //G1
gensymh();  //H1
gensymg();  //G2
gensymh();  //H2


/*
 *
 */

function fibonaccif(x, y){
    var count = 0;
    return function fib () {
        if(count===0) {
            count++;
            return x;
        } else if (count === 1 ) {
            count++;
            return y;
        } else {
            var b = y;
            y = x + y;
            x = b;
            return y;
        }

    }
}

var fib = fibonaccif(0, 1);

fib(); //0
fib(); //1
fib(); //1
fib(); //2
fib(); //3
fib(); //5
fib(); //8

function fibverb(a, b) {
    return function () {
        var next = a;
        a=b;
        b += next;
        return next;
    };
}

fib = fibverb(0, 1);
fib(); //0
fib(); //1
fib(); //1
fib(); //2
fib(); //3
fib(); //5
fib(); //8



function m(value, source) {
    return {
        value: value,
        source: source || String(value)
    };
}


/*
 * Write a functin addm that takes two m objects abd returns an m object
 * JSON.stringify(addm(m(3), m(4)));
 * //{"value":7,"source":"(3+4)"}
 * JSON.stringify(addm(m(1), m(Math.PI, "PI")));
 * //{"value":4.141592653589793,"source":"(1+pi)"}
 */

function addm(m1, m2) {
    return m(m1.value + m2.value, "(" +m1.source + "+"+m2.source+")");
}

JSON.stringify(addm(m(3), m(4))); //{"value":7,"source":"(3+4)"}
JSON.stringify(addm(m(1), m(Math.PI, "pi"))); //{"value":4.141592653589793,"source":"(1+pi)"}


/*
 * Write a function applym that takes a biary function and a string
 * and returns a function that acts on m objects
 * JSON.stringify(addm(m(3), m(4))); //{"value":7,"source":"(3+4)"}
 * JSON.stringify( applym(mul, '*')(m(3), m(4))); //{"value":12,"source":"(3*4)"}
 */

function applym (method, identifier) {
    return function (m1, m2) {
        return m(method(m1.value, m2.value), ("("+m1.source+""+identifier+""+m2.source+")"));
    }
}

var addm = applym(add, "+");
JSON.stringify(addm(m(3), m(4))); //{"value":7,"source":"(3+4)"}
JSON.stringify( applym(mul, '*')(m(3), m(4))); //{"value":12,"source":"(3*4)"}



/*
 * Modify function applym so that the functions it produces cab accept arguments that are
 * either numbers or m objects
 */

function applym2 (method, identifier) {
    return function (m1, m2) {
        if (typeof m1 === 'number') {
            m1 = m(m1);
        }
        if (typeof m2 === 'number') {
            m2 = m(m2);
        }

        return m(method(m1.value, m2.value), ("("+m1.source+""+identifier+""+m2.source+")"));
    };
}

var addm = applym2(add, "+");
JSON.stringify(addm(3, 4)); //{"value": 7, "source": "(3+4)"}
JSON.stringify(applym(mul, '*')(m(3), m(4))); //{"value":12,"source":"(3*4)"}



/*
 * Write a function exp that evaluates simple array expression
 * var sae = [mul, 3, 3];
 * exp(sae); // 9
 * exp(42); // 42
 */

function exp_1(value) {
    if(value.length) {
        return value[0].apply(this, value.slice(1));

    } else {
        return value;
    }
}

var sae = [mul, 3, 3];
exp_1(sae); // 9
exp_1(42); // 42


/*
 * Modify exp to evaluate nested array expressions
 */

function exp(value) {
   return Array.isArray(value) ? value[0] (exp(value[1]), exp(value[2])) : value;
}

var nae = [
    Math.sqrt,
    [add, [square, 3], [square, 4]]
];

exp(nae); //5


/*
 * Write a function addg that adds from many invocations, un till it sees and empty invocation
 *
 * addg(); // undefined
 * addg(2)(); // 2
 * addg(2)(7)(); //9
 * addg(3)(4)(0); // 7
 * addg(1)(2)(4)(8)(); // 15
 */

function addg(first) {
    if (first === undefined) {
        return first;
    }
    return function more(next) {
        if(next === undefined) {
            return first;
        }

        first += next;
        return more;
    };
}

addg(); // undefined
addg(2)(); // 2
addg(2)(7)(); //9
addg(3)(4)(0); // 7
addg(1)(2)(4)(8)(); // 15



/*
 *  Write a function applyg that will take a binary function and ally it to many invocations
 */

function applyg(func) {
    return function(first) {
        if (first === undefined) {
            return first;
        }
        return function more(next) {
            if(next === undefined) {
                return first;
            }

            first = func(first, next);
            return more;
        };
    };
}

applyg(mul)(); // undefined
applyg(mul)(3)(); //3
applyg(mul)(3)(4)(5)(); //60
applyg(mul)(1)(2)(4)(8)(); //64


/*
 * Write a function arrayg that will build an array form many invocations
 * arrayg(); //[]
 * arrayg(3)(); //[3]
 * arrayg(3)(4)(5)(); //[3, 4, 5]
 */

function arrayg(first) {

        if (first === undefined) {
            return [];
        }
        return function more (next) {
            if(!Array.isArray(first)) {
                first = [first];
            }
            if(next === undefined) {
                return first;
            }

            first.push(next);

            return more;
        };

     var array = [];
     function more(next) {
         if (next === undefined) {
             return [];
         }
         return applyg(function (array, value){

         });
     }

}


arrayg(); //[]
arrayg(3)(); //[3]
arrayg(3)(4)(5)(); //[3, 4, 5]



/*
 * Make a function that takes a unary function and returns a function that takes an argument
 * and a call back
 * sqrtc = unaryc(Math.sqrt);
 * sqrtc(log, 81); //9
 */

function unaryc(fun) {
 return function(callback, val) {
     callback(fun(val));
 };
}

var sqrtc = unaryc(Math.sqrt);
sqrtc(console.log, 81); //9


///Object creation pattern
/*
function constructor(init) {
    var that = Other_counstructor(init),
        member,
        method =  function () {
            //init, memver, method
        };
    that.method = method;

    return that;
}`
*/