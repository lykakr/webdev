// ==========================================
// HTML LESSON - SCRIPT
// ==========================================

// Quiz Questions for HTML
const quizQuestions = [
    {
        question: "Τι σημαίνει HTML;",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language", 
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Ποιο tag χρησιμοποιούμε για τη μεγαλύτερη επικεφαλίδα;",
        options: ["<header>", "<h6>", "<h1>", "<heading>"],
        correct: 2
    },
    {
        question: "Ποιο tag δημιουργεί σύνδεσμο;",
        options: ["<link>", "<a>", "<href>", "<url>"],
        correct: 1
    },
    {
        question: "Πώς εισάγουμε εικόνα στην HTML;",
        options: [
            "<image src='photo.jpg'>",
            "<img href='photo.jpg'>",
            "<img src='photo.jpg'>",
            "<picture src='photo.jpg'>"
        ],
        correct: 2
    },
    {
        question: "Ποιο attribute είναι υποχρεωτικό για το <img>;",
        options: ["src και alt", "href", "class", "id"],
        correct: 0
    },
    {
        question: "Τι κάνει το <br> tag;",
        options: ["Bold text", "Break/αλλαγή γραμμής", "Border", "Background"],
        correct: 1
    },
    {
        question: "Ποιο tag χρησιμοποιούμε για unordered list;",
        options: ["<list>", "<ol>", "<ul>", "<li>"],
        correct: 2
    },
    {
        question: "Πού γράφουμε τον τίτλο της σελίδας;",
        options: ["<body>", "<title>", "<header>", "<h1>"],
        correct: 1
    },
    {
        question: "Ποιο είναι σωστό HTML5 doctype;",
        options: [
            "<!DOCTYPE HTML5>",
            "<!DOCTYPE html>",
            "<DOCTYPE html>",
            "<!HTML5>"
        ],
        correct: 1
    },
    {
        question: "Τι είναι το semantic HTML;",
        options: [
            "HTML με χρώματα",
            "HTML που περιγράφει το νόημα του περιεχομένου",
            "HTML για κινητά",
            "HTML με animations"
        ],
        correct: 1
    }
];

let userAnswers = new Array(quizQuestions.length).fill(-1);

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('📝 HTML Lesson loaded!');
    initQuiz();
    runHTMLCode();
    initTabNavigation();
    updateScrollProgress();
});

// ==========================================
// TAB NAVIGATION
// ==========================================

function showTab(tabId) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabId).classList.add('active');
    
    // Activate button
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // Track progress
    trackTabVisit(tabId);
}

function initTabNavigation() {
    // Initial tab setup
}

function trackTabVisit(tabId) {
    try {
        const studentData = JSON.parse(localStorage.getItem('studentData')) || {};
        if (!studentData.visitedTabs) studentData.visitedTabs = {};
        if (!studentData.visitedTabs['html']) studentData.visitedTabs['html'] = [];
        
        if (!studentData.visitedTabs['html'].includes(tabId)) {
            studentData.visitedTabs['html'].push(tabId);
        }
        
        // Calculate progress
        const tabs = ['theory', 'interactive', 'exercises', 'quiz', 'projects'];
        const visited = studentData.visitedTabs['html'].length;
        const progress = Math.round((visited / tabs.length) * 100);
        studentData.progress = studentData.progress || {};
        studentData.progress['html'] = progress;
        
        localStorage.setItem('studentData', JSON.stringify(studentData));
    } catch (e) {
        console.error('Error tracking tab:', e);
    }
}

// ==========================================
// HTML EDITOR
// ==========================================

function runHTMLCode() {
    const editor = document.getElementById('html-only-editor');
    const iframe = document.getElementById('html-preview-frame');
    
    if (editor && iframe) {
        iframe.srcdoc = editor.value;
    }
}

