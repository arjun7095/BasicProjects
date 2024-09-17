// script.js

const questions = [
    {
        question: "Which of the following is generally used for performing tasks like creating the structure of the relations, deleting relation?",
        answers: [
            "DML(Data Manipulation Language)",
            "Query",
            "Relational Schema",
            "DDL(Data Definition Language)"
        ],
        correct: "DDL(Data Definition Language)"
    },
    {
        question: "Which of the following provides the ability to query information from the database and insert tuples into, delete tuples from, and modify tuples in the database?",
        answers: [
            "DML(Data Manipulation Language)",
            "DDL(Data Definition Language)",
            "Query",
            "Relational Schema"
        ],
        correct: "DML(Data Manipulation Language)"
    },
    {
        question: "The term 'FAT' is stands for_____",
        answers: [
            'File Allocation Tree',
            'File Allocation Table',
            'File Allocation Graph',
            'All of the above'
        ],
        correct:"File Allocation Table"
    },
    {
        question: " What do you mean by one to many relationships?",
        answers: [
            'One class may have many teachers',
            'One teacher can have many classes',
            'Many classes may have many teachers',
            'Many teachers may have many classes'
        ],
        correct: 'One teacher can have many classes'
    },
    
];

function generateQuiz() {
    const form = document.getElementById('quiz-form');
    questions.forEach((q, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.dataset.index = index; // Add data-index attribute for later use
        
        questionElement.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            ${q.answers.map((answer, i) => `
                <label class="answer">
                    <input type="radio" name="q${index}" value="${answer}">
                    ${answer}
                </label>
            `).join('')}
        `;
        form.appendChild(questionElement);
    });
}

function calculateScore() {
    let score = 0;
    questions.forEach((q, index) => {
        const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === q.correct) {
            score++;
        }
    });
    return score;
}

function showResult() {
    const form = document.getElementById('quiz-form');
    const result = document.getElementById('result');
    const restartButton = document.getElementById('restart-button');
    const unansweredQuestions = [];

    // Clear previous highlights
    document.querySelectorAll('.question').forEach(q => q.classList.remove('highlight'));

    // Check if all questions are answered
    questions.forEach((_, index) => {
        const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
        if (!selectedAnswer) {
            unansweredQuestions.push(index + 1);
            document.querySelector(`.question[data-index="${index}"]`).classList.add('highlight');
        }
    });

    if (unansweredQuestions.length > 0) {
        alert(`Please answer all questions. Unanswered questions: ${unansweredQuestions.join(', ')}`);
        return; // Stop the function if there are unanswered questions
    }

    const score = calculateScore();
    const percentage = (score / questions.length) * 100;

    let feedback = '';
    let feedbackClass = '';
    if (percentage >= 80) {
        feedback = 'Excellent job! You have a strong understanding of DBMS.';
        feedbackClass = 'feedback-excellent';
    } else if (percentage >= 60) {
        feedback = 'Good job! You have a good understanding of DBMS.';
        feedbackClass = 'feedback-good';
    } else if (percentage >= 40) {
        feedback = 'Not bad! You might want to review DBMS basics.';
        feedbackClass = 'feedback-need-review';
    } else {
        feedback = 'Keep practicing! You may need to review DBMS concepts.';
        feedbackClass = 'feedback-review';
    }

    form.style.display = 'none'; // Hide the form
    document.getElementById('submit-button').style.display = 'none'; // Hide the submit button
    document.getElementById('result-message').innerHTML = `
        You scored ${score} out of ${questions.length} questions correctly (${percentage.toFixed(2)}%).<br>
        <span class="feedback-message ${feedbackClass}">${feedback}</span>
    `;
    result.classList.add('visible'); // Show the result
    restartButton.style.display = 'block'; // Show the restart button
}

function restartQuiz() {
    const form = document.getElementById('quiz-form');
    const result = document.getElementById('result');
    const restartButton = document.getElementById('restart-button');
    
    form.style.display = 'block'; // Show the form
    document.getElementById('submit-button').style.display = 'block'; // Show the submit button
    result.classList.remove('visible'); // Hide the result
    restartButton.style.display = 'none'; // Hide the restart button
    
    // Clear the selected answers
    document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false);

    // Remove all highlights
    document.querySelectorAll('.question').forEach(q => q.classList.remove('highlight'));
}

document.getElementById('submit-button').addEventListener('click', showResult);
document.getElementById('restart-button').addEventListener('click', restartQuiz);

// Generate quiz on page load
generateQuiz();