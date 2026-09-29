
/* =====================================================
   INTERVIEWX - STEP 3
   Dynamic Questions + Difficulty
   ===================================================== */


/* ================= QUESTION BANK ================= */

const questionBank = {

  software: {

    easy: [
      "Tell me about yourself and your technical background.",
      "What is HTML and why is it used?",
      "What is CSS used for?",
      "What is JavaScript?",
      "Tell me about a small project you have built."
    ],

    medium: [
      "What is the difference between let, const and var in JavaScript?",
      "Explain the difference between == and === in JavaScript.",
      "What is DOM manipulation?",
      "Explain how you would debug a JavaScript error.",
      "What is the difference between frontend and backend development?"
    ],

    hard: [
      "Explain the JavaScript event loop and asynchronous programming.",
      "How would you optimize the performance of a large web application?",
      "Explain REST APIs and how frontend applications communicate with a backend.",
      "How would you design authentication for a production web application?",
      "How would you debug a memory leak in a web application?"
    ]

  },


  hr: {

    easy: [
      "Tell me about yourself.",
      "What are your biggest strengths?",
      "Why do you want this job?",
      "What are your career goals?",
      "Why should we hire you?"
    ],

    medium: [
      "Tell me about a difficult situation you handled.",
      "How do you handle criticism?",
      "Tell me about a time you worked in a team.",
      "How do you manage multiple deadlines?",
      "What is your biggest professional weakness?"
    ],

    hard: [
      "Tell me about a professional failure and what you learned from it.",
      "Describe a conflict with a teammate and how you resolved it.",
      "Tell me about a decision you made with incomplete information.",
      "How would you handle disagreement with your manager?",
      "Describe a situation where you had to take responsibility for a mistake."
    ]

  },


  marketing: {

    easy: [
      "What is marketing?",
      "Why are you interested in marketing?",
      "What is a target audience?",
      "What is social media marketing?",
      "What makes a good advertisement?"
    ],

    medium: [
      "How would you promote a new product with a limited budget?",
      "How do you measure the success of a marketing campaign?",
      "What makes a marketing campaign successful?",
      "How would you identify a target audience?",
      "How would you improve a campaign that is not performing well?"
    ],

    hard: [
      "Design a marketing strategy for launching a new technology product.",
      "How would you allocate a limited marketing budget across multiple channels?",
      "How would you use customer data to improve campaign performance?",
      "A campaign has high clicks but low conversions. How would you investigate it?",
      "How would you measure the long-term ROI of a marketing campaign?"
    ]

  },


  general: {

    easy: [
      "Tell me about yourself.",
      "What are your biggest strengths?",
      "What are your hobbies?",
      "What are your career goals?",
      "Why should we select you?"
    ],

    medium: [
      "Tell me about a challenge you successfully handled.",
      "How do you handle pressure?",
      "Tell me about a time you worked as part of a team.",
      "How do you manage your time?",
      "What motivates you?"
    ],

    hard: [
      "Tell me about a situation where you changed your opinion after receiving new information.",
      "Describe a difficult decision you had to make.",
      "Tell me about a time you failed and how you recovered.",
      "How do you handle situations where there is no clear solution?",
      "Describe a situation where you had to convince someone who disagreed with you."
    ]

  },


  college: {

    easy: [
      "Tell me about yourself.",
      "Why did you choose your field of study?",
      "What are your strongest skills?",
      "What are your hobbies?",
      "What are your career goals?"
    ],

    medium: [
      "Tell me about a project you have worked on.",
      "What was the biggest challenge in your project?",
      "How do you handle group projects?",
      "What technical skills have you learned?",
      "How do you prepare for placements?"
    ],

    hard: [
      "Explain your most important project as if you were presenting it to an interviewer.",
      "Tell me about a project failure and how you handled it.",
      "Why should a company hire you over another graduate?",
      "How would you approach learning a completely new technology?",
      "Describe a situation where you showed leadership."
    ]

  }

};


/* ================= STATE ================= */

let currentQuestions = [];
let currentQuestion = 0;
let score = 0;

let timerValue = 60;
let timerInterval;


/* ================= START BUTTON ================= */

function startInterview() {

  document
    .getElementById("interview")
    .scrollIntoView({
      behavior: "smooth"
    });

}


/* ================= BEGIN INTERVIEW ================= */

function beginInterview() {

  const type =
    document.getElementById("interviewType").value;

  const difficulty =
    document.getElementById("difficulty").value;


  /*
    Get questions according to:
    Interview Type + Difficulty
  */

  currentQuestions =
    [...questionBank[type][difficulty]];


  currentQuestion = 0;
  score = 0;


  document.getElementById("modeTitle").textContent =
    getModeName(type);


  document
    .getElementById("interviewModal")
    .classList.add("show");


  showQuestion();

}


