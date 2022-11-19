const resultScreen = document.getElementById('result');
const inputScreen = document.getElementById('input');
const numPad = document.getElementById('num-pad');

let result = ''; // result
let inputNum1 = '0'; // first number
let inputNum2 = ''; // second number
let inputOp = ''; // operator

createButtons();



function createButtons() {
    const keys = ['clear', 'neg', 'perc', 'div', '7', '8', '9', 'mult', '4', '5', '6', 'sub', '1', '2', '3', 'add', '0', 'dec', 'equal', 'del'];
    keys.forEach(key => {
        // create button
        let button = document.createElement('button');
        button.id = key;
        // set button functionality
        setButtonFunction(button);
        numPad.appendChild(button)
    })
    updateScreens();
}

function setButtonFunction(button) {
    // number buttons
    if (button.id in ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']) {
        button.textContent = button.id;
        button.id = 'number-key';
        button.onclick = () => {number(button.textContent)};
    }

    // addition button
    if (button.id === 'add') {
        button.textContent = '+';
        button.id = 'operator-key';
        button.onclick = () => {operator(button.textContent)};
    }
    // subtraction button
    if (button.id === 'sub') {
        button.textContent = '-';
        button.id = 'operator-key';
        button.onclick = () => {operator(button.textContent)};
    }
    // multiplication button
    if (button.id === 'mult') {
        button.textContent = 'x';
        button.id = 'operator-key';
        button.onclick = () => {operator(button.textContent)};
    }
    // division button
    if (button.id === 'div') {
        button.textContent = '/';
        button.id = 'operator-key';
        button.onclick = () => {operator(button.textContent)};
    }

    // negation button
    if (button.id === 'neg') {
        button.textContent = '+/-';
        button.id = 'operator-key';
        button.onclick = () => {negative()};
    }
    // decimal button
    if (button.id === 'dec') {
        button.textContent = '.';
        button.id = 'number-key';
        button.onclick = () => {decimal()};
    }
    // percent button
    if (button.id === 'perc') {
        button.textContent = '%';
        button.id = 'operator-key';
        button.onclick = () => {percent()};
    }

    // equal button
    if (button.id === 'equal') {
        button.textContent = '=';
        button.id = 'equal-key';
        button.onclick = () => {evaluate()};
    }
    // clear button
    if (button.id === 'clear') {
        button.textContent = 'C';
        button.id = 'delete-key';
        button.onclick = () => {clear()};
    }
    // delete/backspace
    if (button.id === 'del') {
        button.textContent = 'del';
        button.id = 'delete-key';
        button.onclick = () => {backspace()};
    }
}

function number(num) {
    // start first number input
    if (String(inputOp) === '') {inputNum1 += num;}
    // start second number input
    else {inputNum2 += num;}

    // zero can't start non-zero numbers
    if (String(inputNum1).length > 1 && String(inputNum1)[0] === '0') {inputNum1 = String(inputNum1).slice(1);}
    else if (String(inputNum2).length > 1 && String(inputNum2)[0] === '0') {inputNum2 = String(inputNum2).slice(1);}
    // zero can't start negative number
    if (String(inputNum1)[0] === '-' && String(inputNum1)[1] ===  '0') {inputNum1 = '-' + String(inputNum1).slice(2);}
    updateScreens();
}

function operator(op) {
    // evaluate first and second input numbers
    if (String(inputNum2) != '') {evaluate();}
    // only operate if there is a valid first number input
    if (String(inputNum1) != '') {inputOp = op;}
    updateScreens();
}

function evaluate() {
    let answer = 0;
    // don't divide by 0
    if (String(inputOp) === '/' && parseFloat(Number(inputNum2).toFixed(6)) === 0) {return;}
    // single negative, no number
    if (String(inputNum1) === '-') {inputNum1 = '0'}

    // add
    if (inputOp === '+') {answer = Number(inputNum1) + Number(inputNum2);}
    // subtract
    if (inputOp === '-') {answer = Number(inputNum1) - Number(inputNum2);}
    // multiply
    if (inputOp === 'x') {answer = Number(inputNum1) * Number(inputNum2);}
    // divide
    if (inputOp === '/') {answer = Number(inputNum1) / Number(inputNum2);}

    // only evaluating one number
    if (inputNum2 === '' || inputNum2 === '-') {answer = Number(inputNum1);}

    // update result, clear inputs
    result = parseFloat(answer.toFixed(6));
    inputNum1 = result;
    inputNum2 = '';
    inputOp = '';
    updateScreens();
}

function negative() {
    // convert first input number to neg/pos
    if (String(inputOp) === '') {inputNum1 *= -1;}
    // convert second input number to neg/pos
    else if (String(inputNum2) === '') {inputNum2 = '-';}
    else if (String(inputNum2) === '-') {inputNum2 = '';}
    else if (String(inputNum2) != '0') {inputNum2 *= -1;}
    updateScreens();
}

function decimal() {
    // only add one decimal place per number input
    if ((String(inputNum1).includes('.') && inputOp === '') || (String(inputNum2).includes('.') && inputOp != '')) {return;}
    // add decimal to first input number
    if (String(inputOp) === '') {inputNum1 += '.';}
    // add decimal to second input number
    else {inputNum2 += '.';}
    updateScreens();
}

function percent() {
    // convert first input number to percent
    if (String(inputNum1) != '' && String(inputNum2) === '') {inputNum1 = parseFloat((inputNum1 * .01).toFixed(6));}
    // convert second input number to percent
    else {inputNum2 = parseFloat((inputNum2 * .01).toFixed(6));}
    updateScreens();
}

function updateScreens() {
    // update input screen
    inputScreen.textContent = inputNum1 + ' ' + inputOp + ' ' + inputNum2;
    // update result screen
    resultScreen.textContent = result;
}

function clear() {
    inputNum1 = '0';
    inputNum2 = '';
    inputOp = '';
    result = '';
    updateScreens();
}

function backspace() {
    // backspace second input number
    if (inputNum2 != '') {inputNum2 = String(inputNum2).slice(0, -1);}
    // backspace operator
    else if (inputOp != '') {inputOp = '';}
    // backspace first input number
    else if (inputNum1 != '') {inputNum1 = String(inputNum1).slice(0, -1);}
    if (inputNum1 === '') {inputNum1 = '0';}
    updateScreens();
}