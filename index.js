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
    }
}

var idf3 = identityf(3);

idf3();

function addf(x) {
    return function (y) {
        return x + y;
    }
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
    }
}

var add3 = curry(add, 3);
add3(4); // 7
curry(mul, 5)(6); //30


/*
 * Without writing any new function show three ways to create the inc function
 */

var inc = function (x) {
    return add(1, x);
}

var inc2 = function (x) {
    return applyf(add)(1)(x);
}

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
    }
}

add(11, 11); //22
var doubl = twice(add);
var square = twice(mul);
doubl(2);
square(11); //121


function switcheroo(fun) {
    return function (x, y) {
        return fun(y, x);
    }
}

/*
 * Write a switcheroo function that reverses the arguments of a
 * binary function.
 */
var bus = switcheroo(sub);
console.log(bus(3, 2)); //-1
