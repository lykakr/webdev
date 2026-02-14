// ==========================================
// CLIENT-SIDE BASICS - LESSON SCRIPT
// ==========================================

// Quiz Questions Data
const quizQuestions = [
    {
        question: "Τι σημαίνει η συντομογραφία WWW;",
        options: ["World Wide Web", "World Web Wide", "Web World Wide", "Wide World Web"],
        correct: 0
    },
    {
        question: "Ποιος ζητάει πληροφορίες στο μοντέλο client-server;",
        options: ["Server", "Client", "Database", "Router"],
        correct: 1
    },
    {
        question: "Ποια γλώσσα χρησιμοποιείται για τη ΔΟΜΗ μιας ιστοσελίδας;",
        options: ["CSS", "JavaScript", "HTML", "Python"],
        correct: 2
    },
    {
        question: "Τι κάνει η CSS;",
        options: ["Δομή", "Στυλ/Εμφάνιση", "Διαδραστικότητα", "Βάση δεδομένων"],
        correct: 1
    },
    {
        question: "Ποιο πλήκτρο ανοίγει τα Developer Tools;",
        options: ["F1", "F5", "F12", "F10"],
        correct: 2
    },
    {
        question: "Τι στέλνει ο browser στον server;",
        options: ["Response", "Reply", "Request", "Return"],
        correct: 2
    },
    {
        question: "Ποια γλώσσα προσθέτει διαδραστικότητα στις ιστοσελίδες;",
        options: ["HTML", "CSS", "JavaScript", "XML"],
        correct: 2
    },
    {
        question: "Σε τι μοιάζει η HTML σε ένα σπίτι;",
        options: ["Διακόσμηση", "Σκελετός", "Ηλεκτρολογία", "Έπιπλα"],
        correct: 1
    },
    {
        question: "Τι είναι το URL;",
        options: ["Ένα πρόγραμμα", "Η διεύθυνση μιας ιστοσελίδας", "Ένας server", "Μια γλώσσα"],
        correct: 1
    },
    {
        question: "Ποια καρτέλα DevTools δείχνει το HTML και CSS;",
        options: ["Console", "Network", "Elements", "Sources"],
        correct: 2
    }
];

let userAnswers = new Array(quizQuestions.length).fill(-1);

// ==========================================
// INITIALIZATION - Τρέχει όταν φορτώνει η σελίδα
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('📚 Lesson script loaded!');
    
    // Initialize components
    initDemoButton();
    initCodeTabs();
    initEditor();
    initQuiz();
    initTabNavigation();
    updateScrollProgress();
    
    // Run editor code on load
    setTimeout(runCode, 500);
});

// ==========================================
// QUIZ FUNCTIONS
// ==========================================

