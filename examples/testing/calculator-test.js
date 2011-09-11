var calculator = require('./calculator');

exports['instance methods'] = function (test) {
    var calc = new calculator.Calculator();
    test.expect(8);
    test.equal(typeof calc.add, 'function');
    test.equal(calc.add.length, 0);
    test.equal(typeof calc.minus, 'function');
    test.equal(calc.minus.length, 0);
    test.equal(typeof calc.type, 'function');
    test.equal(calc.type.length, 1);
    test.equal(typeof calc.equals, 'function');
    test.equal(calc.equals.length, 1);
    test.done();
};

exports['default value of 1'] = function (test) {
    test.expect(2);
    var calc = new calculator.Calculator(1);
    calc.equals(function(err, value) {
        test.ifError(err);
        test.equal(value, 1);
        test.done();
    });
};
exports['default value of 7'] = function (test) {
    test.expect(2);
    var calc = new calculator.Calculator(7);
    calc.equals(function(err, value) {
        test.ifError(err);
        test.equal(value, 7);
        test.done();
    });
};
exports['default value of -5'] = function (test) {
    test.expect(2);
    var calc = new calculator.Calculator(-5);
    calc.equals(function(err, value) {
        test.ifError(err);
        test.equal(value, -5);
        test.done();
    });
};

exports['2 + 2 = 4 + 2 = 6'] = function (test) {
    test.expect(4);
    var calc = new calculator.Calculator();
    calc.type(2).add().type(2);
    calc.equals(function(err, value) {
        test.ifError(err);
        test.equal(value, 4);
        calc.add().type(2);
        calc.equals(function(err, value) {
            test.ifError(err);
            test.equal(value, 6);
            test.done();
        })
    })
};