/* ================= MODE NAME ================= */

function getModeName(type) {

  const names = {

    software: "Software Developer",

    hr: "HR Interview",

    marketing: "Marketing Interview",

    general: "General Interview",

    college: "College / Placement"

  };

  return names[type];

}


/* ================= SHOW QUESTION ================= */

function showQuestion() {

  const question =
    currentQuestions[currentQuestion];


  document.getElementById("questionText").textContent =
    question;


  document.getElementById("answerInput").value =
    "";


  const total =
    currentQuestions.length;


  const number =
    currentQuestion + 1;


  const percentage =
    Math.round((number / total) * 100);


  document.getElementById("questionNumber").textContent =
    `Question ${number} of ${total}`;


  document.getElementById("progressPercent").textContent =
    `${percentage}%`;


  document.getElementById("progressFill").style.width =
    `${percentage}%`;


  startTimer();


  setTimeout(() => {

    document
      .getElementById("answerInput")
      .focus();

  }, 100);

}


/* ================= TIMER ================= */

function startTimer() {

  clearInterval(timerInterval);

  timerValue = 60;

  updateTimer();


  timerInterval = setInterval(() => {

    timerValue--;

    updateTimer();


    if (timerValue <= 0) {

      clearInterval(timerInterval);

      submitAnswer();

    }

  }, 1000);

}


/* ================= UPDATE TIMER ================= */

function updateTimer() {

  const seconds =
    String(timerValue).padStart(2, "0");


  document.getElementById("timer").textContent =
    `00:${seconds}`;

}
/* ================= SUBMIT ANSWER ================= */

function submitAnswer() {

  clearInterval(timerInterval);

  const answer =
    document
      .getElementById("answerInput")
      .value
      .trim();

  if (!answer) {

    alert("Please write an answer first.");

    startTimer();

    return;

  }

  // Analyze the answer
  const result = analyzeAnswer(answer);

  // Add score
  score += result.overall;

  // Move to next question
  if (currentQuestion < currentQuestions.length - 1) {

    currentQuestion++;

    showQuestion();

  } else {

    finishInterview();

  }

}


/* ================= SMART ANSWER ANALYSIS ================= */

function analyzeAnswer(answer) {

  const lowerAnswer =
    answer.toLowerCase();

  const words =
    lowerAnswer
      .split(/\s+/)
      .filter(Boolean);

  const wordCount =
    words.length;


  /* ================= LENGTH SCORE ================= */

  let lengthScore = 20;

  if (wordCount >= 15) {
    lengthScore += 10;
  }

  if (wordCount >= 30) {
    lengthScore += 10;
  }

  if (wordCount >= 50) {
    lengthScore += 10;
  }

  lengthScore =
    Math.min(lengthScore, 50);


  /* ================= STRUCTURE SCORE ================= */

  const structureWords = [

    "first",
    "second",
    "finally",
    "because",
    "however",
    "therefore",
    "also",
    "for example",
    "in addition",
    "as a result"

  ];


  let structureScore = 35;


  structureWords.forEach(word => {

    if (lowerAnswer.includes(word)) {

      structureScore += 5;

    }

  });


  structureScore =
    Math.min(structureScore, 90);


  /* ================= DETAIL SCORE ================= */

  const detailWords = [

    "example",
    "project",
    "experience",
    "result",
    "achieved",
    "improved",
    "developed",
    "worked",
    "learned",
    "solved",
    "implemented",
    "created",
    "managed"

  ];


  let detailScore = 35;


  detailWords.forEach(word => {

    if (words.includes(word)) {

      detailScore += 5;

    }

  });


  detailScore =
    Math.min(detailScore, 90);


  /* ================= RELEVANCE SCORE ================= */

  const currentQuestionText =
    currentQuestions[currentQuestion]
      .toLowerCase();


  const questionWords =
    currentQuestionText
      .split(/\s+/)
      .filter(word => word.length > 3);


  let matchedWords = 0;


  questionWords.forEach(word => {

    if (lowerAnswer.includes(word)) {

      matchedWords++;

    }

  });


  let relevanceScore = 40;


  if (matchedWords >= 1) {

    relevanceScore += 10;

  }

  if (matchedWords >= 2) {

    relevanceScore += 10;

  }

  if (matchedWords >= 3) {

    relevanceScore += 10;

  }


  if (wordCount >= 30) {

    relevanceScore += 10;

  }


  relevanceScore =
    Math.min(relevanceScore, 90);


  /* ================= OVERALL ================= */

  const overall =
    Math.round(

      (
        lengthScore +
        structureScore +
        detailScore +
        relevanceScore

      ) / 4

    );


  return {

    overall: Math.min(overall, 100),

    relevance: relevanceScore,

    structure: structureScore,

    detail: detailScore

  };

}