function initQuiz() {
    console.log('🎯 Initializing quiz...');
    
    const container = document.getElementById('quiz-container');
    
    if (!container) {
        console.error('❌ Quiz container not found!');
        return;
    }
    
    let html = '';
    
    quizQuestions.forEach((q, index) => {
        html += `
            <div class="quiz-question" id="question-${index}">
                <div class="question-header">
                    <span class="question-number">${index + 1}</span>
                    <span class="question-text">${q.question}</span>
                </div>
                <div class="quiz-options">
                    ${q.options.map((opt, i) => `
                        <label class="quiz-option" id="option-${index}-${i}">
                            <input type="radio" name="question${index}" value="${i}" onchange="selectQuizOption(${index}, ${i})">
                            <span>${opt}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    html += `
        <div class="quiz-submit">
            <button onclick="submitQuiz()" class="btn btn-primary" style="padding: 15px 40px; font-size: 1.1rem;">
                ✅ Υποβολή Quiz
            </button>
        </div>
    `;
    
    container.innerHTML = html;
    console.log('✅ Quiz initialized with ' + quizQuestions.length + ' questions');
}

function selectQuizOption(questionIndex, optionIndex) {
    userAnswers[questionIndex] = optionIndex;
    console.log('Selected:', questionIndex, optionIndex);
    
    // Visual feedback - highlight selected option
    const options = document.querySelectorAll(`#question-${questionIndex} .quiz-option`);
    options.forEach((opt, i) => {
        opt.classList.remove('selected');
        if (i === optionIndex) {
            opt.classList.add('selected');
        }
    });
}

function submitQuiz() {
    console.log('📝 Submitting quiz...');
    console.log('User answers:', userAnswers);
    
    let score = 0;
    
    // Check answers and show correct/incorrect
    quizQuestions.forEach((q, index) => {
        const options = document.querySelectorAll(`#question-${index} .quiz-option`);
        
        options.forEach((opt, i) => {
            opt.classList.remove('correct', 'incorrect', 'selected');
            
            // Mark correct answer
            if (i === q.correct) {
                opt.classList.add('correct');
            }
            
            // Mark user's wrong answer
            if (userAnswers[index] === i && i !== q.correct) {
                opt.classList.add('incorrect');
            }
        });
        
        // Count score
        if (userAnswers[index] === q.correct) {
            score++;
        }
    });
    
    // Hide questions, show results
    document.getElementById('quiz-container').style.display = 'none';
    
    const results = document.getElementById('quiz-results');
    results.style.display = 'block';
    
    document.getElementById('score-number').textContent = score;
    
    // Set message based on score
    const message = document.getElementById('results-message');
    const percentage = (score / quizQuestions.length) * 100;
    
    if (percentage === 100) {
        message.innerHTML = '🏆 Τέλεια! Απάντησες σωστά σε όλες τις ερωτήσεις!';
        message.style.color = '#10b981';
    } else if (percentage >= 80) {
        message.innerHTML = '🎉 Εξαιρετικά! Έχεις κατανοήσει πολύ καλά την ενότητα!';
        message.style.color = '#10b981';
    } else if (percentage >= 60) {
        message.innerHTML = '👍 Καλά! Διάβασε λίγο ακόμα τη θεωρία.';
        message.style.color = '#f59e0b';
    } else {
        message.innerHTML = '📚 Χρειάζεται περισσότερη μελέτη. Ξαναδιάβασε τη θεωρία!';
        message.style.color = '#ef4444';
    }
    
    // Save score to localStorage
    try {
        const studentData = JSON.parse(localStorage.getItem('studentData')) || {};
        studentData.quizScores = studentData.quizScores || {};
        studentData.quizScores['client-side-basics'] = percentage;
        localStorage.setItem('studentData', JSON.stringify(studentData));
        console.log('💾 Score saved:', percentage + '%');
    } catch (e) {
        console.error('Error saving score:', e);
    }
}

function retakeQuiz() {
    // Reset answers
    userAnswers = new Array(quizQuestions.length).fill(-1);
    
    // Hide results, show quiz
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    
    // Reinitialize quiz
    initQuiz();
}

function exportQuizResults() {
    const studentName = localStorage.getItem('studentName') || 'Μαθητής';
    const score = document.getElementById('score-number').textContent;
    const date = new Date().toLocaleDateString('el-GR');
    const time = new Date().toLocaleTimeString('el-GR');
    
    const report = `
===========================================
ΑΠΟΤΕΛΕΣΜΑΤΑ QUIZ - Client-Side Basics
===========================================
Μαθητής: ${studentName}
Ημερομηνία: ${date}
Ώρα: ${time}
-------------------------------------------
Βαθμολογία: ${score}/10 (${score * 10}%)
-------------------------------------------

Απαντήσεις:
${quizQuestions.map((q, i) => {
    const userAnswer = userAnswers[i];
    const isCorrect = userAnswer === q.correct;
    return `${i + 1}. ${q.question}
   Απάντησή σου: ${userAnswer >= 0 ? q.options[userAnswer] : 'Καμία'}
   Σωστή απάντηση: ${q.options[q.correct]}
   ${isCorrect ? '✅ Σωστό' : '❌ Λάθος'}
`;
}).join('\n')}

===========================================
WebDev Learning Hub - Εφαρμογές Πληροφορικής
===========================================
    `;
    
    // Download file
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz_${studentName}_client-side-basics_${date.replace(/\//g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('✅ Τα αποτελέσματα αποθηκεύτηκαν!');
}

// ==========================================
// TAB NAVIGATION
// ==========================================

function initTabNavigation() {
    // Add click handlers to tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.textContent.toLowerCase();
            // Tab switching is handled by onclick in HTML
        });
    });
}

