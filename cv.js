const quizBtn = document.getElementById('quiz-bouton');
const quizContainer = document.getElementById('quiz-container');
const questions = document.querySelectorAll('.quiz-question');

quizBtn.addEventListener('click', () => {
    quizContainer.style.display = 'block';
    quizBtn.style.display = 'none';
});

questions.forEach((question, index) => {
    const options = question.querySelectorAll('.quiz-option');
    const errorMessage = question.querySelector('.error-message');

    options.forEach(option => {
        option.addEventListener('click', () => {
            const isCorrect = option.getAttribute('data-correct') === 'true';
            if (isCorrect) {
                errorMessage.style.display = 'none';
                question.style.display = 'none';
                if (index + 1 < questions.length) {
                    questions[index + 1].style.display = 'block';
                } else {
                    window.location.href = 'contact.html';
                }
            } else {
                errorMessage.style.display = 'block';
            }
        });
    });
});

const navLinks = document.querySelectorAll('.navbar a[data-section]');
const sections = document.querySelectorAll('.section');
const coordonnees = document.getElementById('coordonnees');
const leftSections = document.querySelectorAll('.left-section');
const excludedSections = ['competences', 'interets'];

function showFullCV() {
    sections.forEach(section => {
        if (!excludedSections.includes(section.id)) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });

    leftSections.forEach(section => section.style.display = 'block');

    coordonnees.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', showFullCV);

navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetSection = link.getAttribute('data-section');

        coordonnees.style.display = 'block';

        if (targetSection === 'all') {
            sections.forEach(section => {
                if (!excludedSections.includes(section.id)) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });

            leftSections.forEach(section => section.style.display = 'block');
        } else {
            leftSections.forEach(section => {
                section.style.display = 'none';
            });

            sections.forEach(section => {
                if (section.id === targetSection) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        }
    });
});

const bruteForceBtn = document.getElementById('brute-force-btn');

bruteForceBtn.addEventListener('click', () => {
    bruteForceBtn.style.display = 'none';

    const questions = document.querySelectorAll('.quiz-question');
    let currentQuestionIndex = 0;

    function createClickEffect(element) {
        const rect = element.getBoundingClientRect();
        const effect = document.createElement('div');
        effect.className = 'click-effect';
        effect.style.left = `${rect.left + rect.width / 2}px`;
        effect.style.top = `${rect.top + rect.height / 2}px`;
        effect.style.position = 'absolute';
        document.body.appendChild(effect);

        setTimeout(() => {
            effect.remove();
        }, 500);
    }

    function bruteForceQuestion(questionIndex) {
        if (questionIndex >= questions.length) {
            window.location.href = 'contact.html';
            return;
        }

        const question = questions[questionIndex];
        const options = question.querySelectorAll('.quiz-option');
        const errorMessage = question.querySelector('.error-message');
        let optionIndex = 0;

        function tryOption() {
            if (optionIndex >= options.length) {
                console.error('Aucune réponse correcte trouvée pour la question ' + (questionIndex + 1));
                return;
            }

            const option = options[optionIndex];
            createClickEffect(option);
            option.click();

            setTimeout(() => {
                if (question.style.display === 'none') {
                    bruteForceQuestion(questionIndex + 1);
                } else {
                    errorMessage.style.display = 'block';

                    optionIndex++;
                    tryOption();
                }
            }, 500);
        }
        tryOption();
    }

    bruteForceQuestion(currentQuestionIndex);
});