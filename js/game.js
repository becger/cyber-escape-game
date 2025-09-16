// ===== GESTIONNAIRE PRINCIPAL DU JEU =====
const Game = {
    team: '',
    currentEnigma: 1,
    startTime: 0,
    totalAttempts: 0,
    hintsUsed: 0,
    solvedEnigmas: [],
    
    // Initialisation du jeu
    init: function(teamCode) {
        this.team = teamCode;
        this.startTime = Date.now();
        this.loadProgress();
        
        console.log(`🎮 Jeu initialisé pour l'équipe ${teamCode}`);
    },
    
    // Chargement de la progression sauvegardée
    loadProgress: function() {
        const saved = localStorage.getItem(`gameProgress_${this.team}`);
        if (saved) {
            const data = JSON.parse(saved);
            this.currentEnigma = data.currentEnigma || 1;
            this.totalAttempts = data.totalAttempts || 0;
            this.hintsUsed = data.hintsUsed || 0;
            this.solvedEnigmas = data.solvedEnigmas || [];
        }
    },
    
    // Sauvegarde de la progression
    saveProgress: function() {
        const data = {
            team: this.team,
            currentEnigma: this.currentEnigma,
            totalAttempts: this.totalAttempts,
            hintsUsed: this.hintsUsed,
            solvedEnigmas: this.solvedEnigmas,
            lastSave: Date.now()
        };
        
        localStorage.setItem(`gameProgress_${this.team}`, JSON.stringify(data));
    },
    
    // Résolution d'une énigme
    solveEnigma: function(enigmaId) {
        if (!this.solvedEnigmas.includes(enigmaId)) {
            this.solvedEnigmas.push(enigmaId);
            this.currentEnigma = Math.max(this.currentEnigma, enigmaId + 1);
            this.saveProgress();
            
            // Envoi des stats à l'admin (simulation)
            this.sendStatsToAdmin();
        }
    },
    
    // Ajout d'une tentative
    addAttempt: function() {
        this.totalAttempts++;
        this.saveProgress();
    },
    
    // Utilisation d'un indice
    useHint: function() {
        this.hintsUsed++;
        this.saveProgress();
    },
    
    // Envoi des statistiques à l'admin
    sendStatsToAdmin: function() {
        const stats = {
            team: this.team,
            progress: this.solvedEnigmas.length,
            currentEnigma: this.currentEnigma,
            time: Math.floor((Date.now() - this.startTime) / 1000),
            attempts: this.totalAttempts,
            hints: this.hintsUsed,
            timestamp: Date.now()
        };
        
        // Dans une vraie implémentation, ceci enverrait les données au serveur
        localStorage.setItem(`adminStats_${this.team}`, JSON.stringify(stats));
    },
    
    // Getters
    getTeam: function() { return this.team; },
    getCurrentEnigma: function() { return this.currentEnigma; },
    getTotalTime: function() { return Math.floor((Date.now() - this.startTime) / 1000); },
    getTotalAttempts: function() { return this.totalAttempts; },
    getHintsUsed: function() { return this.hintsUsed; },
    getSolvedEnigmas: function() { return this.solvedEnigmas; },
    
    // Setters
    setCurrentEnigma: function(enigmaId) {
        this.currentEnigma = enigmaId;
        this.saveProgress();
    },
    
    // Vérification si le jeu est terminé
    isGameComplete: function() {
        return this.solvedEnigmas.length >= 6;
    },
    
    // Reset du jeu
    reset: function() {
        this.currentEnigma = 1;
        this.totalAttempts = 0;
        this.hintsUsed = 0;
        this.solvedEnigmas = [];
        this.startTime = Date.now();
        localStorage.removeItem(`gameProgress_${this.team}`);
    }
};