/* ================= FINISH ================= */

function finishInterview() {

  clearInterval(timerInterval);


  const finalScore =
    Math.min(
      Math.round(
        score / currentQuestions.length
      ),
      100
    );


  document.getElementById("finalScore").textContent =
    finalScore;


  /*
    Approximate category scores
    based on final performance.
  */

  const relevance =
    Math.min(finalScore + 3, 100);

  const structure =
    Math.min(finalScore, 100);

  const detail =
    Math.min(finalScore + 5, 100);


  document.getElementById("relevanceScore").textContent =
    `${relevance}%`;


  document.getElementById("structureScore").textContent =
    `${structure}%`;


  document.getElementById("detailScore").textContent =
    `${detail}%`;


  document.getElementById("finalFeedback").textContent =
    getFeedback(finalScore);


  document
    .getElementById("interviewModal")
    .classList.remove("show");

saveResult(finalScore);
loadDashboard();

  document
    .getElementById("resultModal")
    .classList.add("show");

}


/* ================= FEEDBACK ================= */

function getFeedback(score) {

  if (score >= 85) {

    return "Excellent performance! Your answer was detailed, structured and relevant.";

  }


  if (score >= 70) {

    return "Good performance! Add more specific examples and measurable results to make your answers stronger.";

  }


  if (score >= 50) {

    return "You're on the right track. Try giving more detailed answers and explain your reasoning clearly.";

  }


  return "Keep practicing. Try to give complete answers with examples, reasoning and specific results.";

}

/* ================= CLOSE INTERVIEW ================= */

function closeInterview() {

  clearInterval(timerInterval);

  document
    .getElementById("interviewModal")
    .classList.remove("show");

}


/* ================= CLOSE RESULT ================= */

function closeResult() {

  document
    .getElementById("resultModal")
    .classList.remove("show");

}


/* ================= RESTART ================= */

function restartInterview() {

  document
    .getElementById("resultModal")
    .classList.remove("show");

  beginInterview();

}


/* ================= ESCAPE ================= */

document.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Escape") {

      closeInterview();

      closeResult();

    }

  }
);
/* ================= DASHBOARD ================= */

function loadDashboard() {

  const history =
    JSON.parse(
      localStorage.getItem("interviewHistory") || "[]"
    );

  const totalElement =
    document.getElementById("totalInterviews");

  const averageElement =
    document.getElementById("averageScore");

  const bestElement =
    document.getElementById("bestScore");

  const lastElement =
    document.getElementById("lastScore");

  const historyList =
    document.getElementById("historyList");


  /* ================= EMPTY STATE ================= */

  if (history.length === 0) {

    totalElement.textContent = "0";
    averageElement.textContent = "0";
    bestElement.textContent = "0";
    lastElement.textContent = "0";

    historyList.innerHTML = `
      <div class="empty-history">
        No interview attempts yet.
      </div>
    `;

    return;
  }


  /* ================= TOTAL ================= */

  totalElement.textContent =
    history.length;


  /* ================= SCORES ================= */

  const scores =
    history.map(item => Number(item.score) || 0);


  const total =
    scores.reduce(
      (sum, value) => sum + value,
      0
    );


  const average =
    Math.round(total / scores.length);


  const best =
    Math.max(...scores);


  const last =
    scores[scores.length - 1];


  averageElement.textContent =
    average;

  bestElement.textContent =
    best;

  lastElement.textContent =
    last;


  /* ================= HISTORY LIST ================= */

  historyList.innerHTML = "";


  history
    .slice()
    .reverse()
    .forEach(item => {

      const historyItem =
        document.createElement("div");

      historyItem.className =
        "history-item";


      historyItem.innerHTML = `

        <div class="history-info">

          <strong>
            ${item.type || "Interview"}
          </strong>

          <span>
            ${item.date || "Recent attempt"}
          </span>

        </div>

        <div class="history-score">
          ${item.score}/100
        </div>

      `;


      historyList.appendChild(
        historyItem
      );

    });

}


/* ================= CLEAR HISTORY ================= */

function clearHistory() {

  const confirmDelete =
    confirm(
      "Are you sure you want to clear all interview history?"
    );


  if (!confirmDelete) {
    return;
  }


  localStorage.removeItem(
    "interviewHistory"
  );


  loadDashboard();

}


/* ================= LOAD DASHBOARD ================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    loadDashboard();

  }
);
/* ================= SAVE RESULT ================= */

function saveResult(finalScore) {

  const history =
    JSON.parse(
      localStorage.getItem("interviewHistory") || "[]"
    );

  history.push({

    score: finalScore,

    date: new Date().toLocaleString(),

    type:
      document.getElementById("modeTitle").textContent

  });

  localStorage.setItem(
    "interviewHistory",
    JSON.stringify(history)
  );

}