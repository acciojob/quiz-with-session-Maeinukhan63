// Questions data
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

// Function to render questions
function renderQuestions() {
  const questionsElement = document.getElementById('questions');
  questionsElement.innerHTML = ''; // Clear existing questions

  // Loop through each question and create HTML elements
  questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    const questionText = document.createElement('p');
    questionText.textContent = question.question;
    questionDiv.appendChild(questionText);

    question.choices.forEach(choice => {
      const choiceLabel = document.createElement('label');
      const choiceInput = document.createElement('input');
      choiceInput.type = 'radio';
      choiceInput.name = `question-${index}`;
      choiceInput.value = choice;

      // Check if the choice was previously selected
      const savedAnswers = JSON.parse(sessionStorage.getItem('progress')) || [];
      if (savedAnswers[index] === choice) {
        choiceInput.checked = true;
      }

      choiceLabel.appendChild(choiceInput);
      choiceLabel.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(choiceLabel);
      questionDiv.appendChild(document.createElement('br'));
    });

    questionsElement.appendChild(questionDiv);
  });
}

// Function to save progress to session storage
function saveProgress() {
  const answers = [];
  questions.forEach((_, index) => {
    const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
    if (selectedOption) {
      answers[index] = selectedOption.value;
    }
  });
  sessionStorage.setItem('progress', JSON.stringify(answers));
}

// Function to calculate and display the score
function submitQuiz() {
  const savedAnswers = JSON.parse(sessionStorage.getItem('progress')) || [];
  let score = 0;

  questions.forEach((question, index) => {
    const selectedAnswer = savedAnswers[index];
    if (selectedAnswer === question.answer) {
      score++;
    }
  });

  // Display the score
  document.getElementById('score').textContent = `Your score is ${score} out of ${questions.length}.`;

  // Save the score to local storage
  localStorage.setItem('score', score);
}

// Event listener for the submit button
document.getElementById('submit').addEventListener('click', () => {
  saveProgress();
  submitQuiz();
});

// Initial rendering of questions
renderQuestions();
