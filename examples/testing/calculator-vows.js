var vows = require('vows');
var assert = require('assert');

var calculator = require('./calculator');

function hasMethod(name, length) {
    length = length || 0;
    return function(calc) {
        assert.equal(typeof calc[name], 'function');
        assert.equal(calc[name].length, length);
    }
}

function newCalcEquals(initial) {
    return function() {
        new calculator.Calculator(initial).equals(this.callback);
    }
}
function assertEquals(expected) {
    return function(answer) {
        assert.equal(answer, expected);
    }
}

vows.describe("Calculator").addBatch({
    "new Calculator()": {
        topic: new calculator.Calculator,
        "has add() method": function(calc) {
            assert.equal(typeof calc.add, 'function');
            assert.equal(calc.add.length, 0);
        },
        "has minus() method":    hasMethod('minus'),
        "has type(num) method":  hasMethod('type', 1),
        "has equals(cb) method": hasMethod('equals', 1)
    },
    "new Calculator(1).equals()": {
        topic: function() {
            new calculator.Calculator(1).equals(this.callback);
        },
        "should callback 1": function(answer) {
            assert.equal(answer, 1);
        }
    },
    "new Calculator(7).equals()": {
        topic: newCalcEquals(7), "should callback 7": assertEquals(7)
    },
    "new Calculator(-5).equals()": {
        topic: newCalcEquals(-5), "should callback -5": assertEquals(-5)
    },
    "2 + 2": {
        topic: function() {
            var calc = new calculator.Calculator();
            return calc.type(2).add().type(2);
        },
        "=": {
            topic: function(calc) {
                calc.equals(this.callback);
            },
            "4": assertEquals(4),
            "+ 2 =": {
                topic: function(four, calc) {
                    calc.add().type(2).equals(this.callback);
                },
                "6": assertEquals(6)
            }
        }
    }
}).export(module);
