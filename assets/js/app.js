"use strict";

const bill = 142.55;
const numberPeople = 5;
let selectTip = [0.5, 0.1, 0.15, 0.25, 0, 50];

const tip = () => bill * selectTip[2];
const tipAmount = () => tip() / numberPeople;
const total = () => bill / numberPeople + tipAmount();

// console.log(tip());
console.log(tipAmount());
console.log(total());
