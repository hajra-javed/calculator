// App
const display = document.querySelector('.screen');
const btns = {
    ac: document.querySelector('.ac'),
    digits: document.querySelectorAll('.digit'),
    operators: document.querySelectorAll('.operator'),
    equal: document.querySelector('.equal'),
};

let [a, b, operator] = ['', '', ''];
let expression = '';

btns.ac.addEventListener('click', () => {
    a = '';
    operator = '';
    b = '';
    expression = '';
    display.textContent = '';
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

        } else if (a != '' && b == '') {
            operator = o.textContent
            expression = a + ' ' + ' ' + operator;
        } else {
            // console.log(typeof +a, typeof operator, typeof +b);
            a = operate(operator, a, b);
            operator = o.textContent;
            b = '';
            expression = a + ' ' + ' ' + operator;
        }

        display.textContent = expression;
    });
});

btns.equal.addEventListener('click', () => {
    if (a != '' && operator != '' && b != '') {
        a = operate(operator, a, b);
        operator = '';
        b = '';
        expression = a;
    }
    display.textContent = expression;
});


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
    return Math.round((a / b) * 1000) / 1000;
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