const questions = [
  { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Logic", "Home Tool Markup Language"], answer: 0 },
  { question: "Which CSS property changes text color?", options: ["font-color", "text-color", "color", "foreground"], answer: 2 },
  { question: "Which keyword declares a constant in JavaScript?", options: ["var", "let", "const", "def"], answer: 2 },
  { question: "What does the '===' operator check?", options: ["Value only", "Type only", "Value and type", "Neither"], answer: 2 },
  { question: "Which method adds an item to the end of an array?", options: ["push()", "pop()", "shift()", "append()"], answer: 0 },
  { question: "What is the correct way to write a comment in JavaScript?", options: ["!-- comment --", "# comment", "// comment", "** comment"], answer: 2 },
  { question: "Which tag is used for a clickable button in HTML?", options: ["click", "btn", "input", "button"], answer: 3 },
  { question: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Syntax", "Colorful Style System"], answer: 1 },
  { question: "Which method removes the last item from an array?", options: ["push()", "pop()", "splice()", "remove()"], answer: 1 },
  { question: "What does 'typeof null' return in JavaScript?", options: ["null", "undefined", "object", "string"], answer: 2 }
];


const startScreen     = document.getElementById('start-screen');
const quizScreen      = document.getElementById('quiz-screen');
const resultScreen    = document.getElementById('result-screen');
const startBtn        = document.getElementById('start-btn');
const restartBtn      = document.getElementById('restart-btn');
const questionText    = document.getElementById('question-text');
const optionsList     = document.getElementById('options-list');
const feedback        = document.getElementById('feedback');
const progressBar     = document.getElementById('progress-bar');
const questionCounter = document.getElementById('question-counter');
const timerBar        = document.getElementById('timer-bar');
const timerText       = document.getElementById('timer-text');
const finalScore      = document.getElementById('final-score');
const highScoreEl     = document.getElementById('high-score');
const newHighBadge    = document.getElementById('new-high-badge');

const TIMER_SECONDS = 15;
const letters = ['A', 'B', 'C', 'D'];

let score = 0;
let timeLeft = 0;
let shuffledQuestions;
let currentIndex;
let timerInterval;


function startQuiz() {
  shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
  score = 0;
  currentIndex = 0;
  quizScreen.style.display = 'block';
  startScreen.style.display = 'none';
  loadQuestion();
}

function loadQuestion() {
  const {question, options, answer} = shuffledQuestions[currentIndex];
  questionText.textContent = question;
  questionCounter.textContent = `${currentIndex + 1} / ${questions.length}`
  progressBar.style.width = (currentIndex + 1 )/ shuffledQuestions.length * 100 + '%'
  optionsList.innerHTML = '';
  options.forEach((option, i) => {
    optionsList.insertAdjacentHTML('beforeend', `
      <li>
        <button class="option-btn" onclick="selectAnswer(${i})">
          <span class="option-letter">${letters[i]}</span>
          ${option}
        </button>
      </li>
    `);
  });
  startTimer();
}

function startTimer() {
  timeLeft = TIMER_SECONDS;
  timerBar.style.background = '';
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    timerText.textContent = timeLeft;
    timerBar.style.width = (timeLeft / TIMER_SECONDS) * 100 + '%';

    if (timeLeft <= 5) {
      timerBar.style.background = 'red';
    }
    if (timeLeft === 0){
      clearInterval(timerInterval);
      nextQuestion();
    }
  }, 1000);
}

function selectAnswer(selectedIndex) {
  clearInterval(timerInterval);
  const {answer} = shuffledQuestions[currentIndex];
  const isCorrect = selectedIndex === answer ? true : false;
  const buttons = document.querySelectorAll('.option-btn');

  if (isCorrect) {
    buttons[selectedIndex].classList.add('correct');
    feedback.textContent = '✓ Correct!';
    feedback.style.color = '#16a34a';
    score++;
  } else {
    buttons[selectedIndex].classList.add('wrong');
    buttons[answer].classList.add('correct');
    feedback.textContent = '✗ Wrong!'
    feedback.style.color = '#dc2626';
  }
  buttons.forEach(btn => btn.disabled = true);
  nextQuestion();
}

function nextQuestion() {
  feedback.style.display = 'block';
  setTimeout(() => {
    currentIndex++
    if (currentIndex < shuffledQuestions.length) {
      loadQuestion();
      feedback.style.display = 'none';
    } else {
      showResults();
    }
  }, 1500);
}

function showResults() {
  const prevBest = parseInt(localStorage.getItem('quizHighScore')) || 0;

  quizScreen.style.display = 'none';
  resultScreen.style.display = 'block';
  finalScore.textContent = score;

  if (score > prevBest) {
    localStorage.setItem('quizHighScore', score);
    newHighBadge.style.display = 'block';
  }

  highScoreEl.textContent = localStorage.getItem('quizHighScore');
}

startBtn.addEventListener('click', () => {
  startQuiz();
});
restartBtn.addEventListener('click', () =>{
  resultScreen.style.display = 'none';
  startQuiz();
});