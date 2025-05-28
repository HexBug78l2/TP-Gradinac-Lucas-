const display = document.getElementById('calculator-display');
const historyList = document.getElementById('history-list');
const currentCalculation = document.getElementById('current-calculation');
let fullExpression = '';
let lastResult = '';

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (!isNaN(value) || value === '.') {
            // Chiffres ou virgule
            if (display.value === '0' || display.value === lastResult) {
                display.value = value === '.' ? '0.' : value;
            } else {
                if (value === '.' && display.value.includes('.')) return;
                display.value += value;
            }
        } else if (isOperator(value)) {
            // Opérateurs
            if (display.value === '' && value !== '-') return;
            fullExpression += display.value + ' ' + value + ' ';
            currentCalculation.textContent = fullExpression;
            display.value = '';
        } else if (value === '=') {
            // Calcul
            if (display.value === '') return;
            fullExpression += display.value;
            try {
                let result = evaluateExpression(fullExpression);
                historyList.innerHTML = `<li>${fullExpression} = <strong>${result}</strong></li>` + historyList.innerHTML;
                display.value = result;
                lastResult = result;
            } catch {
                display.value = 'Erreur';
            }
            fullExpression = '';
            currentCalculation.textContent = '';
        } else if (value === 'C') {
            // Clear
            display.value = '';
            fullExpression = '';
            currentCalculation.textContent = '';
        } else if (value === '←') {
            // Backspace
            display.value = display.value.slice(0, -1);
        } else if (value === '²') {
            // Ajoute l'exposant ² à la valeur courante sans calculer
            if (display.value !== '') {
                display.value = display.value + '²';
            }
        } else if (value === '%') {
            // Pourcentage
            if (display.value !== '') {
                display.value = Number(display.value) / 100;
            }
        }
    });
});

function isOperator(char) {
    return ['+', '-', '*', '/', '×', '÷'].includes(char);
}

function evaluateExpression(expression) {
    // Remplace les opérateurs visuels par JS
    expression = expression.replace(/×/g, '*').replace(/÷/g, '/').replace(/,/g, '.');
    // Remplace tous les n² par (n*n)
    expression = expression.replace(/(\d+)²/g, '($1*$1)');
    // Sécurité basique
    if (!/^[\d+\-*/. ()]+$/.test(expression)) throw new Error('Invalid');
    // Évalue
    // eslint-disable-next-line no-eval
    return Number(eval(expression)).toString();
}