// ===== GESTIONNAIRE DES ÉNIGMES =====
const Enigmas = {
    // Données des énigmes
    data: {
        1: {
            id: 1,
            title: "🔐 ÉNIGME 1 : DÉCHIFFRAGE D'URGENCE",
            description: "Un mot de passe compromis a été intercepté sous forme chiffrée. Décodez-le pour accéder au système !",
            cipher: "12-15-7-9-14-50-50-52-52",
            hint: "Pensez à l'alphabet... A=1, B=2, C=3... et regardez bien les chiffres !",
            answer: "LOGIN2024",
            code: "LOGIN2024"
        },
        2: {
            id: 2,
            title: "📧 ÉNIGME 2 : DÉTECTEUR DE PHISHING",
            description: "Analysez ces emails et identifiez ceux qui sont des tentatives de phishing. Votre vigilance peut sauver l'université !",
            hint: "Regardez attentivement les domaines, les fautes d'orthographe et les demandes urgentes",
            answer: [1, 3, 6], // IDs des emails suspects
            code: "PHISH3"
        },
        3: {
            id: 3,
            title: "🧩 ÉNIGME 3 : PUZZLE CRYPTOGRAPHIQUE",
            description: "Reconstituez ce QR code fragmenté pour révéler le code secret. Chaque pièce compte !",
            hint: "Superposez les éléments dans le bon ordre pour reconstituer l'image complète",
            answer: "puzzle_complete",
            code: "DECRYPT7"
        },
        4: {
            id: 4,
            title: "📶 ÉNIGME 4 : SCANNER WI-FI",
            description: "Analysez ces réseaux Wi-Fi et identifiez ceux qui représentent une menace de sécurité !",
            hint: "Méfiez-vous des noms similaires aux vrais réseaux, des protocoles faibles et des configurations par défaut",
            answer: [3, 5, 8], // IDs des réseaux dangereux
            code: "WIFI135"
        },
        5: {
            id: 5,
            title: "👤 ÉNIGME 5 : INGÉNIERIE SOCIALE",
            description: "Analysez ce profil social pour déduire le mot de passe probable de cette personne. L'ingénierie sociale est une arme redoutable !",
            hint: "Les gens utilisent souvent des informations personnelles dans leurs mots de passe : lieux, dates, animaux...",
            answer: "RomeRex2018",
            code: "SOCIAL9"
        },
        6: {
            id: 6,
            title: "💻 ÉNIGME FINALE : CODE MAÎTRE",
            description: "Utilisez tous les codes obtenus pour calculer le code maître et neutraliser définitivement l'attaque !",
            hint: "Additionnez tous les chiffres des codes précédents et appliquez la transformation finale",
            answer: "REVENGE",
            code: "REVENGE"
        }
    },
    
    // Récupération d'une énigme
    getEnigma: function(enigmaId) {
        const enigma = this.data[enigmaId];
        if (!enigma) return null;
        
        return {
            ...enigma,
            render: () => this.renderEnigma(enigmaId)
        };
    },
    
    // Rendu HTML d'une énigme
    renderEnigma: function(enigmaId) {
        switch(enigmaId) {
            case 1: return this.renderEnigma1();
            case 2: return this.renderEnigma2();
            case 3: return this.renderEnigma3();
            case 4: return this.renderEnigma4();
            case 5: return this.renderEnigma5();
            case 6: return this.renderEnigma6();
            default: return '<div>Énigme non trouvée</div>';
        }
    },
    
    // Rendu énigme 1 - Déchiffrage
    renderEnigma1: function() {
        return `
        <div class="enigma-container">
            <h2 class="enigma-title">${this.data[1].title}</h2>
            <p class="enigma-description">${this.data[1].description}</p>
            
            <div class="enigma-content">
                <div class="cipher-box">
                    <h3>🔢 Code intercepté :</h3>
                    <div class="cipher-display">${this.data[1].cipher}</div>
                    
                    <div class="alphabet-helper">
                        <strong>💡 Aide au déchiffrement :</strong><br>
                        A=1 B=2 C=3 D=4 E=5 F=6 G=7 H=8 I=9 J=10 K=11 L=12 M=13<br>
                        N=14 O=15 P=16 Q=17 R=18 S=19 T=20 U=21 V=22 W=23 X=24 Y=25 Z=26
                    </div>
                    
                    <div class="input-group">
                        <label for="decodedAnswer">🔓 Mot de passe décodé :</label>
                        <input type="text" id="decodedAnswer" placeholder="Entrez le mot de passe déchiffré" autocomplete="off">
                    </div>
                    
                    <div class="action-buttons">
                        <button class="btn primary" onclick="validateEnigma1()">🚀 VALIDER</button>
                        <button class="btn" onclick="getHint(1)">💡 INDICE</button>
                    </div>
                </div>
            </div>
        </div>`;
    },
    
    // Rendu énigme 2 - Phishing
    renderEnigma2: function() {
        const emails = [
            {
                id: 1,
                from: "securite@bank-creditt-agricol.com",
                subject: "URGENT - Vérifiez votre compte",
                body: "Votre compte sera suspendu dans 24h si vous ne confirmez pas votre identité. Cliquez ici : http://bank-verificaton.tk/login",
                isPhishing: true
            },
            {
                id: 2,
                from: "notifications@paypal.com",
                subject: "Récapitulatif mensuel PayPal",
                body: "Voici votre récapitulatif d'activité du mois dernier. Consultez vos transactions sur https://www.paypal.com/myaccount",
                isPhishing: false
            },
            {
                id: 3,
                from: "admin@universite-campus.fr",
                subject: "Maintenance serveur ce weekend",
                body: "Maintenance prévue ce weekend. Changez votre mot de passe via ce lien : http://bit.ly/campusmaint",
                isPhishing: true
            },
            {
                id: 4,
                from: "support@microsoft.com",
                subject: "Mise à jour de sécurité",
                body: "Une mise à jour importante est disponible pour votre compte. Téléchargez-la sur https://www.microsoft.com/security",
                isPhishing: false
            },
            {
                id: 5,
                from: "contact@amazon.com",
                subject: "Votre commande #12345",
                body: "Votre commande a été expédiée et arrivera demain. Suivez-la sur https://www.amazon.fr/tracking",
                isPhishing: false
            },
            {
                id: 6,
                from: "noreply@googlle.com",
                subject: "Activité suspecte détectée",
                body: "Connexion détectée depuis un nouvel appareil. Sécurisez votre compte : http://secure-google.tk/verify",
                isPhishing: true
            }
        ];
        
        let emailsHTML = '';
        emails.forEach(email => {
            emailsHTML += `
            <div class="email-card" onclick="toggleEmailSelection(${email.id})" id="email${email.id}">
                <div class="email-header">
                    <strong>De :</strong> ${email.from}<br>
                    <strong>Objet :</strong> ${email.subject}
                </div>
                <div class="email-body">${email.body}</div>
                <div class="email-suspicious">
                    <label>
                        <input type="checkbox" id="checkbox${email.id}" onchange="updateEmailSelection(${email.id})">
                        🚨 Email suspect (Phishing)
                    </label>
                </div>
            </div>`;
        });
        
        return `
        <div class="enigma-container">
            <h2 class="enigma-title">${this.data[2].title}</h2>
            <p class="enigma-description">${this.data[2].description}</p>
            
            <div class="enigma-content">
                <div class="email-detector">
                    <h3>📧 Analysez ces emails :</h3>
                    ${emailsHTML}
                    
                    <div class="action-buttons">
                        <button class="btn primary" onclick="validateEnigma2()">🔍 ANALYSER LES MENACES</button>
                        <button class="btn" onclick="getHint(2)">💡 INDICE</button>
                    </div>
                </div>
            </div>
        </div>`;
    },
    
    // Rendu énigme 3 - Puzzle
    renderEnigma3: function() {
        return `
        <div class="enigma-container">
            <h2 class="enigma-title">${this.data[3].title}</h2>
            <p class="enigma-description">${this.data[3].description}</p>
            
            <div class="enigma-content">
                <div class="puzzle-container">
                    <h3>🧩 Reconstituez le QR Code :</h3>
                    
                    <canvas id="puzzleCanvas" class="puzzle-canvas" width="300" height="300"></canvas>
                    
                    <div class="puzzle-pieces" id="puzzlePieces">
                        <div class="puzzle-piece" draggable="true" data-piece="1" ondragstart="drag(event)">
                            ⬛⬜⬛<br>⬜⬛⬜<br>⬛⬜⬛
                        </div>
                        <div class="puzzle-piece" draggable="true" data-piece="2" ondragstart="drag(event)">
                            ⬜⬛⬜<br>⬛⬜⬛<br>⬜⬛⬜
                        </div>
                        <div class="puzzle-piece" draggable="true" data-piece="3" ondragstart="drag(event)">
                            ⬛⬜⬛<br>⬜⬛⬜<br>⬛⬜⬛
                        </div>
                        <div class="puzzle-piece" draggable="true" data-piece="4" ondragstart="drag(event)">
                            ⬜⬛⬜<br>⬛⬜⬛<br>⬜⬛⬜
                        </div>
                    </div>
                    
                    <div id="puzzleResult" class="hidden">
                        <h4>🎯 QR CODE RECONSTITUÉ !</h4>
                        <div class="qr-revealed">
                            <pre>
█▀▀▀▀▀█ ▀▀█ █▀▀▀▀▀█
█ ███ █ ▀▀▀ █ ███ █
█ ▀▀▀ █ ███ █ ▀▀▀ █
▀▀▀▀▀▀▀ ▀ █ ▀▀▀▀▀▀▀
██ ▀▀▀▀▀███▀▀▀██▀▀█
▀▀▀███▀██▀██▀██▀███
█▀▀▀▀▀█ ██▀ ▀ █▀▀▀█
█ ███ █ ▀▀▀▀██ ▀▀▀█
█ ▀▀▀ █ █▀▀▀▀██ ▀██
▀▀▀▀▀▀▀ ▀▀▀▀▀▀▀▀▀▀▀
                            </pre>
                        </div>
                        <p><strong>Code révélé : DECRYPT7</strong></p>
                    </div>
                    
                    <div class="action-buttons">
                        <button class="btn primary" onclick="validateEnigma3()">🔓 DÉCODER</button>
                        <button class="btn" onclick="getHint(3)">💡 INDICE</button>
                    </div>
                </div>
            </div>
        </div>`;
    },
    
    // Rendu énigme 4 - WiFi
    renderEnigma4: function() {
        const networks = [
            {id: 1, name: "CAMPUS-SECURE", security: "WPA3", signal: 95, safe: true},
            {id: 2, name: "FreeWiFi-Guest", security: "Open", signal: 78, safe: false},
            {id: 3, name: "CAMPUS-SECU", security: "WEP", signal: 88, safe: false}, // Fake
            {id: 4, name: "iPhone_hotspot", security: "WPA2", signal: 67, safe: true},
            {id: 5, name: "TP-LINK_DEFAULT", security: "WEP (admin/admin)", signal: 45, safe: false},
            {id: 6, name: "McDonaldsFree", security: "Open", signal: 34, safe: false},
            {id: 7, name: "CAMPUS-BACKUP", security: "WPA3", signal: 92, safe: true},
            {id: 8, name: "wifi_gratuit", security: "Open", signal: 56, safe: false}
        ];
        
        let networksHTML = '';
        networks.forEach(network => {
            const signalBars = '▮'.repeat(Math.floor(network.signal/20));
            networksHTML += `
            <div class="wifi-item" onclick="toggleWifiSelection(${network.id})" id="wifi${network.id}">
                <span class="wifi-name">${network.name}</span>
                <span class="wifi-security">${network.security}</span>
                <span class="wifi-signal">${signalBars} ${network.signal}%</span>
                <label>
                    <input type="checkbox" id="wifiCheckbox${network.id}" onchange="updateWifiSelection(${network.id})">
                    ⚠️ Dangereux
                </label>
            </div>`;
        });
        
        return `
        <div class="enigma-container">
            <h2 class="enigma-title">${this.data[4].title}</h2>
            <p class="enigma-description">${this.data[4].description}</p>
            
            <div class="enigma-content">
                <div class="wifi-scanner">
                    <div id="scanningIndicator" class="scanning">
                        🔍 Scan des réseaux Wi-Fi en cours...
                    </div>
                    
                    <div id="wifiResults" class="wifi-list hidden">
                        <h3>📡 Réseaux détectés :</h3>
                        ${networksHTML}
                    </div>
                    
                    <div class="action-buttons">
                        <button class="btn" onclick="startWifiScan()">📶 SCANNER</button>
                        <button class="btn primary" onclick="validateEnigma4()">🛡️ IDENTIFIER MENACES</button>
                        <button class="btn" onclick="getHint(4)">💡 INDICE</button>
                    </div>
                </div>
            </div>
        </div>`;
    },
    
    // Rendu énigme 5 - Profil social
    renderEnigma5: function() {
        return `
        <div class="enigma-container">
            <h2 class="enigma-title">${this.data[5].title}</h2>
            <p class="enigma-description">${this.data[5].description}</p>
            
            <div class="enigma-content">
                <div class="social-profile">
                    <div class="profile-header">
                        <div style="width: 80px; height: 80px; background: #444; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; font-size: 24px;">👩</div>
                        <h3>Julie Martin</h3>
                        <p>📍 Actuellement à Rome</p>
                        <p>🏢 TechCorp - Équipe IT</p>
                    </div>
                    
                    <div class="posts">
                        <div class="post" onclick="analyzePost(1)" id="post1">
                            <p>🏛️ En vacances à Rome ! Magnifique ville où je suis née ❤️ #VacancesRome #Patrimoine</p>
                            <small>📍 Rome, Italie • Il y a 2 heures</small>
                        </div>
                        
                        <div class="post" onclick="analyzePost(2)" id="post2">
                            <p>🐕 Mon chien Rex fête ses 6 ans aujourd'hui ! Adopté en 2018, c'est mon fidèle compagnon 💕 #DogLover #Rex</p>
                            <small>Il y a 1 jour</small>
                        </div>
                        
                        <div class="post" onclick="analyzePost(3)" id="post3">
                            <p>👔 Premier jour chez TechCorp ! Fière de rejoindre l'équipe IT. Nouveau badge, nouveaux défis ! 💻</p>
                            <small>Il y a 1 semaine</small>
                        </div>
                        
                        <div class="post" onclick="analyzePost(4)" id="post4">
                            <p>🎂 Merci pour tous vos messages d'anniversaire ! 28 ans et toujours aussi motivée ! 🎉</p>
                            <small>Il y a 2 semaines</small>
                        </div>
                    </div>
                    
                    <div class="password-generator">
                        <h4>🔐 Générer le mot de passe probable :</h4>
                        <p><small>Analysez les informations personnelles pour deviner son mot de passe</small></p>
                        <div class="input-group">
                            <input type="text" id="socialPassword" placeholder="Combinaison probable des indices...">
                        </div>
                        
                        <div class="action-buttons">
                            <button class="btn primary" onclick="validateEnigma5()">🔍 TENTER L'ACCÈS</button>
                            <button class="btn" onclick="getHint(5)">💡 INDICE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    },
    
    // Rendu énigme 6 - Terminal final
    renderEnigma6: function() {
        return `
        <div class="enigma-container">
            <h2 class="enigma-title">${this.data[6].title}</h2>
            <p class="enigma-description">${this.data[6].description}</p>
            
            <div class="enigma-content">
                <div class="master-terminal">
                    <div class="terminal-header-master">
                        <span class="terminal-title">🖥️ TERMINAL DE NEUTRALISATION</span>
                        <span class="terminal-status">STATUT: 🔴 ATTAQUE EN COURS</span>
                    </div>
                    
                    <div class="terminal-output" id="terminalOutput">
                        <p>$ Initialisation du protocole de contre-attaque...</p>
                        <p>$ Codes de sécurité requis : 5/5</p>
                        <p>$ Entrez vos codes obtenus dans les énigmes précédentes :</p>
                        <p class="text-green">$ Codes attendus : LOGIN2024, PHISH3, DECRYPT7, WIFI135, SOCIAL9</p>
                    </div>
                    
                    <div class="terminal-input">
                        <span>$</span>
                        <input type="text" id="terminalCommand" placeholder="Entrez un code..." autocomplete="off" onkeypress="handleTerminalEnter(event)">
                        <button onclick="executeTerminalCommand()" class="btn">EXÉCUTER</button>
                    </div>
                </div>
                
                <div id="algorithmSection" class="hidden">
                    <h4>🧮 Calcul du code maître :</h4>
                    <div class="algorithm-display">
                        <p>LOGIN2024 → 2024</p>
                        <p>PHISH3 → 3</p>
                        <p>DECRYPT7 → 7</p>
                        <p>WIFI135 → 135</p>
                        <p>SOCIAL9 → 9</p>
                        <p class="text-orange">SOMME: 2024 + 3 + 7 + 135 + 9 = 2178</p>
                        <p class="text-green">Transformation: 2178 → REVENGE</p>
                    </div>
                    
                    <div class="input-group">
                        <label>🔐 Code maître final :</label>
                        <input type="text" id="masterCode" placeholder="Code de neutralisation">
                    </div>
                    
                    <div class="action-buttons">
                        <button class="btn danger" onclick="validateEnigma6()">💥 NEUTRALISER L'ATTAQUE</button>
                    </div>
                </div>
            </div>
        </div>`;
    },
    
    // Vérification des réponses
    checkAnswer: function(enigmaId, answer) {
        const enigma = this.data[enigmaId];
        if (!enigma) return false;
        
        switch(enigmaId) {
            case 1:
                return answer.toUpperCase().replace(/\s+/g, '') === enigma.answer;
            
            case 2:
                // Vérifie si les bons emails de phishing sont sélectionnés
                const expectedPhishing = [1, 3, 6];
                return JSON.stringify(answer.sort()) === JSON.stringify(expectedPhishing);
            
            case 3:
                return answer === enigma.answer;
            
            case 4:
                // Vérifie si les bons réseaux dangereux sont sélectionnés
                const expectedDangerous = [3, 5, 8];
                return JSON.stringify(answer.sort()) === JSON.stringify(expectedDangerous);
            
            case 5:
                return answer.toLowerCase().replace(/\s+/g, '') === enigma.answer.toLowerCase();
            
            case 6:
                return answer.toUpperCase().replace(/\s+/g, '') === enigma.answer;
            
            default:
                return false;
        }
    }
};

// ===== FONCTIONS DE VALIDATION DES ÉNIGMES =====

function validateEnigma1() {
    const answer = document.getElementById('decodedAnswer').value;
    const isCorrect = Enigmas.checkAnswer(1, answer);
    
    if (isCorrect) {
        showNotification('✅ Excellent ! Code LOGIN2024 accepté !', 'success');
        Game.solveEnigma(1);
        setTimeout(() => nextEnigma(), 1500);
    } else {
        showNotification('❌ Code incorrect ! Vérifiez votre déchiffrement...', 'error');
        Game.addAttempt();
        document.getElementById('decodedAnswer').classList.add('shake');
        setTimeout(() => {
            document.getElementById('decodedAnswer').classList.remove('shake');
        }, 500);
    }
}

// Variables globales pour les sélections
let selectedEmails = [];
let selectedWifis = [];

function toggleEmailSelection(emailId) {
    const checkbox = document.getElementById(`checkbox${emailId}`);
    checkbox.checked = !checkbox.checked;
    updateEmailSelection(emailId);
}

function updateEmailSelection(emailId) {
    const checkbox = document.getElementById(`checkbox${emailId}`);
    const emailCard = document.getElementById(`email${emailId}`);
    
    if (checkbox.checked) {
        if (!selectedEmails.includes(emailId)) {
            selectedEmails.push(emailId);
        }
        emailCard.classList.add('selected');
    } else {
        selectedEmails = selectedEmails.filter(id => id !== emailId);
        emailCard.classList.remove('selected');
    }
}

function validateEnigma2() {
    const isCorrect = Enigmas.checkAnswer(2, selectedEmails);
    
    if (isCorrect) {
        showNotification('✅ Parfait ! Vous avez identifié tous les emails de phishing !', 'success');
        Game.solveEnigma(2);
        setTimeout(() => nextEnigma(), 1500);
    } else {
        showNotification('❌ Certains emails dangereux ne sont pas identifiés ou vous avez sélectionné des emails légitimes...', 'error');
        Game.addAttempt();
    }
}

// Puzzle énigme 3
let puzzleCompleted = false;

function drag(event) {
    event.dataTransfer.setData("text", event.target.dataset.piece);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const pieceId = event.dataTransfer.getData("text");
    // Logique de placement des pièces
    checkPuzzleCompletion();
}

function checkPuzzleCompletion() {
    // Simulation de la completion du puzzle
    setTimeout(() => {
        puzzleCompleted = true;
        document.getElementById('puzzleResult').classList.remove('hidden');
        showNotification('🧩 Puzzle reconstitué ! QR Code décodé !', 'success');
    }, 2000);
}

function validateEnigma3() {
    if (puzzleCompleted) {
        Game.solveEnigma(3);
        setTimeout(() => nextEnigma(), 1500);
    } else {
        showNotification('❌ Terminez d\'abord le puzzle !', 'error');
        Game.addAttempt();
    }
}

// WiFi énigme 4
function startWifiScan() {
    const scanIndicator = document.getElementById('scanningIndicator');
    const results = document.getElementById('wifiResults');
    
    scanIndicator.textContent = '🔍 Scan en cours...';
    
    setTimeout(() => {
        scanIndicator.classList.add('hidden');
        results.classList.remove('hidden');
        showNotification('📶 Scan terminé ! Analysez les réseaux détectés.', 'info');
    }, 3000);
}

function toggleWifiSelection(wifiId) {
    const checkbox = document.getElementById(`wifiCheckbox${wifiId}`);
    checkbox.checked = !checkbox.checked;
    updateWifiSelection(wifiId);
}

function updateWifiSelection(wifiId) {
    const checkbox = document.getElementById(`wifiCheckbox${wifiId}`);
    const wifiCard = document.getElementById(`wifi${wifiId}`);
    
    if (checkbox.checked) {
        if (!selectedWifis.includes(wifiId)) {
            selectedWifis.push(wifiId);
        }
        wifiCard.classList.add('danger');
    } else {
        selectedWifis = selectedWifis.filter(id => id !== wifiId);
        wifiCard.classList.remove('danger');
    }
}

function validateEnigma4() {
    const isCorrect = Enigmas.checkAnswer(4, selectedWifis);
    
    if (isCorrect) {
        showNotification('✅ Excellent ! Vous avez identifié toutes les menaces Wi-Fi !', 'success');
        Game.solveEnigma(4);
        setTimeout(() => nextEnigma(), 1500);
    } else {
        showNotification('❌ Certains réseaux dangereux ne sont pas identifiés...', 'error');
        Game.addAttempt();
    }
}

// Profil social énigme 5
function analyzePost(postId) {
    const post = document.getElementById(`post${postId}`);
    post.classList.add('analyzed');
    
    const hints = {
        1: 'Ville de naissance révélée : Rome',
        2: 'Animal de compagnie : Rex, adopté en 2018',
        3: 'Nouvel emploi chez TechCorp',
        4: 'Âge : 28 ans'
    };
    
    showNotification(`💡 Indice collecté : ${hints[postId]}`, 'info');
}

function validateEnigma5() {
    const answer = document.getElementById('socialPassword').value;
    const isCorrect = Enigmas.checkAnswer(5, answer);
    
    if (isCorrect) {
        showNotification('✅ Mot de passe trouvé ! Accès accordé au système !', 'success');
        Game.solveEnigma(5);
        setTimeout(() => nextEnigma(), 1500);
    } else {
        showNotification('❌ Mot de passe incorrect ! Analysez mieux les informations...', 'error');
        Game.addAttempt();
    }
}

// Terminal énigme 6
let enteredCodes = [];
const requiredCodes = ['LOGIN2024', 'PHISH3', 'DECRYPT7', 'WIFI135', 'SOCIAL9'];

function handleTerminalEnter(event) {
    if (event.key === 'Enter') {
        executeTerminalCommand();
    }
}

function executeTerminalCommand() {
    const command = document.getElementById('terminalCommand').value.toUpperCase();
    const output = document.getElementById('terminalOutput');
    
    if (requiredCodes.includes(command) && !enteredCodes.includes(command)) {
        enteredCodes.push(command);
        output.innerHTML += `<p class="success">✅ Code ${command} accepté (${enteredCodes.length}/5)</p>`;
        
        if (enteredCodes.length === 5) {
            output.innerHTML += `<p class="text-orange">🧮 Tous les codes reçus ! Calcul du code maître...</p>`;
            document.getElementById('algorithmSection').classList.remove('hidden');
        }
    } else if (enteredCodes.includes(command)) {
        output.innerHTML += `<p class="text-orange">⚠️ Code ${command} déjà utilisé</p>`;
    } else {
        output.innerHTML += `<p class="error">❌ Code ${command} rejeté</p>`;
        Game.addAttempt();
    }
    
    document.getElementById('terminalCommand').value = '';
    output.scrollTop = output.scrollHeight;
}

function validateEnigma6() {
    const masterCode = document.getElementById('masterCode').value;
    const isCorrect = Enigmas.checkAnswer(6, masterCode);
    
    if (isCorrect && enteredCodes.length === 5) {
        showNotification('🎊 MISSION ACCOMPLIE ! Attaque neutralisée !', 'success');
        Game.solveEnigma(6);
        setTimeout(() => showVictory(), 2000);
    } else {
        showNotification('❌ Code maître incorrect !', 'error');
        Game.addAttempt();
    }
}

// ===== SYSTÈME D'AIDE =====
function getHint(enigmaId) {
    const hints = {
        1: "💡 Décodez chaque nombre en lettre : 12=L, 15=O, 7=G, 9=I, 14=N, puis regardez les chiffres qui restent...",
        2: "💡 Vérifiez : les fautes d'orthographe dans les domaines, les URLs suspectes (.tk), les demandes urgentes",
        3: "💡 Placez les pièces dans l'ordre : coin supérieur gauche, puis droite, puis ligne du bas...",
        4: "💡 Attention aux réseaux : CAMPUS-SECU (faux nom), TP-LINK_DEFAULT (mot de passe par défaut), wifi_gratuit (nom générique)",
        5: "💡 Combinez : ville de naissance + nom de l'animal + année d'adoption",
        6: "💡 Additionnez tous les chiffres des codes précédents : 2024+3+7+135+9 = ?"
    };
    
    showNotification(hints[enigmaId] || "💡 Continuez à chercher !", 'info', 5000);
    Game.useHint();
}
