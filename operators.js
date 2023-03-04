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
    let p = 0;
        for (let i = 0; i < b; i++) {
            p = p + a;
        }
    return p;
}

// Divide
function divide(a, b){
    let p = 0;
    c = a;
    for (let i = 0; i < b; i++) {
        if (c == 0){
            break;
        }
        c = c - b;
        p++;
    }
return p;
}

// Operate
 export default function operate(operator, a, b){
    return operator(a,b);
}