function resetHTMLCode() {
    const editor = document.getElementById('html-only-editor');
    editor.value = `<!DOCTYPE html>
<html lang="el">
<head>
    <meta charset="UTF-8">
    <title>Η Σελίδα μου</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: #f0f4f8;
        }
        h1 { color: #2563eb; }
        .highlight { 
            background: #fef3c7; 
            padding: 10px; 
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <h1>Καλώς ήρθες στην HTML!</h1>
    
    <p>Αυτή είναι μια <strong>παράγραφος</strong> με <em>μορφοποίηση</em>.</p>
    
    <h2>Μια λίστα:</h2>
    <ul>
        <li>Στοιχείο 1</li>
        <li>Στοιχείο 2</li>
        <li>Στοιχείο 3</li>
    </ul>
    
    <div class="highlight">
        <p>Αυτό είναι ένα highlighted box!</p>
    </div>
    
    <h2>Ένας σύνδεσμος:</h2>
    <a href="https://www.google.com" target="_blank">Πήγαινε στο Google</a>
    
    <h2>Μια εικόνα:</h2>
    <img src="https://via.placeholder.com/200x100" alt="Placeholder εικόνα">
    
</body>
</html>`;
    runHTMLCode();
}

function openInNewTab() {
    const editor = document.getElementById('html-only-editor');
    const html = editor.value;
    const newWindow = window.open();
    newWindow.document.write(html);
    newWindow.document.close();
}

function insertCode(code) {
    const editor = document.getElementById('html-only-editor');
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const text = editor.value;
    
    editor.value = text.substring(0, start) + code + text.substring(end);
    editor.selectionStart = editor.selectionEnd = start + code.length;
    editor.focus();
    
    runHTMLCode();
}

function copyCode(button) {
    const codeBlock = button.closest('.code-block-wrapper').querySelector('code');
    navigator.clipboard.writeText(codeBlock.textContent);
    
    button.textContent = '✅ Αντιγράφηκε!';
    setTimeout(() => {
        button.textContent = '📋 Αντιγραφή';
    }, 2000);
}

function saveCurrentCode() {
    const studentName = localStorage.getItem('studentName') || 'student';
    const html = document.getElementById('html-only-editor').value;
    
    // Save to localStorage
    try {
        const studentData = JSON.parse(localStorage.getItem('studentData')) || {};
        if (!studentData.savedCode) studentData.savedCode = {};
        
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        const codeName = `html_${timestamp}`;
        studentData.savedCode[codeName] = html;
        localStorage.setItem('studentData', JSON.stringify(studentData));
    } catch (e) {
        console.error('Error saving code:', e);
    }
    
    // Download
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    a.download = `${studentName}_html_${timestamp}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('✅ Ο κώδικας αποθηκεύτηκε!');
}

// ==========================================
// EXERCISES
// ==========================================

function checkCodeExercise(num) {
    const inputs = document.querySelectorAll(`#theory .code-input, .code-exercise .code-input`);
    let correct = 0;
    let total = inputs.length;
    
    inputs.forEach(input => {
        const answer = input.dataset.answer.toLowerCase();
        const value = input.value.trim().toLowerCase();
        
        if (value === answer) {
            input.classList.add('correct');
            input.classList.remove('incorrect');
            correct++;
        } else if (value !== '') {
            input.classList.add('incorrect');
            input.classList.remove('correct');
        }
    });
    
    const result = document.getElementById(`exercise${num}-result`);
    if (correct === total) {
        result.innerHTML = `🎉 Τέλεια! Όλα σωστά!`;
        result.className = 'exercise-result success';
    } else {
        result.innerHTML = `Σωστά ${correct}/${total}. Προσπάθησε ξανά!`;
        result.className = 'exercise-result error';
    }
}

function checkErrorsExercise() {
    const code = document.getElementById('fix-errors-code').value;
    const result = document.getElementById('exercise2-result');
    
    // Check for common fixes
    const fixes = [
        { error: '<htm>', fix: '<html>', found: code.includes('<html') },
        { error: '<title>Test Page<title>', fix: '</title>', found: code.includes('</title>') },
        { error: '<h1>Welcome</h2>', fix: '</h1>', found: code.includes('</h1>') },
        { error: '<p>This is a paragraph', fix: '</p>', found: code.includes('</p>') }
    ];
    
    const fixedCount = fixes.filter(f => f.found).length;
    
    if (fixedCount === 4) {
        result.innerHTML = '🎉 Τέλεια! Διόρθωσες όλα τα λάθη!';
        result.className = 'exercise-result success';
    } else {
        result.innerHTML = `Διόρθωσες ${fixedCount}/4 λάθη. Συνέχισε!`;
        result.className = 'exercise-result error';
    }
}

