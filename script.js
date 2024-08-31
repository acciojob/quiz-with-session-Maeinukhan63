// List of quiz questions and choices
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Initialize userAnswers from session storage or an empty array
let userAnswers = JSON.parse(sessionStorage.getItem('progress')) || [];

// Function to render questions and choices
function renderQuestions() {
  const questionsElement = document.getElementById('questions');
  questionsElement.innerHTML = ''; // Clear previous content
  questions.forEach((question, i) => {
    const questionElement = document.createElement('div');
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    question.choices.forEach(choice => {
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
    });
    questionsElement.appendChild(questionElement);
  });
}

// Function to save answers to session storage
function saveAnswer(questionIndex, choice) {
  userAnswers[questionIndex] = choice;
  sessionStorage.setItem('progress', JSON.stringify(userAnswers));
}

// Function to calculate and display the score
function calculateScore() {
  let score = 0;
  questions.forEach((question, i) => {
    if (userAnswers[i] === question.answer) {
      score++;
    }
  });
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}`;
  localStorage.setItem('score', score); // Store score in local storage
}

// Event listener for submit button
document.getElementById('submit').addEventListener('click', calculateScore);

// Render questions on page load
renderQuestions();
