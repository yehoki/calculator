let firstNumber;
let secondNumber;
let operator;
let prevOperator;
const calculator = document.querySelector("#calculator");
let displayValue = 0;
const display = document.querySelector("#display");
const result = document.querySelector('#result');

// Operation functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0){
    return 'Oops';
  }
  return (a / b).toFixed(5);
}

// Operator deciding function
function operate(firstNumber, secondNumber, operator) {
  switch (operator) {
    case "+":
      return add(firstNumber, secondNumber);
    case "-":
      return subtract(firstNumber, secondNumber);
    case "*":
      return multiply(firstNumber, secondNumber);
    case "/":
      return divide(firstNumber, secondNumber);
    default:
      return "Please select a valid operator";
  }
}

function organiseNumbers(operator) {
    console.log(operator);
    // Clearing operator  
    if (operator === 'clear'){
      console.log('cleared');
      firstNumber = 0;
      secondNumber = undefined;
      operator = undefined;
      prevOperator = undefined;
      displayValue = 0;
      display.textContent = '';
      result.textContent = '';
      return ;
    }
    console.log('second', secondNumber);
    if (firstNumber !== undefined && secondNumber === undefined && operator !== undefined){
        secondNumber = firstNumber;
        firstNumber = undefined;
        result.textContent = secondNumber + ' ' + operator;
        prevOperator = operator;
        operator = undefined;
        display.textContent = '';
        displayValue = 0;
        console.log(firstNumber, secondNumber, operator, prevOperator, 'make second');
    } else if (firstNumber !== undefined && secondNumber !== undefined && operator !== undefined){
        if (operator === '='){
            firstNumber = operate(secondNumber, firstNumber, prevOperator);
            result.textContent = firstNumber;
            secondNumber = undefined;
            display.textContent = '';
            displayValue = 0;
            prevOperator = undefined;
            operator = undefined;
            console.log('equals done');
        }
        else {
            secondNumber = operate(secondNumber, firstNumber, prevOperator);
            result.textContent = secondNumber + ' ' + operator;
            firstNumber = undefined;
            display.textContent = '';
            displayValue = 0;
            prevOperator = operator;
            operator = undefined;
            console.log('operation done');
        }
    } else if(operator !== '=') {
        result.textContent = secondNumber + ' ' + operator;
        prevOperator = operator;
        operator = undefined;
    }
    console.log(firstNumber, secondNumber, operator, prevOperator);
}



// Options corresponding to each button
const options = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  zero: 0,
  add: "+",
  subtract: "-",
  multiply: "*",
  divide: "/",
  equals: "=",
  clear: "clear",
};

// Store display numbers
function displayInput() {
  btns = [...document.querySelectorAll(".btn")];
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (typeof(options[btn.id]) === "number") {
        showNumbers(options[btn.id]);
      } else if (typeof(options[btn.id]) === 'string'){
        operator = options[btn.id];
        organiseNumbers(operator);
      }
    });
  });
}
displayInput();


// Helper function to display the numbers

function showNumbers(number) {
    display.textContent = displayNumbers(displayValue, number);
    displayValue = parseInt(display.textContent);
    firstNumber = displayValue;
}

// Function which displays numbers properly

function displayNumbers(number, nextNumber) {
    if(number === 0 && nextNumber === 0){
        console.log(0, number, nextNumber);
        return '0';
    } else if (number === 0 && nextNumber !== 0){
        console.log(1, number, nextNumber);
        return nextNumber.toString();
    } else {
        console.log(2, number, nextNumber);
        return number.toString() + nextNumber.toString();
    }
}