function showErrorsHint() {
    alert(`💡 Υποδείξεις:
    
1. Κοίτα το opening tag <html>
2. Πώς κλείνει ο τίτλος;
3. Η h1 πρέπει να κλείνει με h1 ή h2;
4. Λείπει κάτι από την παράγραφο;`);
}

function checkMatchingExercise() {
    const selects = document.querySelectorAll('.match-select');
    let correct = 0;
    
    selects.forEach(select => {
        const correctAnswer = select.dataset.correct;
        const selectedValue = select.value;
        
        if (selectedValue === correctAnswer) {
            select.classList.add('correct');
            select.classList.remove('incorrect');
            correct++;
        } else if (selectedValue !== '') {
            select.classList.add('incorrect');
            select.classList.remove('correct');
        }
    });
    
    const result = document.getElementById('exercise3-result');
    if (correct === 4) {
        result.innerHTML = '🎉 Τέλεια! Όλες οι αντιστοιχίσεις σωστές!';
        result.className = 'exercise-result success';
    } else {
        result.innerHTML = `Σωστά ${correct}/4. Προσπάθησε ξανά!`;
        result.className = 'exercise-result error';
    }
}

function previewWriteExercise() {
    const code = document.getElementById('write-html-code').value;
    const preview = document.getElementById('write-preview');
    
    preview.innerHTML = `<iframe srcdoc="${code.replace(/"/g, '&quot;')}" style="width:100%; height:200px; border:1px solid #ddd; border-radius:8px;"></iframe>`;
}

function checkWriteExercise() {
    const code = document.getElementById('write-html-code').value.toLowerCase();
    const result = document.getElementById('exercise4-result');
    
    const requirements = [
        { check: code.includes('<h1>') && code.includes('βιογραφικό'), desc: 'H1 με "Βιογραφικό"' },
        { check: code.includes('<p>'), desc: 'Παράγραφος' },
        { check: code.includes('<ul>') || code.includes('<ol>'), desc: 'Λίστα' },
        { check: (code.match(/<li>/g) || []).length >= 3, desc: '3+ στοιχεία λίστας' }
    ];
    
    const passed = requirements.filter(r => r.check).length;
    
    if (passed === requirements.length) {
        result.innerHTML = '🎉 Εξαιρετικά! Η σελίδα σου έχει όλα τα απαιτούμενα!';
        result.className = 'exercise-result success';
    } else {
        const missing = requirements.filter(r => !r.check).map(r => r.desc);
        result.innerHTML = `Λείπουν: ${missing.join(', ')}`;
        result.className = 'exercise-result error';
    }
}

