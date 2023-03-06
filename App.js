// App
const display = document.querySelector('.screen');
const btns = {
    ac: document.querySelector('.ac'),
    c: document.querySelector('.c'),
    digits: document.querySelectorAll('.digit'),
    operators: document.querySelectorAll('.operator'),
    point: document.querySelector('.point'),
};

let [a, b, operator, aPoint, bPoint] = ['', '', '', false, false];
let expression = '';

btns.ac.addEventListener('click', () => {
    [a, b, operator, aPoint, bPoint] = ['', '', '', false, false];
    expression = '';
    display.textContent = '';
});

btns.c.addEventListener('click', () => {
    if (a != '' && operator == '') {
        if (a[a.length-1] === '.'){
            aPoint = false;
        }
        a = a.slice(0, -1);
        expression = a;
    } else if (operator != '' && b == '') {
        operator = '';
        expression = a;
    } else if (b != '') {
        if (b[b.length-1] === '.'){
            bPoint = false;
        }
        b = b.slice(0, -1);
        if (b.length == 0) {
            b = '';
        }
        expression = a + ' ' + operator + (b.length ? (' ' + b) : '');
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
        if (a != '' && b == '') {
            if (o.textContent == '='){
                return;
            }
            operator = o.textContent
            expression = a + ' ' + operator;
        } else if (a != '' && b != ''){
            a = operate(operator, a, b);
            if (o.textContent == '=') {
                operator = '';
                expression = a;
            } else {
                operator = o.textContent;
                expression = a + ' ' + operator;
            }
            b = '';
            if (+a === Math.round(+a)){
                aPoint = false;
            }
            bPoint = false;
        } else {
            return;
        }

        display.textContent = expression;
    });
});

btns.point.addEventListener('click', () => {
    if (a == '') {
        a = '0.';
        aPoint = true;
        expression = a;
    } else if (a != '' && operator == '') {
        if (!aPoint) {
            a = a + '.';
            aPoint = true;
            expression = a;
        }
    } else if (operator != '' && b == '') {
        b = '0.';
        bPoint = true;
        expression = a + ' ' + operator + ' ' + b;
    } else {
        if (!bPoint) {
            b = b + '.';
            bPoint = true;
            expression = a + ' ' + operator + ' ' + b;
        }
    }
    display.textContent = expression;
})


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
    return a*b;
}

// Divide
function divide(a, b) {
    return a/b;
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
    return String(Math.round(ans*100000)/100000);
}