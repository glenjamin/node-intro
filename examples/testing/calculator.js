exports.Calculator  = Calculator
function Calculator(initial) {
    this.number = initial || 0;
    this.operation = null;
}
Calculator.prototype.add = function() {
    this.operation = function(a, b) { return a + b };
    return this;
}
Calculator.prototype.minus = function() {
    this.operation = function(a, b) { return a - b };
    return this;
}


Calculator.prototype.type = function(number) {
    this.number = this.operation ? this.operation(this.number, number) : number;
    return this;
}
Calculator.prototype.equals = function(callback) {
    var answer = this.number;
    process.nextTick(function() {
        callback(null, answer)
    });
}