function saveExercises() {
    try {
        const studentData = JSON.parse(localStorage.getItem('studentData')) || {};
        studentData.completedExercises = studentData.completedExercises || {};
        studentData.completedExercises['html'] = true;
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
ΑΣΚΗΣΕΙΣ HTML - WebDev Learning Hub
===========================================
Μαθητής: ${studentName}
Ημερομηνία: ${date}
===========================================

Άσκηση 1: Συμπλήρωσε τον κώδικα - ✅
Άσκηση 2: Βρες τα λάθη - ✅
Άσκηση 3: Αντιστοίχισε τα tags - ✅
Άσκηση 4: Γράψε HTML - ✅

===========================================
    `;
    
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exercises_${studentName}_html.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ==========================================
// QUIZ
// ==========================================

function initQuiz() {
    const container = document.getElementById('quiz-container');
    if (!container) return;
    
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
}

function selectQuizOption(questionIndex, optionIndex) {
    userAnswers[questionIndex] = optionIndex;
    
    const options = document.querySelectorAll(`#question-${questionIndex} .quiz-option`);
    options.forEach((opt, i) => {
        opt.classList.remove('selected');
        if (i === optionIndex) {
            opt.classList.add('selected');
        }
    });
}

function submitQuiz() {
    let score = 0;
    
    quizQuestions.forEach((q, index) => {
        const options = document.querySelectorAll(`#question-${index} .quiz-option`);
        
        options.forEach((opt, i) => {
            opt.classList.remove('correct', 'incorrect', 'selected');
            
            if (i === q.correct) {
                opt.classList.add('correct');
            }
            
            if (userAnswers[index] === i && i !== q.correct) {
                opt.classList.add('incorrect');
            }
        });
        
        if (userAnswers[index] === q.correct) {
            score++;
        }
    });
    
    document.getElementById('quiz-container').style.display = 'none';
    const results = document.getElementById('quiz-results');
    results.style.display = 'block';
    
    document.getElementById('score-number').textContent = score;
    
    const message = document.getElementById('results-message');
    const percentage = (score / quizQuestions.length) * 100;
    
    if (percentage === 100) {
        message.innerHTML = '🏆 Τέλεια! Είσαι HTML expert!';
        message.style.color = '#10b981';
    } else if (percentage >= 80) {
        message.innerHTML = '🎉 Εξαιρετικά! Κατέχεις την HTML!';
        message.style.color = '#10b981';
    } else if (percentage >= 60) {
        message.innerHTML = '👍 Καλά! Λίγη ακόμα εξάσκηση!';
        message.style.color = '#f59e0b';
    } else {
        message.innerHTML = '📚 Διάβασε ξανά τη θεωρία!';
        message.style.color = '#ef4444';
    }
    
    // Save score
    try {
        const studentData = JSON.parse(localStorage.getItem('studentData')) || {};
        studentData.quizScores = studentData.quizScores || {};
        studentData.quizScores['html'] = percentage;
        localStorage.setItem('studentData', JSON.stringify(studentData));
    } catch (e) {
        console.error('Error saving quiz score:', e);
    }
}

function retakeQuiz() {
    userAnswers = new Array(quizQuestions.length).fill(-1);
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    initQuiz();
}

function exportQuizResults() {
    const studentName = localStorage.getItem('studentName') || 'Μαθητής';
    const score = document.getElementById('score-number').textContent;
    const date = new Date().toLocaleDateString('el-GR');
    
    const report = `
===========================================
QUIZ HTML - Αποτελέσματα
===========================================
Μαθητής: ${studentName}
Ημερομηνία: ${date}
Βαθμολογία: ${score}/10 (${score * 10}%)
===========================================
    `;
    
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz_html_${studentName}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ==========================================
// PROJECTS
// ==========================================

function startHTMLProject(type) {
    showTab('interactive');
    
    setTimeout(() => {
        const editor = document.getElementById('html-only-editor');
        
        if (type === 'personal') {
            editor.value = `<!DOCTYPE html>
<html lang="el">
<head>
    <meta charset="UTF-8">
    <title>Σχετικά με Εμένα</title>
    <style>
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .card {
            background: white;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        h1 { color: #2563eb; text-align: center; }
        img {
            display: block;
            margin: 20px auto;
            border-radius: 50%;
            border: 4px solid #667eea;
        }
        .bio { 
            background: #f0f4f8; 
            padding: 15px; 
            border-radius: 10px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="card">
        <h1>Το Όνομά Σου</h1>
        
        <img src="https://via.placeholder.com/150" alt="Η φωτογραφία μου">
        
        <div class="bio">
            <h2>Λίγα λόγια για μένα</h2>
            <p>Γράψε εδώ μια σύντομη περιγραφή...</p>
        </div>
        
        <h2>Τα χόμπι μου</h2>
        <ul>
            <li>Χόμπι 1</li>
            <li>Χόμπι 2</li>
            <li>Χόμπι 3</li>
        </ul>
        
        <h2>Επικοινωνία</h2>
        <p>Email: <a href="mailto:example@email.com">example@email.com</a></p>
    </div>
</body>
</html>`;
        } else if (type === 'recipe') {
            editor.value = `<!DOCTYPE html>
<html lang="el">
<head>
    <meta charset="UTF-8">
    <title>Συνταγή</title>
    <style>
        body {
            font-family: Georgia, serif;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            background: #fef3c7;
        }
        header {
            text-align: center;
            padding: 20px;
            background: #f59e0b;
            border-radius: 15px;
            color: white;
        }
        .recipe-img {
            width: 100%;
            max-width: 500px;
            display: block;
            margin: 20px auto;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .ingredients, .steps {
            background: white;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }
        th { background: #f59e0b; color: white; }
    </style>
</head>
<body>
    <header>
        <h1>🍳 Όνομα Συνταγής</h1>
        <p>Περιγραφή της συνταγής</p>
    </header>
    
    <img src="https://via.placeholder.com/500x300" alt="Φωτογραφία πιάτου" class="recipe-img">
    
    <div class="ingredients">
        <h2>Υλικά</h2>
        <ul>
            <li>Υλικό 1</li>
            <li>Υλικό 2</li>
            <li>Υλικό 3</li>
        </ul>
    </div>
    
    <div class="steps">
        <h2>Βήματα</h2>
        <ol>
            <li>Πρώτο βήμα...</li>
            <li>Δεύτερο βήμα...</li>
            <li>Τρίτο βήμα...</li>
        </ol>
    </div>
    
    <h2>Διατροφικά Στοιχεία</h2>
    <table>
        <tr>
            <th>Στοιχείο</th>
            <th>Ποσότητα</th>
        </tr>
        <tr>
            <td>Θερμίδες</td>
            <td>350 kcal</td>
        </tr>
        <tr>
            <td>Πρωτεΐνες</td>
            <td>15g</td>
        </tr>
        <tr>
            <td>Υδατάνθρακες</td>
            <td>45g</td>
        </tr>
    </table>
</body>
</html>`;
        } else if (type === 'news') {
            editor.value = `<!DOCTYPE html>
<html lang="el">
<head>
    <meta charset="UTF-8">
    <title>Ειδήσεις</title>
    <style>
        * { box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            margin: 0;
            background: #f0f4f8;
        }
        header {
            background: #1e293b;
            color: white;
            padding: 20px;
        }
        header h1 { margin: 0; }
        nav {
            background: #2563eb;
            padding: 10px 20px;
        }
        nav a {
            color: white;
            text-decoration: none;
            margin-right: 20px;
        }
        nav a:hover { text-decoration: underline; }
        .container {
            display: flex;
            max-width: 1200px;
            margin: 20px auto;
            gap: 20px;
            padding: 0 20px;
        }
        main { flex: 3; }
        aside { flex: 1; }
        article {
            background: white;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        article h2 { color: #2563eb; }
        aside {
            background: white;
            padding: 20px;
            border-radius: 10px;
            height: fit-content;
        }
        footer {
            background: #1e293b;
            color: white;
            text-align: center;
            padding: 20px;
            margin-top: 40px;
        }
    </style>
</head>
<body>
    <header>
        <h1>📰 Daily News</h1>
        <p>Οι ειδήσεις σου κάθε μέρα</p>
    </header>
    
    <nav>
        <a href="#">Αρχική</a>
        <a href="#">Πολιτική</a>
        <a href="#">Αθλητικά</a>
        <a href="#">Τεχνολογία</a>
        <a href="#">Επικοινωνία</a>
    </nav>
    
    <div class="container">
        <main>
            <article>
                <h2>Τίτλος Άρθρου 1</h2>
                <p><small>📅 Σήμερα | ✍️ Συντάκτης</small></p>
                <p>Περιεχόμενο του άρθρου...</p>
                <a href="#">Διαβάστε περισσότερα →</a>
            </article>
            
            <article>
                <h2>Τίτλος Άρθρου 2</h2>
                <p><small>📅 Χθες | ✍️ Συντάκτης</small></p>
                <p>Περιεχόμενο του άρθρου...</p>
                <a href="#">Διαβάστε περισσότερα →</a>
            </article>
            
            <article>
                <h2>Τίτλος Άρθρου 3</h2>
                <p><small>📅 Πριν 2 μέρες | ✍️ Συντάκτης</small></p>
                <p>Περιεχόμενο του άρθρου...</p>
                <a href="#">Διαβάστε περισσότερα →</a>
            </article>
        </main>
        
        <aside>
            <h3>Κατηγορίες</h3>
            <ul>
                <li><a href="#">Πολιτική</a></li>
                <li><a href="#">Οικονομία</a></li>
                <li><a href="#">Αθλητικά</a></li>
                <li><a href="#">Τεχνολογία</a></li>
            </ul>
        </aside>
    </div>
    
    <footer>
        <p>&copy; 2024 Daily News. Όλα τα δικαιώματα κατοχυρωμένα.</p>
        <p>Επικοινωνία: info@dailynews.gr</p>
    </footer>
</body>
</html>`;
        }
        
        runHTMLCode();
    }, 100);
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
            lesson: 'html'
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
// UTILITIES
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

function saveProgress() {
    alert('✅ Η πρόοδός σου αποθηκεύεται αυτόματα!');
}

console.log('✅ HTML lesson script loaded!');