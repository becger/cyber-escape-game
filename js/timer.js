// ===== GESTIONNAIRE DE TEMPS =====
const Timer = {
    startTime: 0,
    totalTime: 30 * 60, // 30 minutes en secondes
    currentTime: 0,
    isRunning: false,
    isPaused: false,
    interval: null,
    
    // Temps écoulé
    timeUp: function() {
        this.stop();
        this.showTimeUpScreen();
        
        // Sauvegarde du résultat
        Game.saveProgress();
        
        console.log('⏰ Temps écoulé !');
    },
    
    // Écran de fin de temps
    showTimeUpScreen: function() {
        const timeUpHTML = `
            <div class="time-up-screen">
                <div class="time-up-content">
                    <h1 class="time-up-title">⏰ TEMPS ÉCOULÉ !</h1>
                    <div class="time-up-animation">
                        <div class="explosion-effect">💥</div>
                    </div>
                    <div class="time-up-message">
                        <h2>🚨 L'ATTAQUE A RÉUSSI !</h2>
                        <p>Les hackers ont pris le contrôle du système universitaire...</p>
                        <p>Mais ne vous découragez pas ! Chaque tentative vous rend plus fort.</p>
                    </div>
                    <div class="time-up-stats">
                        <h3>📊 Vos statistiques :</h3>
                        <div class="stat-row">
                            <span>Énigmes résolues :</span>
                            <span>${Game.getSolvedEnigmas().length}/6</span>
                        </div>
                        <div class="stat-row">
                            <span>Temps utilisé :</span>
                            <span>30:00</span>
                        </div>
                        <div class="stat-row">
                            <span>Tentatives :</span>
                            <span>${Game.getTotalAttempts()}</span>
                        </div>
                    </div>
                    <div class="time-up-actions">
                        <button onclick="restartGame()" class="btn-restart">🔄 RECOMMENCER</button>
                        <button onclick="showLeaderboard()" class="btn-leaderboard">🏆 VOIR CLASSEMENT</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', timeUpHTML);
        
        // Style CSS inline pour l'écran de fin
        const style = document.createElement('style');
        style.textContent = `
            .time-up-screen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #000011, #440000);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 6000;
                animation: fadeIn 1s ease-in;
            }
            
            .time-up-content {
                text-align: center;
                max-width: 600px;
                padding: 40px;
                background: rgba(0, 0, 0, 0.9);
                border: 3px solid #ff0044;
                border-radius: 20px;
                box-shadow: 0 0 50px rgba(255, 0, 68, 0.5);
            }
            
            .time-up-title {
                font-size: 36px;
                color: #ff0044;
                margin-bottom: 20px;
                animation: pulse 1.5s infinite;
            }
            
            .explosion-effect {
                font-size: 60px;
                animation: explode 2s infinite;
            }
            
            @keyframes explode {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.2); }
            }
            
            .time-up-message h2 {
                color: #ff0044;
                margin: 20px 0;
            }
            
            .time-up-stats {
                margin: 30px 0;
                padding: 20px;
                background: rgba(255, 0, 68, 0.1);
                border-radius: 10px;
            }
            
            .stat-row {
                display: flex;
                justify-content: space-between;
                margin: 10px 0;
                color: #ffffff;
            }
            
            .time-up-actions {
                display: flex;
                gap: 20px;
                justify-content: center;
                margin-top: 30px;
            }
            
            .btn-restart, .btn-leaderboard {
                padding: 15px 30px;
                border: 2px solid #00ff00;
                background: transparent;
                color: #00ff00;
                font-family: 'Orbitron', monospace;
                font-weight: bold;
                cursor: pointer;
                border-radius: 8px;
                transition: all 0.3s ease;
            }
            
            .btn-restart:hover, .btn-leaderboard:hover {
                background: #00ff00;
                color: #000000;
            }
        `;
        document.head.appendChild(style);
    },
    
    // Formatage du temps
    formatTime: function(seconds) {
        const mins = Math.floor(Math.abs(seconds) / 60);
        const secs = Math.abs(seconds) % 60;
        const sign = seconds < 0 ? '-' : '';
        return `${sign}${mins}:${secs.toString().padStart(2, '0')}`;
    },
    
    // Temps restant en pourcentage
    getTimeProgress: function() {
        return ((this.totalTime - this.currentTime) / this.totalTime) * 100;
    },
    
    // Temps restant en secondes
    getTimeLeft: function() {
        return this.currentTime;
    },
    
    // Temps écoulé en secondes
    getElapsedTime: function() {
        return this.totalTime - this.currentTime;
    },
    
    // Vérification si le temps est critique (moins de 5 minutes)
    isCriticalTime: function() {
        return this.currentTime <= 300;
    },
    
    // Ajout de temps bonus (pour les bonnes réponses rapides)
    addBonusTime: function(seconds) {
        this.currentTime += seconds;
        if (this.currentTime > this.totalTime) {
            this.currentTime = this.totalTime;
        }
        
        showNotification(`⏰ +${seconds}s de bonus !`, 'success');
    },
    
    // Pénalité de temps (pour les mauvaises réponses)
    addTimePenalty: function(seconds) {
        this.currentTime -= seconds;
        if (this.currentTime < 0) {
            this.currentTime = 0;
        }
        
        showNotification(`⏰ -${seconds}s de pénalité !`, 'error');
    },
    
    // Effet sonore d'alerte (optionnel)
    playAlertSound: function() {
        try {
            // Création d'un son avec Web Audio API
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'square';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            // Fallback silencieux si l'audio ne fonctionne pas
            console.log('Audio non supporté');
        }
    },
    
    // Sauvegarde du temps pour reprise
    saveState: function() {
        const state = {
            currentTime: this.currentTime,
            totalTime: this.totalTime,
            isRunning: this.isRunning,
            isPaused: this.isPaused,
            timestamp: Date.now()
        };
        
        localStorage.setItem(`timerState_${Game.getTeam()}`, JSON.stringify(state));
    },
    
    // Chargement du temps sauvegardé
    loadState: function() {
        const saved = localStorage.getItem(`timerState_${Game.getTeam()}`);
        if (saved) {
            const state = JSON.parse(saved);
            const timeDiff = Math.floor((Date.now() - state.timestamp) / 1000);
            
            this.currentTime = Math.max(0, state.currentTime - timeDiff);
            this.totalTime = state.totalTime;
            this.isRunning = state.isRunning;
            this.isPaused = state.isPaused;
            
            return true;
        }
        return false;
    },
    
    // Reset du timer
    reset: function() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        
        this.currentTime = this.totalTime;
        this.isRunning = false;
        this.isPaused = false;
        this.interval = null;
        
        localStorage.removeItem(`timerState_${Game.getTeam()}`);
        this.updateDisplay();
    }
};

// ===== FONCTIONS UTILITAIRES POUR LE TIMER =====

// Gestion automatique des pauses (pour les modals, etc.)
let autoPauseTimeout;

function autoGrapesOnUserIdle() {
    clearTimeout(autoPauseTimeout);
    autoPauseTimeout = setTimeout(() => {
        if (Timer.isRunning && !Timer.isPaused) {
            Timer.pause();
            showNotification('⏸️ Timer mis en pause automatiquement (inactivité)', 'info');
        }
    }, 300000); // 5 minutes d'inactivité
}

// Événements pour la gestion automatique des pauses
document.addEventListener('visibilitychange', function() {
    if (document.hidden && Timer.isRunning) {
        Timer.saveState();
    } else if (!document.hidden && Timer.isPaused) {
        // Demander si l'utilisateur veut reprendre
        setTimeout(() => {
            if (confirm('🔄 Voulez-vous reprendre le timer ?')) {
                Timer.resume();
            }
        }, 1000);
    }
});

// Sauvegarde périodique de l'état du timer
setInterval(() => {
    if (Timer.isRunning) {
        Timer.saveState();
    }
}, 10000); // Toutes les 10 secondes

// Gestion des événements de navigation
window.addEventListener('beforeunload', function() {
    if (Timer.isRunning) {
        Timer.saveState();
    }
});

// Animation CSS pour les alertes de temps
const timerAnimationCSS = `
    @keyframes alertPulse {
        0% { 
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 30px rgba(255, 0, 68, 0.8);
        }
        50% { 
            transform: translate(-50%, -50%) scale(1.05);
            box-shadow: 0 0 50px rgba(255, 0, 68, 1);
        }
        100% { 
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 30px rgba(255, 0, 68, 0.8);
        }
    }
    
    .time-alert {
        animation: alertPulse 1s infinite !important;
    }
    
    .time-critical {
        color: #ff0044 !important;
        animation: blink 0.5s infinite !important;
    }
    
    .time-warning {
        color: #ff8800 !important;
    }
    
    .time-normal {
        color: #00ff00 !important;
    }
