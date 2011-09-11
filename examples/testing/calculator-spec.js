var nodespec = require("nodespec");

var calculator = require('./calculator');

nodespec.describe("Calculator", function() {
    this.subject("calc", function() {
        return new calculator.Calculator(this.initial);
    });
    this.describe("constructor", function() {
        this.example("should have add() method", function() {
            this.assert.equal(typeof this.calc.add, 'function');
            this.assert.equal(this.calc.add.length, 0);
        });
        shouldHaveMethod(this, 'minus');
        shouldHaveMethod(this, 'type',   1);
        shouldHaveMethod(this, 'equals', 1);

        this.example("default 1, equals should callback 1", function(test) {
            test.expect(2);
            test.initial = 1;
            test.calc.equals(function(err, answer) {
                test.assert.ifError(err);
                test.assert.equal(answer, 1);
                test.done();
            });
        });
        shouldEqualGivenDefault(this, 7);
        shouldEqualGivenDefault(this, -5);
    });
    this.describe("Calculating", function() {
        this.example("2 + 2 = 4 + 2 = 6", function(test) {
            test.expect(4);
            test.calc.type(2).add().type(2);
            test.calc.equals(function(err, answer) {
                test.assert.ifError(err);
                test.assert.equal(answer, 4);
                test.calc.add().type(2);
                test.calc.equals(function (err, answer) {
                    test.assert.ifError(err);
                    test.assert.equal(answer, 6);
                    test.done();
                })
            });
        });
    });
});

function shouldHaveMethod(group, name, length) {
    length = length || 0;
    group.example("should have "+name+"() method", function() {
        this.assert.equal(typeof this.calc[name], 'function');
        this.assert.equal(this.calc[name].length, length);
    });
}
function shouldEqualGivenDefault(group, value) {
    group.example("default "+value+", equals should callback "+value,
    function(test) {
        test.expect(2);
        test.initial = value;
        test.calc.equals(function(err, answer) {
            test.assert.ifError(err);
            test.assert.equal(answer, value);
            test.done();
        });
    });
}

nodespec.exec();