function showTab(tabId) {
    console.log('Switching to tab:', tabId);
    
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Activate clicked button
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // If switching to quiz tab, make sure it's initialized
    if (tabId === 'quiz') {
        const container = document.getElementById('quiz-container');
        if (container && container.innerHTML.trim() === '') {
            initQuiz();
        }
    }
}

// ==========================================
// DEMO BUTTON (Theory Section)
// ==========================================

function initDemoButton() {
    const demoBtn = document.getElementById('demoButton');
    if (demoBtn) {
        demoBtn.addEventListener('click', function() {
            const msg = document.getElementById('demoMessage');
            if (msg) {
                msg.textContent = 'Μπράβο! 🎉';
            }
        });
    }
}

// ==========================================
// CODE TABS (Theory Section)
// ==========================================

function initCodeTabs() {
    // Code tabs in theory section
    const codeTabs = document.querySelectorAll('.code-tab');
    codeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.textContent.toLowerCase() + '-example';
            showCodeTab(tabId);
        });
    });
}

function showCodeTab(tabId) {
    // Hide all code blocks
    document.querySelectorAll('.code-block').forEach(block => {
        block.classList.remove('active');
    });
    
    // Remove active from all tabs
    document.querySelectorAll('.code-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected
    const selectedBlock = document.getElementById(tabId);
    if (selectedBlock) {
        selectedBlock.classList.add('active');
    }
    
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

// ==========================================
// LIVE EDITOR
// ==========================================

function initEditor() {
    console.log('🔧 Initializing editor...');
}

function switchEditorTab(lang) {
    // Hide all panels
    document.querySelectorAll('.editor-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Remove active from all tabs
    document.querySelectorAll('.editor-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected panel
    const panel = document.getElementById('editor-panel-' + lang);
    if (panel) {
        panel.classList.add('active');
    }
    
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

function runCode() {
    const htmlEditor = document.getElementById('html-editor');
    const cssEditor = document.getElementById('css-editor');
    const jsEditor = document.getElementById('js-editor');
    const iframe = document.getElementById('preview-frame');
    
    if (!htmlEditor || !cssEditor || !jsEditor || !iframe) {
        console.log('Editor elements not found');
        return;
    }
    
    const html = htmlEditor.value;
    const css = cssEditor.value;
    const js = jsEditor.value;
    
    // Extract body content
    let bodyContent = html;
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
        bodyContent = bodyMatch[1];
    }
    
    const combinedCode = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>${css}</style>
        </head>
        <body>
            ${bodyContent}
            <script>${js}<\/script>
        </body>
        </html>
    `;
    
    iframe.srcdoc = combinedCode;
}

function resetCode() {
    document.getElementById('html-editor').value = `<!DOCTYPE html>
<html>
<head>
    <title>Η πρώτη μου σελίδα</title>
</head>
<body>
    <h1>Καλώς ήρθες!</h1>
    <p>Αυτή είναι η πρώτη σου ιστοσελίδα.</p>
    
    <button id="myBtn">Κάνε κλικ!</button>
    <p id="result"></p>
</body>
</html>`;

    document.getElementById('css-editor').value = `/* Γράψε CSS εδώ */
body {
    font-family: Arial, sans-serif;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

h1 {
    color: white;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

p {
    color: #f0f0f0;
    font-size: 18px;
}

#myBtn {
    background: #10b981;
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 10px;
    font-size: 18px;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
}

#myBtn:hover {
    transform: scale(1.1);
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
}

#result {
    color: #fbbf24;
    font-size: 24px;
    font-weight: bold;
    margin-top: 20px;
}`;

    document.getElementById('js-editor').value = `// Γράψε JavaScript εδώ
document.getElementById('myBtn').addEventListener('click', function() {
    document.getElementById('result').textContent = '🎉 Μπράβο! Έκανες το πρώτο σου κλικ!';
    
    // Bonus: Αλλαγή χρώματος
    this.style.background = '#f59e0b';
});`;

    runCode();
}

function saveCurrentCode() {
    const studentName = localStorage.getItem('studentName') || 'student';
    const html = document.getElementById('html-editor').value;
    const css = document.getElementById('css-editor').value;
    const js = document.getElementById('js-editor').value;
    
    // Extract body content
    let bodyContent = html;
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
        bodyContent = bodyMatch[1];
    }
    
    const fullCode = `<!DOCTYPE html>
<html lang="el">
<head>
    <meta charset="UTF-8">
    <title>My Code - ${studentName}</title>
    <style>
${css}
    </style>
</head>
<body>
${bodyContent}
    <script>
${js}
    </script>
</body>
</html>`;

    // Save to localStorage
    try {
        const studentData = JSON.parse(localStorage.getItem('studentData')) || {};
        if (!studentData.savedCode) studentData.savedCode = {};
        
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        const codeName = `client-side-basics_${timestamp}`;
        studentData.savedCode[codeName] = fullCode;
        localStorage.setItem('studentData', JSON.stringify(studentData));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
    
    // Download file
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const blob = new Blob([fullCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${studentName}_client-side-basics_${timestamp}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('✅ Ο κώδικάς σου αποθηκεύτηκε!');
}

// ==========================================
// EXERCISES
// ==========================================

function checkMatching() {
    const result = document.getElementById('matching-result');
    result.innerHTML = '✅ Άσκηση σημειώθηκε ως ολοκληρωμένη!';
    result.className = 'exercise-result success';
}

function checkBlanks() {
    const inputs = document.querySelectorAll('.blank-input');
    let correct = 0;
    let total = inputs.length;
    
    inputs.forEach(input => {
        const answer = input.dataset.answer.toLowerCase();
        const value = input.value.trim().toLowerCase();
        
        if (value === answer) {
            input.classList.add('correct');
            input.classList.remove('incorrect');
            correct++;
        } else {
            input.classList.add('incorrect');
            input.classList.remove('correct');
        }
    });
    
    const result = document.getElementById('blanks-result');
    if (correct === total) {
        result.innerHTML = `🎉 Τέλεια! Σωστά ${correct}/${total}!`;
        result.className = 'exercise-result success';
    } else {
        result.innerHTML = `Σωστά ${correct}/${total}. Προσπάθησε ξανά!`;
        result.className = 'exercise-result error';
    }
}

function checkError() {
    const selected = document.querySelector('input[name="error-q1"]:checked');
    const result = document.getElementById('error-result');
    
    if (!selected) {
        result.innerHTML = 'Παρακαλώ επίλεξε μια απάντηση!';
        result.className = 'exercise-result error';
        return;
    }
    
    if (selected.value === 'c') {
        result.innerHTML = '🎉 Σωστά! Η JavaScript χρησιμοποιείται για διαδραστικότητα, όχι μόνο για χρώματα!';
        result.className = 'exercise-result success';
    } else {
        result.innerHTML = '❌ Λάθος! Σκέψου ξανά ποια πρόταση είναι λανθασμένη.';
        result.className = 'exercise-result error';
    }
}

function saveExercises() {
    try {
        const studentData = JSON.parse(localStorage.getItem('studentData')) || {};
        studentData.completedExercises = studentData.completedExercises || [];
        if (!studentData.completedExercises.includes('client-side-basics')) {
            studentData.completedExercises.push('client-side-basics');
        }
        localStorage.setItem('studentData', JSON.stringify(studentData));
        alert('✅ Οι ασκήσεις αποθηκεύτηκαν!');
    } catch (e) {
        console.error('Error saving exercises:', e);
    }
}

function exportExercises() {
    const studentName = localStorage.getItem('studentName') || 'Μαθητής';
    const date = new Date().toLocaleDateString('el-GR');
    
    const report = `
===========================================
ΑΣΚΗΣΕΙΣ - Client-Side Basics
===========================================
Μαθητής: ${studentName}
Ημερομηνία: ${date}
===========================================

Άσκηση 1: Αντιστοίχιση - Ολοκληρώθηκε
Άσκηση 2: Συμπλήρωσε τα κενά - Ολοκληρώθηκε
Άσκηση 3: Βρες το λάθος - Ολοκληρώθηκε

===========================================
WebDev Learning Hub - Εφαρμογές Πληροφορικής
===========================================
    `;
    
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exercises_${studentName}_client-side-basics.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ==========================================
// PROJECTS
// ==========================================

function startProject(projectId) {
    showTab('interactive');
    
    // Wait for tab to switch, then load project
    setTimeout(() => {
        if (projectId === 'digital-card') {
            loadDigitalCardProject();
        } else if (projectId === 'color-picker') {
            loadColorPickerProject();
        } else if (projectId === 'inspector') {
            alert('📋 Για αυτό το project:\n\n1. Άνοιξε 3 αγαπημένες ιστοσελίδες\n2. Πάτα F12 για να ανοίξεις τα DevTools\n3. Εξερεύνησε τον κώδικα τους\n4. Κάνε screenshots και σημειώσεις!');
        }
        runCode();
    }, 100);
}

function loadDigitalCardProject() {
    document.getElementById('html-editor').value = `<!DOCTYPE html>
<html>
<head>
    <title>Η Ψηφιακή μου Κάρτα</title>
</head>
<body>
    <div class="card">
        <h1>Το Όνομά Σου</h1>
        <img src="https://via.placeholder.com/150" alt="Avatar">
        <p>Λίγα λόγια για σένα...</p>
        <h3>Τα χόμπι μου:</h3>
        <ul>
            <li>Χόμπι 1</li>
            <li>Χόμπι 2</li>
            <li>Χόμπι 3</li>
        </ul>
    </div>
</body>
</html>`;

    document.getElementById('css-editor').value = `body {
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    margin: 0;
}

.card {
    background: white;
    padding: 30px;
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    max-width: 350px;
}

.card h1 {
    color: #333;
    margin-bottom: 10px;
}

.card img {
    border-radius: 50%;
    margin: 20px 0;
    border: 4px solid #667eea;
}

.card ul {
    text-align: left;
    padding-left: 20px;
}

.card li {
    padding: 5px 0;
}`;

    document.getElementById('js-editor').value = `// Προαιρετικό: Πρόσθεσε διαδραστικότητα!
console.log('Η κάρτα μου φορτώθηκε! 🎉');`;
}

function loadColorPickerProject() {
    document.getElementById('html-editor').value = `<!DOCTYPE html>
<html>
<head>
    <title>Color Picker</title>
</head>
<body>
    <h1>🎨 Color Picker</h1>
    <p>Κάνε κλικ σε ένα κουμπί!</p>
    
    <div class="buttons">
        <button class="color-btn red">Κόκκινο</button>
        <button class="color-btn green">Πράσινο</button>
        <button class="color-btn blue">Μπλε</button>
        <button class="color-btn yellow">Κίτρινο</button>
        <button class="color-btn purple">Μωβ</button>
    </div>
</body>
</html>`;

    document.getElementById('css-editor').value = `body {
    font-family: Arial, sans-serif;
    text-align: center;
    padding: 50px;
    transition: background 0.5s ease;
    min-height: 100vh;
    margin: 0;
}

h1 { font-size: 2.5rem; }

.buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 30px;
}

.color-btn {
    padding: 15px 30px;
    font-size: 16px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    color: white;
    transition: transform 0.3s;
}

.color-btn:hover { transform: scale(1.1); }

.red { background: #ef4444; }
.green { background: #22c55e; }
.blue { background: #3b82f6; }
.yellow { background: #eab308; color: #333; }
.purple { background: #a855f7; }`;

    document.getElementById('js-editor').value = `// Χρώματα για κάθε κουμπί
const colors = {
    'red': '#ef4444',
    'green': '#22c55e', 
    'blue': '#3b82f6',
    'yellow': '#eab308',
    'purple': '#a855f7'
};

// Πρόσθεσε click event σε κάθε κουμπί
document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Βρες ποιο χρώμα είναι
        const colorClass = this.className.split(' ')[1];
        const color = colors[colorClass];
        
        // Άλλαξε το background
        document.body.style.background = color;
    });
});`;
}

function saveProject() {
    const projectName = document.getElementById('project-name');
    const projectNotes = document.getElementById('project-notes');
    
    if (!projectName || !projectName.value.trim()) {
        alert('Παρακαλώ δώσε όνομα στο project!');
        return;
    }
    
    try {
        const studentData = JSON.parse(localStorage.getItem('studentData')) || {};
        studentData.projects = studentData.projects || [];
        
        studentData.projects.push({
            name: projectName.value.trim(),
            notes: projectNotes ? projectNotes.value : '',
            date: new Date().toISOString(),
            lesson: 'client-side-basics'
        });
        
        localStorage.setItem('studentData', JSON.stringify(studentData));
        
        projectName.value = '';
        if (projectNotes) projectNotes.value = '';
        
        alert('✅ Το project αποθηκεύτηκε!');
    } catch (e) {
        console.error('Error saving project:', e);
    }
}

// ==========================================
// SCROLL PROGRESS
// ==========================================

function updateScrollProgress() {
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        
        const progressBar = document.getElementById('lesson-progress');
        if (progressBar) {
            progressBar.style.width = Math.min(progress, 100) + '%';
        }
    });
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function takeScreenshot() {
    alert('📸 Για screenshot:\n\n• Windows: Win + Shift + S\n• Mac: Cmd + Shift + 4\n\nΉ χρησιμοποίησε το Snipping Tool!');
}

function saveProgress() {
    const studentData = JSON.parse(localStorage.getItem('studentData'));
    if (studentData) {
        const progress = studentData.progress ? studentData.progress['client-side-basics'] || 0 : 0;
        alert('✅ Η πρόοδός σου αποθηκεύεται αυτόματα!\n\nΟλοκληρωμένα: ' + progress + '%');
    } else {
        alert('✅ Η πρόοδός σου αποθηκεύεται αυτόματα!');
    }
}

// Log that script loaded
console.log('✅ Client-side basics script loaded successfully!');

// ==========================================
// DRAG AND DROP FUNCTIONALITY
// ==========================================

let draggedElement = null;

// Initialize drag and drop when page loads
document.addEventListener('DOMContentLoaded', function() {
    initDragAndDrop();
});

function initDragAndDrop() {
    console.log('🎯 Initializing drag and drop...');
    
    // Make items draggable
    const draggableItems = document.querySelectorAll('.draggable-item');
    draggableItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });
    
    // Set up drop zones
    const dropZones = document.querySelectorAll('.drop-zone');
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);
        zone.addEventListener('dragenter', handleDragEnter);
        zone.addEventListener('dragleave', handleDragLeave);
    });
    
    // Also make the original container a drop zone
    const matchingItems = document.querySelector('.matching-items');
    if (matchingItems) {
        matchingItems.addEventListener('dragover', handleDragOver);
        matchingItems.addEventListener('drop', handleDropBack);
        matchingItems.addEventListener('dragenter', handleDragEnter);
        matchingItems.addEventListener('dragleave', handleDragLeave);
    }
}

function handleDragStart(e) {
    draggedElement = e.target;
    e.target.style.opacity = '0.5';
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
}

function handleDragEnd(e) {
    e.target.style.opacity = '';
    
    // Remove all drag-over classes
    document.querySelectorAll('.drag-over').forEach(elem => {
        elem.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    if (e.target.classList.contains('drop-zone') || e.target.classList.contains('matching-items')) {
        e.target.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    if (e.target.classList.contains('drop-zone') || e.target.classList.contains('matching-items')) {
        e.target.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    e.preventDefault();
    
    if (draggedElement && e.target.classList.contains('drop-zone')) {
        // Add the dragged element to this drop zone
        e.target.appendChild(draggedElement);
        e.target.classList.remove('drag-over');
    }
    
    return false;
}

function handleDropBack(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    e.preventDefault();
    
    if (draggedElement && e.target.classList.contains('matching-items')) {
        // Return the dragged element to the original container
        e.target.appendChild(draggedElement);
        e.target.classList.remove('drag-over');
    }
    
    return false;
}

// Updated checkMatching function with actual checking
function checkMatching() {
    const categories = document.querySelectorAll('.category-box');
    let totalCorrect = 0;
    let totalItems = 0;
    
    // Check each category
    categories.forEach(category => {
        const categoryType = category.dataset.category;
        const items = category.querySelectorAll('.draggable-item');
        
        items.forEach(item => {
            totalItems++;
            const itemAnswer = item.dataset.answer;
            
            // Remove previous feedback classes
            item.classList.remove('correct-placement', 'incorrect-placement');
            
            // Check if item is in correct category
            if (itemAnswer === categoryType) {
                item.classList.add('correct-placement');
                totalCorrect++;
            } else {
                item.classList.add('incorrect-placement');
            }
        });
    });
    
    // Show result
    const result = document.getElementById('matching-result');
    
    if (totalItems === 0) {
        result.innerHTML = '⚠️ Παρακαλώ τοποθέτησε τα στοιχεία στις κατηγορίες!';
        result.className = 'exercise-result error';
    } else if (totalCorrect === 6) {
        result.innerHTML = `🎉 Τέλεια! Όλα σωστά! (${totalCorrect}/6)`;
        result.className = 'exercise-result success';
        
        // Save completion
        saveExerciseCompletion('matching');
    } else {
        result.innerHTML = `Σωστά ${totalCorrect}/6. Προσπάθησε ξανά!`;
        result.className = 'exercise-result error';
    }
}

// Function to reset matching exercise
function resetMatching() {
    const matchingItems = document.querySelector('.matching-items');
    const allItems = document.querySelectorAll('.draggable-item');
    
    // Move all items back to original container
    allItems.forEach(item => {
        item.classList.remove('correct-placement', 'incorrect-placement');
        if (matchingItems) {
            matchingItems.appendChild(item);
        }
    });
    
    // Clear result message
    const result = document.getElementById('matching-result');
    if (result) {
        result.innerHTML = '';
        result.className = '';
    }
}

// Save exercise completion
function saveExerciseCompletion(exerciseName) {
    try {
        const studentData = JSON.parse(localStorage.getItem('studentData')) || {};
        studentData.completedExercises = studentData.completedExercises || {};
        
        if (!studentData.completedExercises['client-side-basics']) {
            studentData.completedExercises['client-side-basics'] = [];
        }
        
        if (!studentData.completedExercises['client-side-basics'].includes(exerciseName)) {
            studentData.completedExercises['client-side-basics'].push(exerciseName);
        }
        
        localStorage.setItem('studentData', JSON.stringify(studentData));
        console.log('✅ Exercise completion saved:', exerciseName);
    } catch (e) {
        console.error('Error saving exercise completion:', e);
    }
}