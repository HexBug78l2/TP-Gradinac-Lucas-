const display = document.getElementById('calculator-display');
const historyList = document.getElementById('history-list');
const currentCalculation = document.getElementById('current-calculation'); // Zone pour le calcul en cours
let currentInput = '';
let operator = '';
let previousInput = '';
let fullExpression = ''; // Stocke le calcul complet

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'C') {
            currentInput = '';
            operator = '';
            previousInput = '';
            fullExpression = ''; // Réinitialiser le calcul complet
            display.value = '';
            currentCalculation.textContent = ''; // Effacer le calcul en cours
        } else if (value === '=') {
            if (currentInput && previousInput && operator) {
                let result;
                if (operator === '%') {
                    result = (parseFloat(previousInput) * parseFloat(currentInput)) / 100;
                } else {
                    result = eval(`${previousInput} ${operator} ${currentInput}`);
                }
                fullExpression = `${previousInput} ${operator} ${currentInput}`;
                addToHistory(`${fullExpression} = ${result}`); // Ajouter le calcul à l'historique
                display.value = result;
                currentCalculation.textContent = `${fullExpression} =`; // Afficher le calcul complet
                operator = '';
                previousInput = '';
                currentInput = '';
            }
        } else if (['+', '-', '*', '/', '%'].includes(value)) {
            if (currentInput) {
                operator = value;
                previousInput = currentInput;
                currentCalculation.textContent = `${previousInput} ${operator}`; // Mettre à jour le calcul en cours
                currentInput = '';
            }
        } else {
            currentInput += value === ',' ? '.' : value;
            display.value = currentInput;
            currentCalculation.textContent = `${previousInput} ${operator || ''} ${currentInput}`.trim(); // Mettre à jour le calcul en cours
        }
    });
});

// Fonction pour ajouter un calcul à l'historique
function addToHistory(expression) {
    const li = document.createElement('li');
    li.textContent = expression;
    historyList.appendChild(li);
}