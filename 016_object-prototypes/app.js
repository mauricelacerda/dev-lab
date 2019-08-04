'use strict';

var user = {
	firstName: 'Mauricio',
	lastName: 'Lacerda',
	age: 38,
	birthday: new Date('1981-02-17T10:55:00.000-03:00'),
	fullName: function() {
		console.log(this.firstName + ' ' + this.lastName);
		return 0;
	}
};

var volkov = {
	playerName: 'Mauricio',
	charNAme: 'Lucan Volkov',
	classLevels: [
		{
			className: 'wizard',
			classLevel: 3
		},
		{
			className: 'fighter',
			classLevel: 1
		}
	],
	getClassLevel: function() {
		return this.classLevels[0].classLevel + this.classLevels[1].classLevel;
	}
};

let volkovLevel = volkov.getClassLevel();
console.log(`Volkov has ${volkovLevel} total class levels.`);

console.log(user);

// PROTOTYPAL INHERITANCE

// Every object that is defined with the object constructor 'new Object', or with the object literal {} inherits at least one prototype which is defined in the property '__proto__'

console.log(user.__proto__);

// This means that any data or functionality that exists within an object's prototype can also be accessed by the object itself.

// Question: if I use Object.create() and pass no arguments, will it inherit '__proto__'? Find out bellow.

console.log(user.hasOwnProperty('firstName'));

// the method '.hasOwnProperty' was not defined in the 'user' object literal.
// Where did it come from ?
// It came from its prototype; 'user' inherited this functionality from its prototype

// PROTOTYPE CHAINING

// When a property is called from an object, JavaScript will first lookup within the object definition for a property matching the name. If it doesn't find it, it will then lookup into the object's prototype. It will continue to do so until it reaches the highest level prototype, which is the Object prototype

user.hasOwnProperty = function() {
	console.log("I'm a homonymous method");
};

user.hasOwnProperty('firstName'); // since we defined a homonymous method, the call will invoke the method that was created in the object definition, and it won't reach its prototype method.

console.log(user.__proto__.hasOwnProperty('firstName')); // returns false, because the 'user.__proto__' does not have a property named 'firstName'.

console.log(user); // only the created object has the 'firstName' property, but we can't check it with '.hasOwnProperty()' because 'user' now has a different method associated with that name.

// An object prototype can have other prototypes which it inherits from. This is called 'prototype chaining'. The highest level prototype is the Object prototype, which all other objects inherit from.

let arr = ['foo', 'bar', 42]; // Arrays are also objects, this means they can inherit from the Object prototype

console.log(arr.toString()); // 'toString' is defined in the Object prototype, therefore array objects have access to that method

console.log('################################');

// DEFINING PROTORYPES WITH Object.create()

// When you want to create an object that has a specific prototype, you must use Object.create()

// To create an object using Object.create(), first you need to create a prototype to pass into that method.

const playerProto = {
	charClass: 'wizard',
	charLevel: 3
};

// You could of course pass the prototype directly into Object.create() without the need to assign it to a variable first, but this looks cleaner and more readable.

const player = Object.create(playerProto); // When calling Object.create, you are required to pass in an object prototype as argument.

console.log(player); // 'player' will inherit the properties from 'playerProto', and 'playerProto' will inherit the properties from the Object prototype. This is an example of prototype chaining

// If you pass 'null' as an argument, the object created will have no prototypes, no properties, and no methods associated with it - not even the Object prototype, which is the highest level prototype.

const nullObj = Object.create(null);
console.log(nullObj);
