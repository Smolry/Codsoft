
let op1 = '';
let op = '';
let op2 = '';

function dis(value) {
    op1 += value;
    updateDisplay();
}

function setop(x) {
    if (op1 === '') return;
    if (op2 !== '') calc();
    op = x;
    op2 = op1;
    op1 = '';
}

function calc() {
    if (op2 === '' || op1 === '' || op === '') return;
    try {
        op1 = eval(`${op2} ${op} ${op1}`);
        op2 = '';
        op = '';
        updateDisplay();
    } catch (error) {
        op1 = 'Error';
        updateDisplay();
    }
}
function clr() {
    op1 = '';
    op2 = '';
    op = '';
    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById('display');
    display.value = op1 || '0';
}
   



