// ==========================================
// SUB-PAGES COMMON SCRIPT
// ==========================================

// Tab Navigation
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    if (event && event.target) event.target.classList.add('active');
    
    if (tabId === 'interactive') {
        setTimeout(runCode, 100);
    }
}

// Editor Functions
function runCode() {
    const editor = document.getElementById('code-editor');
    const preview = document.getElementById('preview-frame');
    if (editor && preview) {
        preview.srcdoc = editor.value;
    }
}

function resetEditor() {
    location.reload();
}

function saveCode() {
    const code = document.getElementById('code-editor').value;
    const studentName = localStorage.getItem('studentName') || 'student';
    const pageName = document.title.split('|')[0].trim();
    const timestamp = new Date().toISOString().slice(0,19).replace(/:/g,'-');
    
    const blob = new Blob([code], {type: 'text/html'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${studentName}_${pageName}_${timestamp}.html`;
    a.click();
    
    alert('✅ Αποθηκεύτηκε!');
}

function copyCode(btn) {
    const code = btn.closest('.code-block-wrapper').querySelector('code').textContent;
    navigator.clipboard.writeText(code);
    btn.textContent = '✅ Copied!';
    setTimeout(() => btn.textContent = '📋 Αντιγραφή', 2000);
}

// Exercise Checking
function checkExercise(num) {
    const result = document.getElementById(`result-${num}`);
    
    if (num === 1) {
        const inputs = document.querySelectorAll('.code-input');
        let correct = 0;
        inputs.forEach(input => {
            const ans = input.dataset.answer.toLowerCase();
            const val = input.value.trim().toLowerCase();
            if (val === ans) {
                input.classList.add('correct');
                input.classList.remove('incorrect');
                correct++;
            } else if (val) {
                input.classList.add('incorrect');
                input.classList.remove('correct');
            }
        });
        result.innerHTML = correct === inputs.length ? '🎉 Τέλεια!' : `Σωστά: ${correct}/${inputs.length}`;
        result.className = 'exercise-result ' + (correct === inputs.length ? 'success' : 'error');
    }
    
    if (num === 2 || num === 1) {
        const selects = document.querySelectorAll('.match-select');
        let correct = 0;
        selects.forEach(sel => {
            if (sel.value === sel.dataset.correct) {
                sel.classList.add('correct');
                sel.classList.remove('incorrect');
                correct++;
            } else if (sel.value) {
                sel.classList.add('incorrect');
                sel.classList.remove('correct');
            }
        });
        if (selects.length > 0) {
            result.innerHTML = correct === selects.length ? '🎉 Όλα σωστά!' : `Σωστά: ${correct}/${selects.length}`;
            result.className = 'exercise-result ' + (correct === selects.length ? 'success' : 'error');
        }
    }
}

// Preview Exercises
function previewFormExercise() {
    const code = document.getElementById('form-exercise').value;
    document.getElementById('form-preview').innerHTML = `<iframe srcdoc="${code.replace(/"/g,'&quot;')}" style="width:100%;height:200px;border:1px solid #ddd;border-radius:8px;"></iframe>`;
}

function checkFormExercise() {
    const code = document.getElementById('form-exercise').value.toLowerCase();
    const result = document.getElementById('result-2');
    const has = {
        form: code.includes('<form'),
        input: code.includes('<input'),
        textarea: code.includes('<textarea'),
        button: code.includes('<button') || code.includes('type="submit"')
    };
    const score = Object.values(has).filter(Boolean).length;
    result.innerHTML = score === 4 ? '🎉 Τέλεια φόρμα!' : `Έχεις ${score}/4 στοιχεία`;
    result.className = 'exercise-result ' + (score === 4 ? 'success' : 'error');
}

function previewTableExercise() {
    const code = document.getElementById('table-exercise').value;
    document.getElementById('table-preview').innerHTML = `<iframe srcdoc="<style>table{border-collapse:collapse;width:100%;}th,td{border:1px solid #ddd;padding:8px;}</style>${code.replace(/"/g,'&quot;')}" style="width:100%;height:200px;border:1px solid #ddd;border-radius:8px;"></iframe>`;
}

function checkTableExercise() {
    const code = document.getElementById('table-exercise').value.toLowerCase();
    const result = document.getElementById('result-2');
    const rows = (code.match(/<tr/g) || []).length;
    const cols = (code.match(/<th|<td/g) || []).length;
    const ok = code.includes('<table') && rows >= 4 && cols >= 12;
    result.innerHTML = ok ? '🎉 Σωστός πίνακας!' : `Πίνακας: ${rows} γραμμές, χρειάζεσαι τουλάχιστον 4`;
    result.className = 'exercise-result ' + (ok ? 'success' : 'error');
}

// Quiz Functions
let quizAnswers = [];

function initQuiz(questions) {
    const container = document.getElementById('quiz-container');
    if (!container || !questions) return;
    
    quizAnswers = new Array(questions.length).fill(-1);
    
    container.innerHTML = questions.map((q, i) => `
        <div class="quiz-question">
            <div class="question-header">
                <span class="question-number">${i+1}</span>
                <span class="question-text">${q.question}</span>
            </div>
            <div class="quiz-options">
                ${q.options.map((opt, j) => `
                    <label class="quiz-option" onclick="selectAnswer(${i},${j})">
                        <input type="radio" name="q${i}" value="${j}">
                        <span>${opt}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `).join('') + `<div class="quiz-submit"><button onclick="submitQuiz()" class="btn btn-primary">✅ Υποβολή</button></div>`;
    
    window.currentQuiz = questions;
}

function selectAnswer(q, a) {
    quizAnswers[q] = a;
    document.querySelectorAll(`[name="q${q}"]`).forEach((el, i) => {
        el.closest('.quiz-option').classList.toggle('selected', i === a);
    });
}

function submitQuiz() {
    const questions = window.currentQuiz;
    let score = 0;
    
    questions.forEach((q, i) => {
        const opts = document.querySelectorAll(`[name="q${i}"]`);
        opts.forEach((el, j) => {
            const label = el.closest('.quiz-option');
            label.classList.remove('correct', 'incorrect', 'selected');
            if (j === q.correct) label.classList.add('correct');
            if (quizAnswers[i] === j && j !== q.correct) label.classList.add('incorrect');
        });
        if (quizAnswers[i] === q.correct) score++;
    });
    
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';
    document.getElementById('score-number').textContent = score;
    
    const pct = (score / questions.length) * 100;
    const msg = document.getElementById('results-message');
    msg.innerHTML = pct === 100 ? '🏆 Τέλεια!' : pct >= 60 ? '👍 Καλά!' : '📚 Διάβασε ξανά!';
    msg.style.color = pct >= 60 ? '#10b981' : '#ef4444';
    
    // Save
    try {
        const data = JSON.parse(localStorage.getItem('studentData')) || {};
        data.quizScores = data.quizScores || {};
        const page = document.title.split('|')[0].trim().toLowerCase().replace(/\s+/g, '-');
        data.quizScores[page] = pct;
        localStorage.setItem('studentData', JSON.stringify(data));
    } catch(e) {}
}

function retakeQuiz() {
    quizAnswers = [];
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    initQuiz(window.currentQuiz);
}

// Auto-run code on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(runCode, 300);
});

console.log('✅ Sub-script loaded');