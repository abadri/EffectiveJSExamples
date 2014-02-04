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