// Sélection des éléments du quiz
const quizBtn = document.getElementById('quiz-bouton');
const quizContainer = document.getElementById('quiz-container');
const questions = [
    document.getElementById('question-1'),
    document.getElementById('question-2'),
    document.getElementById('question-3'),
    document.getElementById('question-4')
];
const quizSuccess = document.getElementById('quiz-success');

// Affichage du quiz au clic sur "Me Contacter"
quizBtn.addEventListener('click', () => {
    quizContainer.style.display = 'block';
    quizBtn.style.display = 'none';
    questions[0].style.display = 'block';
});

// Gestion des questions/réponses du quiz
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
                    quizSuccess.style.display = 'block';
                }
            } else {
                errorMessage.style.display = 'block';
            }
        });
    });
});

// Navigation entre les sections du CV
const navLinks = document.querySelectorAll('nav a[data-section]');
const sections = document.querySelectorAll('.section');
const coordonnees = document.getElementById('coordonnees');
const languesBloc = document.getElementById('langues');
const competencesBloc = document.getElementById('competences');
const interetsBloc = document.getElementById('interets');
const interetsList = document.getElementById('interets-list');

function showLeftBlocks(show) {
    if (languesBloc) languesBloc.style.display = show ? 'block' : 'none';
    if (languesBloc && languesBloc.nextElementSibling) languesBloc.nextElementSibling.style.display = show ? 'block' : 'none';

    if (competencesBloc) competencesBloc.style.display = show ? 'block' : 'none';
    if (competencesBloc && competencesBloc.nextElementSibling) competencesBloc.nextElementSibling.style.display = show ? 'block' : 'none';

    if (interetsBloc) interetsBloc.style.display = show ? 'block' : 'none';
    if (interetsList) interetsList.style.display = show ? 'block' : 'none';
}

navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetSection = link.getAttribute('data-section');
        if (coordonnees) coordonnees.style.display = 'block';

        if (targetSection === 'all') {
            sections.forEach(section => {
                if (
                    section.id === 'profil' ||
                    section.id === 'experience' ||
                    section.id === 'formation'
                ) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
            showLeftBlocks(true);
        } else {
            sections.forEach(section => {
                if (section.id === targetSection) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
            showLeftBlocks(false);
        }
    });
});

// Brute force quiz
const bruteForceBtn = document.getElementById('brute-force-btn');
if (bruteForceBtn) {
    bruteForceBtn.addEventListener('click', () => {
        bruteForceBtn.style.display = 'none';

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
}