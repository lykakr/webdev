// ==========================================
// WEBDEV LEARNING HUB - MAIN JAVASCRIPT
// ==========================================

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    checkStudentName();
    loadProgress();
    initAnimations();
    initUserMenu();
});

// ==========================================
// STUDENT NAME & INITIALIZATION
// ==========================================

function checkStudentName() {
    const studentName = localStorage.getItem('studentName');
    
    if (!studentName) {
        document.getElementById('studentModal').style.display = 'block';
    } else {
        console.log('Καλώς ήρθες πίσω, ' + studentName + '! 🎉');
        updateStudentNameDisplay();
    }
}

function saveStudentName() {
    const nameInput = document.getElementById('studentName');
    const name = nameInput.value.trim();
    
    if (name) {
        localStorage.setItem('studentName', name);
        document.getElementById('studentModal').style.display = 'none';
        initStudentData(name);
        updateStudentNameDisplay();
        alert('Καλώς ήρθες, ' + name + '! Η πρόοδός σου θα αποθηκεύεται αυτόματα. 🚀');
    } else {
        alert('Παρακαλώ εισάγαγε το όνομά σου!');
    }
}

function initStudentData(name) {
    if (!localStorage.getItem('studentData')) {
        const studentData = {
            name: name,
            createdAt: new Date().toISOString(),
            progress: {
                'client-side-basics': 0,
                'html': 0,
                'css': 0,
                'javascript': 0,
                'server-side': 0
            },
            completedLessons: [],
            quizScores: {},
            savedCode: {},
            projects: []
        };
        
        localStorage.setItem('studentData', JSON.stringify(studentData));
    }
}

function updateStudentNameDisplay() {
    const studentName = localStorage.getItem('studentName');
    const nameDisplays = document.querySelectorAll('.student-name-display');
    nameDisplays.forEach(display => {
        display.textContent = studentName || 'Μαθητής';
    });
}

// ==========================================
// CHANGE STUDENT NAME
// ==========================================

function showChangeNameModal() {
    const currentName = localStorage.getItem('studentName') || '';
    
    const modalHTML = `
        <div class="modal" id="changeNameModal" style="display: block;">
            <div class="modal-content">
                <span class="close" onclick="closeModal('changeNameModal')">&times;</span>
                <h2>✏️ Αλλαγή Ονόματος</h2>
                <p>Τρέχον όνομα: <strong>${currentName}</strong></p>
                <input type="text" id="newStudentName" placeholder="Νέο όνομα" value="${currentName}">
                <div class="modal-actions">
                    <button onclick="changeStudentName()" class="btn btn-primary">💾 Αποθήκευση</button>
                    <button onclick="closeModal('changeNameModal')" class="btn btn-secondary">Ακύρωση</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.getElementById('newStudentName').focus();
}

function changeStudentName() {
    const newName = document.getElementById('newStudentName').value.trim();
    
    if (newName) {
        const oldName = localStorage.getItem('studentName');
        localStorage.setItem('studentName', newName);
        
        // Update in studentData too
        const studentData = JSON.parse(localStorage.getItem('studentData')) || {};
        studentData.name = newName;
        studentData.nameHistory = studentData.nameHistory || [];
        studentData.nameHistory.push({
            from: oldName,
            to: newName,
            date: new Date().toISOString()
        });
        localStorage.setItem('studentData', JSON.stringify(studentData));
        
        updateStudentNameDisplay();
        closeModal('changeNameModal');
        alert('✅ Το όνομα άλλαξε σε: ' + newName);
    } else {
        alert('⚠️ Παρακαλώ εισάγαγε ένα όνομα!');
    }
}

// ==========================================
// USER MENU
// ==========================================

function initUserMenu() {
    // Add user menu to all pages
    const navActions = document.querySelector('.nav-actions');
    if (navActions && !document.getElementById('userMenuBtn')) {
        const menuBtn = document.createElement('button');
        menuBtn.id = 'userMenuBtn';
        menuBtn.className = 'btn-icon user-menu-btn';
        menuBtn.innerHTML = '👤';
        menuBtn.title = 'Μενού χρήστη';
        menuBtn.onclick = toggleUserMenu;
        navActions.insertBefore(menuBtn, navActions.firstChild);
    }
}

function toggleUserMenu() {
    let menu = document.getElementById('userDropdownMenu');
    
    if (menu) {
        menu.remove();
        return;
    }
    
    const studentName = localStorage.getItem('studentName') || 'Μαθητής';
    
    const menuHTML = `
        <div id="userDropdownMenu" class="user-dropdown-menu">
            <div class="user-menu-header">
                <span class="user-avatar">👤</span>
                <span class="user-name">${studentName}</span>
            </div>
            <div class="user-menu-items">
                <button onclick="showChangeNameModal(); toggleUserMenu();">
                    <span>✏️</span> Αλλαγή Ονόματος
                </button>
                <button onclick="loadStudentProgress(); toggleUserMenu();">
                    <span>📊</span> Η Πρόοδός μου
                </button>
                <button onclick="showSavedWork(); toggleUserMenu();">
                    <span>💾</span> Αποθηκευμένα
                </button>
                <hr>
                <button onclick="exportAllData(); toggleUserMenu();">
                    <span>📤</span> Εξαγωγή Δεδομένων
                </button>
                <button onclick="showImportModal(); toggleUserMenu();">
                    <span>📥</span> Εισαγωγή Δεδομένων
                </button>
                <button onclick="createBackup(); toggleUserMenu();">
                    <span>💼</span> Δημιουργία Backup
                </button>
                <hr>
                <button onclick="resetAllData(); toggleUserMenu();" class="danger">
                    <span>🗑️</span> Διαγραφή Δεδομένων
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', menuHTML);
    
    // Close menu when clicking outside
    setTimeout(() => {
        document.addEventListener('click', closeUserMenuOnClickOutside);
    }, 100);
}

