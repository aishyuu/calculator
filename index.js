let shouldResetScreen = false;

const numberButtons = document.querySelectorAll('[data-number]');
const equationButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('#equalsBtn');
const pointButton = document.querySelector('#pointBtn');
const lastOperationScreen = document.querySelector('.screenLast');
const currentOperationScreen = document.querySelector('.screenCurrent');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');

function appendNumber(num) {
    if(currentOperationScreen.textContent === '0' || shouldResetScreen) {
        resetScreen();
        shouldResetScreen = false;
    }
    currentOperationScreen.textContent += num
}

function setOperation(op) {
    if(lastOperationScreen.textContent == ""){
        lastOperationScreen.textContent = `${currentOperationScreen.textContent} ${op}`;
        currentOperationScreen.textContent = `0`;
    } else {
        let calculatedValue = calculate();
        lastOperationScreen.textContent = `${calculatedValue} ${op}`
        currentOperationScreen.textContent = `${calculatedValue}`;
    }
    shouldResetScreen = true;
    pointButton.removeAttribute('disabled');
    pointButton.style.cursor = "pointer";
}

function resetScreen() {
    currentOperationScreen.textContent = "";
}

function calculate() {
    let equation = `${lastOperationScreen.textContent} ${currentOperationScreen.textContent}`
    let splitEquation = equation.split(' ');
    switch(splitEquation[1]) {
        case '÷':
            return Number(splitEquation[0]) / Number(splitEquation[2]);
        case '×':
            return Number(splitEquation[0]) * Number(splitEquation[2]);
        case '+':
            return Number(splitEquation[0]) + Number(splitEquation[2]);
        case '−':
            return Number(splitEquation[0]) - Number(splitEquation[2]);
    }
    pointButton.removeAttribute('disabled');
    pointButton.style.cursor = "pointer";
}

equalsButton.addEventListener('click', () => {
    let result = calculate();
    lastOperationScreen.textContent = "";
    currentOperationScreen.textContent = `${result}`
})

numberButtons.forEach((button) => {
    button.addEventListener('click', () => appendNumber(button.textContent))
});

equationButtons.forEach(button => {
    button.addEventListener('click', () => setOperation(button.textContent))
    pointButton.removeAttribute('disabled');
    pointButton.style.cursor = "pointer";
})

clearButton.addEventListener('click', () => {
    if(shouldResetScreen) {
        lastOperationScreen.textContent = "";
    }
    currentOperationScreen.textContent = "0";
    pointButton.removeAttribute('disabled');
    pointButton.style.cursor = "pointer";
});

deleteButton.addEventListener('click', () => {
    let str = currentOperationScreen.textContent;
    str = str.substring(0, str.length - 1);
    if(str == "") {
        currentOperationScreen.textContent = '0'
    } else {
        currentOperationScreen.textContent = str;
    }
})

pointButton.addEventListener('click', () => {
    currentOperationScreen.textContent += '.';
    pointButton.setAttribute('disabled', '');
    pointButton.style.cursor = "default";
})