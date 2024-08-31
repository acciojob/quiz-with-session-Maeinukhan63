// Your JS code here.

const questionsElement = document.getElementById('questions');
const submitButton = document.getElementById('submit');
const scoreElement = document.getElementById('score');

// Initialize userAnswers from session storage or an empty array
let userAnswers = JSON.parse(sessionStorage.getItem('progress')) || [];

// Function to render questions and choices
function renderQuestions() {
  questionsElement.innerHTML = ''; // Clear previous content
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement('div');
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement('input');
      choiceElement.setAttribute('type', 'radio');
      choiceElement.setAttribute('name', `question-${i}`);
      choiceElement.setAttribute('value', choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute('checked', true);
      }
      choiceElement.addEventListener('change', () => saveAnswer(i, choice));
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}

// Function to save answers to session storage
function saveAnswer(questionIndex, choice) {
  userAnswers[questionIndex] = choice;
  sessionStorage.setItem('progress', JSON.stringify(userAnswers));
}

// Function to calculate and display the score
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}`;
  localStorage.setItem('score', score); // Store score in local storage
}

// Event listener for submit button
submitButton.addEventListener('click', calculateScore);

// Render questions on page load
renderQuestions();