`;

// Injection du CSS d'animation
const timerStyle = document.createElement('style');
timerStyle.textContent = timerAnimationCSS;
document.head.appendChild(timerStyle);

// ===== SYSTÈME DE STATISTIQUES TEMPORELLES =====
const TimeStats = {
    // Enregistrement du temps par énigme
    enigmaTimes: {},
    
    // Démarrer le chronométrage d'une énigme
    startEnigmaTimer: function(enigmaId) {
        this.enigmaTimes[enigmaId] = {
            start: Date.now(),
            end: null,
            duration: null
        };
    },
    
    // Arrêter le chronométrage d'une énigme
    stopEnigmaTimer: function(enigmaId) {
        if (this.enigmaTimes[enigmaId]) {
            this.enigmaTimes[enigmaId].end = Date.now();
            this.enigmaTimes[enigmaId].duration = 
                this.enigmaTimes[enigmaId].end - this.enigmaTimes[enigmaId].start;
        }
    },
    
    // Obtenir le temps passé sur une énigme
    getEnigmaTime: function(enigmaId) {
        const enigma = this.enigmaTimes[enigmaId];
        if (!enigma) return 0;
        
        if (enigma.duration) {
            return Math.floor(enigma.duration / 1000);
        } else if (enigma.start) {
            return Math.floor((Date.now() - enigma.start) / 1000);
        }
        
        return 0;
    },
    
    // Obtenir les statistiques complètes
    getStats: function() {
        const stats = {
            totalTime: Timer.getElapsedTime(),
            enigmaTimes: {},
            averageTimePerEnigma: 0,
            fastestEnigma: null,
            slowestEnigma: null
        };
        
        let totalEnigmaTime = 0;
        let completedEnigmas = 0;
        let fastest = Infinity;
        let slowest = 0;
        
        for (const [enigmaId, data] of Object.entries(this.enigmaTimes)) {
            if (data.duration) {
                const timeInSeconds = Math.floor(data.duration / 1000);
                stats.enigmaTimes[enigmaId] = timeInSeconds;
                totalEnigmaTime += timeInSeconds;
                completedEnigmas++;
                
                if (timeInSeconds < fastest) {
                    fastest = timeInSeconds;
                    stats.fastestEnigma = { id: enigmaId, time: timeInSeconds };
                }
                
                if (timeInSeconds > slowest) {
                    slowest = timeInSeconds;
                    stats.slowestEnigma = { id: enigmaId, time: timeInSeconds };
                }
            }
        }
        
        if (completedEnigmas > 0) {
            stats.averageTimePerEnigma = Math.floor(totalEnigmaTime / completedEnigmas);
        }
        
        return stats;
    },
    
    // Sauvegarde des statistiques
    save: function() {
        localStorage.setItem(`timeStats_${Game.getTeam()}`, JSON.stringify(this.enigmaTimes));
    },
    
    // Chargement des statistiques
    load: function() {
        const saved = localStorage.getItem(`timeStats_${Game.getTeam()}`);
        if (saved) {
            this.enigmaTimes = JSON.parse(saved);
        }
    }
};

// Auto-sauvegarde des statistiques temporelles
setInterval(() => {
    TimeStats.save();
}, 15000); // Toutes les 15 secondes

console.log('⏰ Module Timer chargé avec succès');
 Démarrage du timer
    start: function(minutes = 30) {
        this.totalTime = minutes * 60;
        this.currentTime = this.totalTime;
        this.startTime = Date.now();
        this.isRunning = true;
        this.isPaused = false;
        
        this.interval = setInterval(() => {
            if (!this.isPaused && this.isRunning) {
                this.currentTime--;
                this.updateDisplay();
                this.checkWarnings();
                
                if (this.currentTime <= 0) {
                    this.timeUp();
                }
            }
        }, 1000);
        
        console.log(`⏰ Timer démarré : ${minutes} minutes`);
    },
    
    // Pause du timer
    pause: function() {
        this.isPaused = true;
        console.log('⏸️ Timer en pause');
    },
    
    // Reprise du timer
    resume: function() {
        this.isPaused = false;
        console.log('▶️ Timer repris');
    },
    
    // Arrêt du timer
    stop: function() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.isRunning = false;
        
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        return this.formatTime(elapsed);
    },
    
    // Mise à jour de l'affichage
    updateDisplay: function() {
        const timerElement = document.getElementById('gameTimer');
        if (timerElement) {
            timerElement.textContent = this.formatTime(this.currentTime);
            
            // Changement de couleur selon le temps restant
            if (this.currentTime <= 300) { // 5 minutes
                timerElement.style.color = '#ff0044';
                timerElement.classList.add('blink');
            } else if (this.currentTime <= 600) { // 10 minutes
                timerElement.style.color = '#ff8800';
            }
        }
    },
    
    // Vérification des alertes de temps
    checkWarnings: function() {
        const remaining = this.currentTime;
        
        // Alertes automatiques
        if (remaining === 25 * 60) { // 25 minutes écoulées
            this.showTimeWarning("🚨 Plus que 5 minutes ! Les hackers accélèrent leur attaque !");
        } else if (remaining === 15 * 60) { // 15 minutes écoulées
            this.showTimeWarning("⚠️ Plus que 15 minutes ! 50% des systèmes sont compromis !");
        } else if (remaining === 5 * 60) { // 5 minutes restantes
            this.showTimeWarning("🔥 DERNIÈRE LIGNE DROITE ! Plus que 5 minutes pour sauver l'université !");
        } else if (remaining === 60) { // 1 minute restante
            this.showTimeWarning("💥 PLUS QUE 60 SECONDES ! DÉPÊCHEZ-VOUS !");
        }
    },
    
    // Affichage des alertes de temps
    showTimeWarning: function(message) {
        // Création d'une notification spéciale pour les alertes de temps
        const alert = document.createElement('div');
        alert.className = 'time-alert';
        alert.innerHTML = `
            <div class="time-alert-content">
                <h3>⏰ ALERTE TEMPS</h3>
                <p>${message}</p>
            </div>
        `;
        
        // Styles inline pour l'alerte
        alert.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #ff0044, #ff0066);
            color: white;
            padding: 20px;
            border: 3px solid white;
            border-radius: 15px;
            font-family: 'Orbitron', monospace;
            font-weight: bold;
            text-align: center;
            z-index: 5000;
            animation: alertPulse 2s infinite;
            box-shadow: 0 0 30px rgba(255, 0, 68, 0.8);
        `;
        
        document.body.appendChild(alert);
        
        // Suppression automatique après 4 secondes
        setTimeout(() => {
            if (alert.parentNode) {
                alert.parentNode.removeChild(alert);
            }
        }, 4000);
        
        // Effet sonore (si supporté)
        this.playAlertSound();
    },
    
    // Temps écoulé
    timeUp: function() {
        this.stop();
        this.showTimeUpScreen();
        
        // Sauvegarde du résultat
        Game.saveProgress();
        
        console.log('⏰ Temps écoulé !');
    },
    
    //
