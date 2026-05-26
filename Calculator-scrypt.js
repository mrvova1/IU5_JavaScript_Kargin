window.onload = function(){
    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    const outputElement = document.getElementById("result")

    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
        function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if (digit == '.' && a == '') {
                    a += '0';
            }
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                a += digit;
            }
            outputElement.innerHTML = a;
        }
        else {
            if (digit == '.' && b == '') {
                    b += '0';
            }
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit;
                outputElement.innerHTML = b;
            }
        }
    }
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    document.getElementById("btn_op_mult").onclick = function() {
        if (a === '') return;
        selectedOperation = 'x';
        outputElement.innerHTML = 0;
    }
    document.getElementById("btn_op_plus").onclick = function() {
        if (a === '') return;
        selectedOperation = '+';
        outputElement.innerHTML = 0;
    }
    document.getElementById("btn_op_minus").onclick = function() {
        if (a === '') return;
        selectedOperation = '-';
        outputElement.innerHTML = 0;
    }
    document.getElementById("btn_op_div").onclick = function() {
        if (a === '') return;
        selectedOperation = '/';
        outputElement.innerHTML = 0;
    }
        document.getElementById("btn_op_percent").onclick = function() {
        if (a === '') return;
        selectedOperation = '%';
        outputElement.innerHTML = 0;
    }
    document.getElementById("btn_op_clear").onclick = function() {
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }

    document.getElementById("btn_op_equal").onclick = function() {
        if (a === '' || b === '' || !selectedOperation)
            return

        switch(selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
            case '%':
                expressionResult = (+a) * ((+b)/100)
            default:
                break;
        }

        a = expressionResult.toString()
        b = ''
        selectedOperation = null

        outputElement.innerHTML = a
    }

    document.getElementById("btn_op_sign").onclick = function() {
    if(!selectedOperation && a != '0' && a != '') {
        if(a[0] === '-') {
            a = a.slice(1);
            outputElement.innerHTML = a;
        }
        else {
            a = '-' + a;
            outputElement.innerHTML = a;
        }
    }
    else if(b != '0' && b != '') {
       if(b[0] === '-') {
            b = b.slice(1);
            outputElement.innerHTML = b;
        }
        else {
            b = '-' + b;
            outputElement.innerHTML = b;
        }
    }
}
};
