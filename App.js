// App
const display = document.querySelector('.screen');
const btns = {
    ac: document.querySelector('.ac'),
    c: document.querySelector('.c'),
    digits: document.querySelectorAll('.digit'),
    operators: document.querySelectorAll('.operator'),
    // point: document.querySelectorAll('.point'),
};

let [a, b, operator, lastEntered] = ['', '', '', ''];
let expression = '';

btns.ac.addEventListener('click', () => {
    a = '';
    operator = '';
    b = '';
    expression = '';
    display.textContent = '';
});

btns.c.addEventListener('click', () => {
    if (a != '' && operator == '') {
        a = Math.floor(+a / 10);
        if (a === 0) {
            a = '';
        }
        expression = a;
    } else if (operator != '' && b == ''){
        operator = '';
        expression = a;
    } else if (b != ''){
        b = Math.floor(+b / 10);
        if (b === 0) {
            b = '';
        }
        expression = a + ' ' + operator;
    }
    else {
        return;
    }
    display.textContent = expression;
})

btns.digits.forEach(digit => {
    digit.addEventListener('click', () => {
        if (a == '') {
            a = digit.textContent;
        } else if (a != '' && operator == '') {
            a = a + digit.textContent;
        } else {
            if (operator != '' && b == '') {
                b = digit.textContent;
            } else {
                b = b + digit.textContent;
            }
        }
        expression = a + ' ' + operator + ' ' + b;
        display.textContent = expression;
    });
});

btns.operators.forEach(o => {
    o.addEventListener('click', () => {
        if (a == '') {
            return;
        } else if (a != '' && b == '') {
            operator = o.textContent
            expression = a + ' ' + operator;
        } else {
            a = operate(operator, a, b);
            if (o.textContent == '=') {
                operator = '';
                expression = a;
            } else {
                operator = o.textContent;
                expression = a + ' ' + operator;
            }
            b = '';
        }

        display.textContent = expression;
    });
});

// btns.equal.addEventListener('click', () => {
//     if (a != '' && operator != '' && b != '') {
//         a = operate(operator, a, b);
//         operator = '';
//         b = '';
//         expression = a;
//     }
//     display.textContent = expression;
// });


// Add
function add(a, b) {
    return (a + b);
}

// Subtract
function subtract(a, b) {
    return (a - b);
}

// Multiply
function multiply(a, b) {
    return a * b;
}

// Divide
function divide(a, b) {
    return Math.round((a / b) * 100000) / 100000;
}

// Operate
function operate(operator, a, b) {
    let ans;
    if (operator == '+') {
        ans = add(+a, +b);
    } else if (operator == '-') {
        ans = subtract(+a, +b);
    } else if (operator == '*') {
        ans = multiply(+a, +b);
    } else {
        ans = divide(+a, +b);
    }
    return ans;
}