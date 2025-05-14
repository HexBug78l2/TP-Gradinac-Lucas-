const display = document.getElementById('calculator-display');
const historyList = document.getElementById('history-list');
const currentCalculation = document.getElementById('current-calculation');
let fullExpression = '';

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'C') {
            fullExpression = '';
            display.value = '';
            currentCalculation.textContent = '';
        } else if (value === '←') {
            // Supprimer le dernier caractère
            if (fullExpression.endsWith('²')) {
                fullExpression = fullExpression.slice(0, -1); // Supprimer le carré
            } else {
                fullExpression = fullExpression.slice(0, -1);
            }
            display.value = fullExpression || '0';
            currentCalculation.textContent = fullExpression;
        } else if (value === '=') {
            try {
                const result = evaluateExpression(fullExpression);
                addToHistory(`${fullExpression} = ${result}`);
                display.value = result;
                currentCalculation.textContent = `${fullExpression} =`;
                fullExpression = '';
            } catch (error) {
                display.value = 'Erreur';
            }
        } else if (value === '²') {
            // Ajouter le carré dans l'affichage
            const match = fullExpression.match(/(\d+(\.\d+)?|\.\d+)$/); // Trouver le dernier nombre
            if (match) {
                const number = match[0];
                fullExpression = fullExpression.replace(/(\d+(\.\d+)?|\.\d+)$/, `${number}²`);
                display.value = fullExpression;
                currentCalculation.textContent = fullExpression;
            }
        } else {
            if (isOperator(value)) {
                if (isOperator(fullExpression.slice(-1))) {
                    fullExpression = fullExpression.slice(0, -1);
                }
            }
            if (value === '%') {
                // Si le dernier caractère est un opérateur, traiter % comme modulo
                if (isOperator(fullExpression.slice(-1))) {
                    fullExpression += value;
                } else {
                    // Sinon, traiter % comme un pourcentage
                    fullExpression += '/100';
                }
            } else {
                fullExpression += value === ',' ? '.' : value;
            }
            display.value = fullExpression;
            currentCalculation.textContent = fullExpression;
        }
    });
});

function isOperator(char) {
    return ['+', '-', '*', '/', '%'].includes(char);
}

function evaluateExpression(expression) {
    // Remplacer les carrés (ex: 5²) par Math.pow(5, 2)
    const parsedExpression = expression.replace(/(\d+)²/g, 'Math.pow($1, 2)');
    return new Function(`return ${parsedExpression}`)();
}

function addToHistory(expression) {
    const li = document.createElement('li');
    li.textContent = expression;
    historyList.appendChild(li);
}