function closeUserMenuOnClickOutside(e) {
    const menu = document.getElementById('userDropdownMenu');
    const btn = document.getElementById('userMenuBtn');
    
    if (menu && !menu.contains(e.target) && e.target !== btn) {
        menu.remove();
        document.removeEventListener('click', closeUserMenuOnClickOutside);
    }
}

// ==========================================
// EXPORT ALL DATA
// ==========================================

function exportAllData() {
    const studentName = localStorage.getItem('studentName') || 'student';
    const studentData = JSON.parse(localStorage.getItem('studentData')) || {};
    
    const exportData = {
        exportDate: new Date().toISOString(),
        exportVersion: '1.0',
        studentName: studentName,
        studentData: studentData
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    const date = new Date().toISOString().slice(0, 10);
    a.download = `webdev-hub-export_${studentName}_${date}.json`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('✅ Τα δεδομένα εξήχθησαν επιτυχώς!');
}

// ==========================================
// IMPORT DATA
// ==========================================

function showImportModal() {
    const modalHTML = `
        <div class="modal" id="importModal" style="display: block;">
            <div class="modal-content">
                <span class="close" onclick="closeModal('importModal')">&times;</span>
                <h2>📥 Εισαγωγή Δεδομένων</h2>
                <p>Επίλεξε ένα αρχείο backup (.json) για να επαναφέρεις τα δεδομένα σου:</p>
                
                <div class="file-upload-area" id="dropArea">
                    <input type="file" id="importFile" accept=".json" onchange="handleFileSelect(event)" hidden>
                    <label for="importFile" class="file-upload-label">
                        <span class="upload-icon">📁</span>
                        <span>Κάνε κλικ ή σύρε ένα αρχείο εδώ</span>
                    </label>
                </div>
                
                <div id="importPreview" class="import-preview" style="display: none;">
                    <h4>Προεπισκόπηση:</h4>
                    <div id="previewContent"></div>
                </div>
                
                <div class="modal-actions">
                    <button id="confirmImportBtn" onclick="confirmImport()" class="btn btn-primary" disabled>
                        ✅ Επιβεβαίωση Εισαγωγής
                    </button>
                    <button onclick="closeModal('importModal')" class="btn btn-secondary">Ακύρωση</button>
                </div>
                
                <div class="import-warning">
                    ⚠️ Προσοχή: Η εισαγωγή θα αντικαταστήσει τα τρέχοντα δεδομένα σου!
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    initDragDropImport();
}

let importedData = null;

function initDragDropImport() {
    const dropArea = document.getElementById('dropArea');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.add('drag-over'), false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.remove('drag-over'), false);
    });
    
    dropArea.addEventListener('drop', handleDrop, false);
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function handleDrop(e) {
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        processFile(files[0]);
    }
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        processFile(file);
    }
}

function processFile(file) {
    if (!file.name.endsWith('.json')) {
        alert('⚠️ Παρακαλώ επίλεξε ένα αρχείο .json');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            importedData = JSON.parse(e.target.result);
            showImportPreview(importedData);
        } catch (error) {
            alert('❌ Σφάλμα ανάγνωσης αρχείου. Βεβαιώσου ότι είναι έγκυρο JSON.');
        }
    };
    reader.readAsText(file);
}

function showImportPreview(data) {
    const preview = document.getElementById('importPreview');
    const content = document.getElementById('previewContent');
    
    const studentData = data.studentData || {};
    const progressItems = Object.entries(studentData.progress || {})
        .map(([key, value]) => `<li>${formatModuleName(key)}: ${value}%</li>`)
        .join('');
    
    content.innerHTML = `
        <p><strong>Όνομα:</strong> ${data.studentName || 'Άγνωστο'}</p>
        <p><strong>Ημ/νία Export:</strong> ${new Date(data.exportDate).toLocaleDateString('el-GR')}</p>
        <p><strong>Πρόοδος:</strong></p>
        <ul>${progressItems || '<li>Καμία</li>'}</ul>
        <p><strong>Ολοκληρωμένα Quiz:</strong> ${Object.keys(studentData.quizScores || {}).length}</p>
        <p><strong>Αποθηκευμένος Κώδικας:</strong> ${Object.keys(studentData.savedCode || {}).length} αρχεία</p>
    `;
    
    preview.style.display = 'block';
    document.getElementById('confirmImportBtn').disabled = false;
}

function confirmImport() {
    if (!importedData) {
        alert('⚠️ Δεν υπάρχουν δεδομένα για εισαγωγή!');
        return;
    }
    
    if (confirm('⚠️ Είσαι σίγουρος; Τα τρέχοντα δεδομένα θα αντικατασταθούν!')) {
        localStorage.setItem('studentName', importedData.studentName || 'Μαθητής');
        localStorage.setItem('studentData', JSON.stringify(importedData.studentData || {}));
        
        updateStudentNameDisplay();
        closeModal('importModal');
        
        alert('✅ Τα δεδομένα εισήχθησαν επιτυχώς! Η σελίδα θα ανανεωθεί.');
        location.reload();
    }
}

// ==========================================
// BACKUP
// ==========================================

function createBackup() {
    const studentName = localStorage.getItem('studentName') || 'student';
    const studentData = JSON.parse(localStorage.getItem('studentData')) || {};
    
    const backup = {
        backupType: 'full',
        backupDate: new Date().toISOString(),
        backupVersion: '1.0',
        application: 'WebDev Learning Hub',
        data: {
            studentName: studentName,
            studentData: studentData,
            allLocalStorage: {}
        }
    };
    
    // Include all localStorage items
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        backup.data.allLocalStorage[key] = localStorage.getItem(key);
    }
    
    const dataStr = JSON.stringify(backup, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    const date = new Date().toISOString().slice(0, 10);
    const time = new Date().toTimeString().slice(0, 5).replace(':', '-');
    a.download = `backup_${studentName}_${date}_${time}.json`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Save backup date
    studentData.lastBackup = new Date().toISOString();
    localStorage.setItem('studentData', JSON.stringify(studentData));
    
    alert('✅ Backup δημιουργήθηκε επιτυχώς!\n\nΦύλαξε αυτό το αρχείο σε ασφαλές μέρος.');
}

// ==========================================
// RESET DATA
// ==========================================

function resetAllData() {
    if (confirm('⚠️ ΠΡΟΣΟΧΗ!\n\nΘα διαγραφούν ΟΛΕΣ οι πληροφορίες σου:\n- Πρόοδος\n- Αποτελέσματα Quiz\n- Αποθηκευμένος κώδικας\n- Projects\n\nΕίσαι σίγουρος;')) {
        if (confirm('🚨 Τελευταία ευκαιρία!\n\nΘέλεις να κάνεις backup πριν τη διαγραφή;')) {
            createBackup();
        }
        
        localStorage.removeItem('studentName');
        localStorage.removeItem('studentData');
        
        alert('✅ Τα δεδομένα διαγράφηκαν. Η σελίδα θα ανανεωθεί.');
        location.reload();
    }
}

// ==========================================
// SCREENSHOT FUNCTIONALITY
// ==========================================

async function takeFullScreenshot() {
    // Show loading
    showLoadingOverlay('📸 Λήψη screenshot...');
    
    try {
        // Check if html2canvas is loaded
        if (typeof html2canvas === 'undefined') {
            // Load html2canvas dynamically
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
        }
        
        const canvas = await html2canvas(document.body, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
        });
        
        // Convert to blob and download
        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            
            const studentName = localStorage.getItem('studentName') || 'student';
            const date = new Date().toISOString().slice(0, 10);
            const time = new Date().toTimeString().slice(0, 5).replace(':', '-');
            const pageName = document.title.split(' - ')[0] || 'page';
            
            a.download = `screenshot_${studentName}_${pageName}_${date}_${time}.png`;
            
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            hideLoadingOverlay();
            showNotification('✅ Screenshot αποθηκεύτηκε!', 'success');
        }, 'image/png');
        
    } catch (error) {
        console.error('Screenshot error:', error);
        hideLoadingOverlay();
        alert('❌ Σφάλμα κατά τη λήψη screenshot. Δοκίμασε: Win+Shift+S (Windows) ή Cmd+Shift+4 (Mac)');
    }
}

// ==========================================
// EXPORT TO PDF
// ==========================================

async function exportToPDF() {
    // Show loading
    showLoadingOverlay('📄 Δημιουργία PDF...');
    
    try {
        // Check if libraries are loaded
        if (typeof html2canvas === 'undefined') {
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
        }
        if (typeof jspdf === 'undefined' && typeof window.jspdf === 'undefined') {
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
        }
        
        const { jsPDF } = window.jspdf;
        
        // Capture the page
        const canvas = await html2canvas(document.body, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
        });
        
        const imgData = canvas.toDataURL('image/png');
        
        // Calculate dimensions
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        let heightLeft = imgHeight;
        let position = 0;
        
        // Add first page
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        // Add more pages if needed
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        // Save PDF
        const studentName = localStorage.getItem('studentName') || 'student';
        const date = new Date().toISOString().slice(0, 10);
        const pageName = document.title.split(' - ')[0] || 'page';
        
        pdf.save(`${studentName}_${pageName}_${date}.pdf`);
        
        hideLoadingOverlay();
        showNotification('✅ PDF αποθηκεύτηκε!', 'success');
        
    } catch (error) {
        console.error('PDF error:', error);
        hideLoadingOverlay();
        
        // Fallback to print
        if (confirm('❌ Σφάλμα δημιουργίας PDF.\n\nΘέλεις να χρησιμοποιήσεις την εκτύπωση του browser;')) {
            window.print();
        }
    }
}

// Alternative: Simple print to PDF using browser
function printPage() {
    window.print();
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function showLoadingOverlay(message) {
    const overlay = document.createElement('div');
    overlay.id = 'loadingOverlay';
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(overlay);
}

function hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.remove();
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `<span>${message}</span>`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==========================================
// PROGRESS TRACKING
// ==========================================

function loadProgress() {
    const studentData = JSON.parse(localStorage.getItem('studentData'));
    
    if (!studentData) return;
    
    const progressBars = document.querySelectorAll('.module-card .progress-fill');
    const progressTexts = document.querySelectorAll('.module-card .progress-text');
    
    const modules = ['client-side-basics', 'html', 'css', 'javascript', 'server-side'];
    
    modules.forEach((module, index) => {
        if (progressBars[index] && studentData.progress && studentData.progress[module]) {
            const progress = studentData.progress[module];
            progressBars[index].style.width = progress + '%';
            if (progressTexts[index]) {
                progressTexts[index].textContent = progress + '% Ολοκληρωμένο';
            }
        }
    });
}

function updateProgress(module, percentage) {
    const studentData = JSON.parse(localStorage.getItem('studentData'));
    
    if (studentData) {
        studentData.progress[module] = percentage;
        localStorage.setItem('studentData', JSON.stringify(studentData));
        loadProgress();
    }
}

function markLessonComplete(lessonId) {
    const studentData = JSON.parse(localStorage.getItem('studentData'));
    
    if (studentData && !studentData.completedLessons.includes(lessonId)) {
        studentData.completedLessons.push(lessonId);
        studentData.lastActivity = new Date().toISOString();
        localStorage.setItem('studentData', JSON.stringify(studentData));
        console.log('✅ Μάθημα ολοκληρώθηκε: ' + lessonId);
    }
}

// ==========================================
// STUDENT PROGRESS MODAL
// ==========================================

function loadStudentProgress() {
    const studentData = JSON.parse(localStorage.getItem('studentData'));
    
    if (!studentData) {
        alert('Δεν βρέθηκαν δεδομένα προόδου!');
        return;
    }
    
    const progressHTML = `
        <div class="modal" id="progressModal" style="display: block;">
            <div class="modal-content modal-large">
                <span class="close" onclick="closeModal('progressModal')">&times;</span>
                <h2>📊 Η Πρόοδός σου, ${studentData.name || localStorage.getItem('studentName')}!</h2>
                
                <div class="progress-summary">
                    <div class="summary-stats">
                        <div class="stat-box">
                            <span class="stat-value">${studentData.completedLessons ? studentData.completedLessons.length : 0}</span>
                            <span class="stat-label">Μαθήματα</span>
                        </div>
                        <div class="stat-box">
                            <span class="stat-value">${Object.keys(studentData.quizScores || {}).length}</span>
                            <span class="stat-label">Quiz</span>
                        </div>
                        <div class="stat-box">
                            <span class="stat-value">${Object.keys(studentData.savedCode || {}).length}</span>
                            <span class="stat-label">Κώδικας</span>
                        </div>
                        <div class="stat-box">
                            <span class="stat-value">${(studentData.projects || []).length}</span>
                            <span class="stat-label">Projects</span>
                        </div>
                    </div>
                    
                    <div class="module-progress-list">
                        <h4>Πρόοδος ανά Ενότητα:</h4>
                        ${Object.keys(studentData.progress || {}).map(module => `
                            <div class="progress-item">
                                <span class="progress-module-name">${formatModuleName(module)}</span>
                                <div class="progress-bar-container">
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${studentData.progress[module]}%"></div>
                                    </div>
                                    <span class="progress-percentage">${studentData.progress[module]}%</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="quiz-scores-section">
                        <h4>Αποτελέσματα Quiz:</h4>
                        ${Object.keys(studentData.quizScores || {}).length > 0 ? 
                            Object.keys(studentData.quizScores).map(quiz => `
                                <div class="quiz-score-item">
                                    <span>${formatModuleName(quiz)}</span>
                                    <span class="quiz-score ${studentData.quizScores[quiz] >= 80 ? 'good' : 'needs-work'}">${studentData.quizScores[quiz]}%</span>
                                </div>
                            `).join('') : 
                            '<p class="no-data">Δεν έχεις ολοκληρώσει κάποιο quiz ακόμα.</p>'
                        }
                    </div>
                    
                    <div class="progress-actions">
                        <button onclick="exportProgress()" class="btn btn-primary">
                            📥 Εξαγωγή Αναφοράς
                        </button>
                        <button onclick="closeModal('progressModal')" class="btn btn-secondary">
                            Κλείσιμο
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', progressHTML);
}

function formatModuleName(module) {
    const names = {
        'client-side-basics': '🎨 Client-Side Basics',
        'html': '📝 HTML',
        'css': '🎨 CSS',
        'javascript': '⚡ JavaScript',
        'server-side': '🖥️ Server-Side'
    };
    return names[module] || module;
}

// ==========================================
// SAVED WORK
// ==========================================

function showSavedWork() {
    const studentData = JSON.parse(localStorage.getItem('studentData'));
    
    if (!studentData || Object.keys(studentData.savedCode || {}).length === 0) {
        alert('Δεν έχεις αποθηκευμένο κώδικα ακόμα!');
        return;
    }
    
    const savedHTML = `
        <div class="modal" id="savedModal" style="display: block;">
            <div class="modal-content modal-large">
                <span class="close" onclick="closeModal('savedModal')">&times;</span>
                <h2>💾 Αποθηκευμένος Κώδικας</h2>
                
                <div class="saved-list">
                    ${Object.keys(studentData.savedCode).map(key => `
                        <div class="saved-item">
                            <div class="saved-item-header">
                                <h4>📄 ${key}</h4>
                                <div class="saved-item-actions">
                                    <button onclick="previewCode('${key}')" class="btn btn-small btn-secondary">
                                        👁️ Προβολή
                                    </button>
                                    <button onclick="downloadCode('${key}')" class="btn btn-small btn-primary">
                                        📥 Κατέβασμα
                                    </button>
                                    <button onclick="deleteCode('${key}')" class="btn btn-small btn-danger">
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', savedHTML);
}

function previewCode(name) {
    const studentData = JSON.parse(localStorage.getItem('studentData'));
    if (studentData && studentData.savedCode[name]) {
        const code = studentData.savedCode[name];
        const win = window.open('', '_blank');
        win.document.write(code);
        win.document.close();
    }
}

function downloadCode(name) {
    const studentData = JSON.parse(localStorage.getItem('studentData'));
    
    if (studentData && studentData.savedCode[name]) {
        const code = studentData.savedCode[name];
        const blob = new Blob([code], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name + '.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

function deleteCode(name) {
    if (confirm(`Θέλεις σίγουρα να διαγράψεις το "${name}";`)) {
        const studentData = JSON.parse(localStorage.getItem('studentData'));
        if (studentData && studentData.savedCode) {
            delete studentData.savedCode[name];
            localStorage.setItem('studentData', JSON.stringify(studentData));
            closeModal('savedModal');
            showSavedWork();
        }
    }
}

// ==========================================
// EXPORT PROGRESS REPORT
// ==========================================

function exportProgress() {
    const studentName = localStorage.getItem('studentName') || 'Μαθητής';
    const studentData = JSON.parse(localStorage.getItem('studentData'));
    
    if (!studentData) {
        alert('Δεν υπάρχουν δεδομένα για εξαγωγή!');
        return;
    }
    
    const date = new Date().toLocaleDateString('el-GR');
    const time = new Date().toLocaleTimeString('el-GR');
    
    const progressReport = `
╔═══════════════════════════════════════════════════════════╗
║          ΑΝΑΦΟΡΑ ΠΡΟΟΔΟΥ - WebDev Learning Hub            ║
╠═══════════════════════════════════════════════════════════╣
║  Μαθητής: ${studentName.padEnd(45)}║
║  Ημερομηνία: ${date.padEnd(43)}║
║  Ώρα: ${time.padEnd(50)}║
╠═══════════════════════════════════════════════════════════╣
║                    ΠΡΟΟΔΟΣ ΑΝΑ ΕΝΟΤΗΤΑ                    ║
╠═══════════════════════════════════════════════════════════╣
${Object.keys(studentData.progress || {}).map(module => 
    `║  ${formatModuleName(module).padEnd(30)} ${(studentData.progress[module] + '%').padStart(5)}             ║`
).join('\n')}
╠═══════════════════════════════════════════════════════════╣
║                  ΑΠΟΤΕΛΕΣΜΑΤΑ QUIZ                        ║
╠═══════════════════════════════════════════════════════════╣
${Object.keys(studentData.quizScores || {}).length > 0 ?
    Object.keys(studentData.quizScores).map(quiz => 
        `║  ${formatModuleName(quiz).padEnd(30)} ${(studentData.quizScores[quiz] + '%').padStart(5)}             ║`
    ).join('\n') :
    '║  Δεν υπάρχουν αποτελέσματα quiz                          ║'
}
╠═══════════════════════════════════════════════════════════╣
║                      ΣΤΑΤΙΣΤΙΚΑ                           ║
╠═══════════════════════════════════════════════════════════╣
║  Ολοκληρωμένα μαθήματα: ${String(studentData.completedLessons?.length || 0).padEnd(32)}║
║  Αποθηκευμένος κώδικας: ${String(Object.keys(studentData.savedCode || {}).length).padEnd(32)}║
║  Projects: ${String((studentData.projects || []).length).padEnd(45)}║
╚═══════════════════════════════════════════════════════════╝

Εκτυπώθηκε από το WebDev Learning Hub
Εφαρμογές Πληροφορικής - Α' Λυκείου
    `;
    
    const blob = new Blob([progressReport], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `progress_${studentName}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('✅ Η αναφορά εξήχθη επιτυχώς!', 'success');
}

// ==========================================
// HELP MODAL
// ==========================================

function showHelp() {
    const helpHTML = `
        <div class="modal" id="helpModal" style="display: block;">
            <div class="modal-content">
                <span class="close" onclick="closeModal('helpModal')">&times;</span>
                <h2>❓ Οδηγίες Χρήσης</h2>
                
                <div class="help-content">
                    <h3>Πώς να χρησιμοποιήσεις την πλατφόρμα:</h3>
                    
                    <ol>
                        <li><strong>Διάλεξε μια ενότητα</strong> από την κεντρική σελίδα</li>
                        <li><strong>Διάβασε τη θεωρία</strong> κάθε μαθήματος</li>
                        <li><strong>Πειραματίσου</strong> με τον live editor</li>
                        <li><strong>Λύσε τις ασκήσεις</strong> για εξάσκηση</li>
                        <li><strong>Ολοκλήρωσε τα quizzes</strong> για αυτοαξιολόγηση</li>
                        <li><strong>Δημιούργησε projects</strong> για πρακτική εμπειρία</li>
                    </ol>
                    
                    <h3>Χαρακτηριστικά:</h3>
                    <ul>
                        <li>✅ Αυτόματη αποθήκευση προόδου</li>
                        <li>💾 Αποθήκευση κώδικα τοπικά</li>
                        <li>📸 Λήψη screenshots</li>
                        <li>📄 Εξαγωγή σε PDF</li>
                        <li>📥 Export/Import δεδομένων</li>
                        <li>🎯 Διαδραστικά quizzes</li>
                    </ul>
                    
                    <h3>Συμβουλές:</h3>
                    <ul>
                        <li>🚀 Πειραματίσου ελεύθερα - δεν μπορείς να "χαλάσεις" τίποτα!</li>
                        <li>💡 Δοκίμασε να τροποποιήσεις τα παραδείγματα</li>
                        <li>💼 Κάνε τακτικά backup τα δεδομένα σου</li>
                        <li>🔄 Επανέλαβε τα quizzes μέχρι να πετύχεις 100%</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', helpHTML);
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.remove();
    }
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ==========================================
// ANIMATIONS
// ==========================================

function initAnimations() {
    const cards = document.querySelectorAll('.module-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => observer.observe(card));
}

// ==========================================
// CONSOLE WELCOME MESSAGE
// ==========================================

console.log('%c🚀 WebDev Learning Hub', 'font-size: 24px; font-weight: bold; color: #2563eb;');
console.log('%cΚαλώς ήρθες στην πλατφόρμα μάθησης!', 'font-size: 14px; color: #64748b;');
console.log('%cΆνοιξε το DevTools και πειραματίσου! 💻', 'font-size: 12px; color: #10b981;');