// ===== EFFET MATRIX D'ARRIÈRE-PLAN =====
const MatrixEffect = {
    canvas: null,
    ctx: null,
    columns: [],
    characters: "01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%^&*()_+-=[]{}|;:,.<>?",
    fontSize: 14,
    columnWidth: 0,
    numberOfColumns: 0,
    animationId: null,
    isActive: false,

    // Initialisation de l'effet Matrix
    init: function() {
        this.createCanvas();
        this.setupCanvas();
        this.setupColumns();
        this.start();
        
        // Gestion du redimensionnement
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        console.log('🟢 Effet Matrix initialisé');
    },

    // Création du canvas
    createCanvas: function() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'matrix-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.15;
            pointer-events: none;
        `;
        
        // Insertion dans l'élément matrix-bg ou dans le body
        const matrixBg = document.getElementById('matrix-bg');
        if (matrixBg) {
            matrixBg.appendChild(this.canvas);
        } else {
            document.body.appendChild(this.canvas);
        }
        
        this.ctx = this.canvas.getContext('2d');
    },

    // Configuration du canvas
    setupCanvas: function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.columnWidth = this.fontSize;
        this.numberOfColumns = Math.floor(this.canvas.width / this.columnWidth);
        
        // Style du contexte
        this.ctx.fillStyle = '#000';
        this.ctx.font = `${this.fontSize}px 'Courier New', monospace`;
    },

    // Configuration des colonnes
    setupColumns: function() {
        this.columns = [];
        
        for (let i = 0; i < this.numberOfColumns; i++) {
            this.columns[i] = {
                y: Math.random() * this.canvas.height,
                speed: Math.random() * 3 + 1,
                chars: [],
                opacity: Math.random() * 0.5 + 0.3
            };
            
            // Génération des caractères pour chaque colonne
            const numberOfChars = Math.floor(Math.random() * 20) + 5;
            for (let j = 0; j < numberOfChars; j++) {
                this.columns[i].chars.push({
                    char: this.getRandomChar(),
                    age: Math.random() * 100
                });
            }
        }
    },

    // Caractère aléatoire
    getRandomChar: function() {
        return this.characters[Math.floor(Math.random() * this.characters.length)];
    },

    // Démarrage de l'animation
    start: function() {
        if (!this.isActive) {
            this.isActive = true;
            this.animate();
        }
    },

    // Arrêt de l'animation
    stop: function() {
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    },

    // Boucle d'animation principale
    animate: function() {
        if (!this.isActive) return;
        
        this.update();
        this.draw();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    },

    // Mise à jour de la logique
    update: function() {
        for (let i = 0; i < this.columns.length; i++) {
            const column = this.columns[i];
            
            // Déplacement de la colonne
            column.y += column.speed;
            
            // Reset si la colonne sort de l'écran
            if (column.y > this.canvas.height + this.fontSize * column.chars.length) {
                column.y = -this.fontSize * column.chars.length;
                column.speed = Math.random() * 3 + 1;
                column.opacity = Math.random() * 0.5 + 0.3;
                
                // Régénération des caractères
                for (let j = 0; j < column.chars.length; j++) {
                    if (Math.random() > 0.95) {
                        column.chars[j].char = this.getRandomChar();
                    }
                    column.chars[j].age++;
                }
            }
            
            // Mutation aléatoire des caractères
            for (let j = 0; j < column.chars.length; j++) {
                if (Math.random() > 0.98) {
                    column.chars[j].char = this.getRandomChar();
                    column.chars[j].age = 0;
                }
                column.chars[j].age++;
            }
        }
    },

    // Rendu graphique
    draw: function() {
        // Fond semi-transparent pour l'effet de traînée
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Rendu des colonnes
        for (let i = 0; i < this.columns.length; i++) {
            const column = this.columns[i];
            const x = i * this.columnWidth;
            
            for (let j = 0; j < column.chars.length; j++) {
                const char = column.chars[j];
                const y = column.y + (j * this.fontSize);
                
                // Calcul de l'opacité basé sur l'âge du caractère
                const age = char.age;
                let opacity = column.opacity;
                
                if (j === 0) {
                    // Premier caractère (tête) - plus brillant
                    opacity = 1;
                    this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                } else if (j === 1) {
                    // Deuxième caractère - vert brillant
                    opacity = 0.8;
                    this.ctx.fillStyle = `rgba(0, 255, 65, ${opacity})`;
                } else {
                    // Autres caractères - vert qui s'estompe
                    opacity = Math.max(0, column.opacity - (age * 0.01));
                    this.ctx.fillStyle = `rgba(0, 255, 17, ${opacity})`;
                }
                
                // Rendu du caractère
                if (opacity > 0 && y > 0 && y < this.canvas.height) {
                    this.ctx.fillText(char.char, x, y);
                }
            }
        }
    },

    // Gestion du redimensionnement
    handleResize: function() {
        this.setupCanvas();
        this.setupColumns();
    },

    // Modification de l'intensité
    setIntensity: function(intensity) {
        // intensity entre 0 (arrêt) et 1 (maximum)
        if (intensity <= 0) {
            this.stop();
        } else {
            this.canvas.style.opacity = intensity * 0.2;
            if (!this.isActive) {
                this.start();
            }
        }
    },

    // Modification de la vitesse
    setSpeed: function(speedMultiplier) {
        for (let i = 0; i < this.columns.length; i++) {
            this.columns[i].speed *= speedMultiplier;
        }
    },

    // Destruction de l'effet
    destroy: function() {
        this.stop();
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        
        window.removeEventListener('resize', this.handleResize);
        console.log('🔴 Effet Matrix détruit');
    }
};

// ===== GESTIONNAIRE D'EFFET MATRIX SIMPLIFIÉ =====
function initMatrix() {
    // Vérification de la performance du navigateur
    const isLowPerformance = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    
    if (isLowPerformance) {
        console.log('⚡ Performance réduite détectée - Matrix simplifié');
        createSimpleMatrix();
    } else {
        MatrixEffect.init();
    }
}

// Version simplifiée pour les appareils moins performants
function createSimpleMatrix() {
    const matrixContainer = document.getElementById('matrix-bg') || document.body;
    
    // Création de quelques colonnes fixes
    for (let i = 0; i < 20; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column-simple';
        column.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: -100px;
            color: #00ff11;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            opacity: 0.3;
            animation: matrixFallSimple ${3 + Math.random() * 4}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        // Génération du contenu de la colonne
        let content = '';
        for (let j = 0; j < 15; j++) {
            content += MatrixEffect.getRandomChar() + '<br>';
        }
        column.innerHTML = content;
        
        matrixContainer.appendChild(column);
    }
    
    // CSS pour l'animation simple
    const style = document.createElement('style');
    style.textContent = `
        @keyframes matrixFallSimple {
            0% { transform: translateY(-100px); opacity: 0; }
            10% { opacity: 0.6; }
            90% { opacity: 0.3; }
            100% { transform: translateY(100vh); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// ===== EFFETS SPÉCIAUX MATRIX =====
const MatrixEffects = {
    // Effet d'explosion Matrix
    explode: function(x, y) {
        const explosion = document.createElement('div');
        explosion.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 10px;
            height: 10px;
            background: #00ff41;
            border-radius: 50%;
            z-index: 1000;
            pointer-events: none;
            animation: matrixExplode 1s ease-out forwards;
        `;
        
        document.body.appendChild(explosion);
        
        // Suppression après l'animation
        setTimeout(() => {
            if (explosion.parentNode) {
                explosion.parentNode.removeChild(explosion);
            }
        }, 1000);
    },

    // Effet de scan Matrix
    scan: function() {
        const scanLine = document.createElement('div');
        scanLine.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00ff41, transparent);
            z-index: 1000;
            pointer-events: none;
            animation: matrixScan 2s ease-in-out;
        `;
        
        document.body.appendChild(scanLine);
        
        setTimeout(() => {
            if (scanLine.parentNode) {
                scanLine.parentNode.removeChild(scanLine);
            }
        }, 2000);
    },

    // Effet de glitch Matrix
    glitch: function(duration = 500) {
        if (MatrixEffect.canvas) {
            MatrixEffect.canvas.style.filter = 'hue-rotate(180deg) invert(1)';
            
            setTimeout(() => {
                MatrixEffect.canvas.style.filter = '';
            }, duration);
        }
    }
};

// CSS pour les effets spéciaux
const matrixEffectsCSS = `
    @keyframes matrixExplode {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(20);
            opacity: 0;
        }
    }
    
    @keyframes matrixScan {
        0% {
            top: 0;
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            top: 100%;
            opacity: 0;
        }
    }
`;

// Injection du CSS des effets
const matrixEffectsStyle = document.createElement('style');
matrixEffectsStyle.textContent = matrixEffectsCSS;
document.head.appendChild(matrixEffectsStyle);

// ===== GESTIONNAIRE D'ÉVÉNEMENTS MATRIX =====

// Effet de clic
document.addEventListener('click', function(e) {
    if (Math.random() > 0.7) { // 30% de chance
        MatrixEffects.explode(e.clientX, e.clientY);
    }
});

// Adaptation à la visibilité de la page
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        MatrixEffect.setIntensity(0.5); // Réduction de l'intensité
    } else {
        MatrixEffect.setIntensity(1); // Intensité normale
    }
});

// Auto-destruction sur certaines pages
window.addEventListener('beforeunload', function() {
    MatrixEffect.destroy();
});

console.log('🟢 Module Matrix Effect chargé');
