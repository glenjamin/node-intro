var util = require('util');

function Animal(legs) {
    this.legs = legs;
}

util.inherits(Dog, Animal);
function Dog(name) {
    this.constructor.super_.call(this, 4);
    this.name = name;
}


var fido = new Dog('fido');

console.log(fido.name === 'fido');
// => true
console.log(fido.legs === 4);
// => true


Dog.prototype.bark = function() {
    return this.name + ' barks';
}
console.log(fido.bark());
// => 'fido barks'


Animal.prototype.speed = function() {
    return (this.legs * 5) + 'm/s';
}
console.log(fido.speed());
// => 20m/s


i = [];
for (var f in fido) {
    i.push(f);
}
console.log(i);
// => ['legs', 'name', 'bark', 'speed']


Object.defineProperty(
    Animal.prototype, 'speed',
    {
        value: function() {
            return (legs * 5) + 'm/s';
        },
        enumerable: false
    }
);
