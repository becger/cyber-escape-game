// ===== DONNÉES COMPLÈTES DES ÉNIGMES =====

const EnigmasData = {
    // Configuration générale
    config: {
        totalEnigmas: 6,
        timeLimit: 30 * 60, // 30 minutes
        hintsEnabled: true,
        maxAttempts: 0, // 0 = illimité
    },

    // Énigme 1 - Déchiffrage de mot de passe
    enigma1: {
        id: 1,
        title: "🔐 ÉNIGME 1 : DÉCHIFFRAGE D'URGENCE",
        description: "Un mot de passe compromis a été intercepté sous forme chiffrée. Les hackers l'utilisent pour accéder aux systèmes critiques !",
        story: "L'équipe de sécurité a intercepté ce code lors d'une communication entre hackers. Chaque chiffre correspond à une lettre de l'alphabet. Déchiffrez-le rapidement !",
        
        data: {
            cipher: "12-15-7-9-14-50-50-52-52",
            alphabetHelper: "A=1 B=2 C=3 D=4 E=5 F=6 G=7 H=8 I=9 J=10 K=11 L=12 M=13 N=14 O=15 P=16 Q=17 R=18 S=19 T=20 U=21 V=22 W=23 X=24 Y=25 Z=26",
            method: "Chaque nombre correspond à une lettre : 12=L, 15=O, 7=G, 9=I, 14=N, puis les chiffres restants forment 2024"
        },
        
        solution: {
            answer: "LOGIN2024",
            explanation: "12=L, 15=O, 7=G, 9=I, 14=N + les chiffres 50-50-52-52 qui donnent 2024",
            code: "LOGIN2024",
            points: 100
        },
        
        hints: [
            "💡 Chaque nombre correspond à une lettre de l'alphabet (A=1, B=2, etc.)",
            "💡 Regardez bien : certains nombres correspondent à des lettres, d'autres à des chiffres",
            "💡 Les nombres 50, 50, 52, 52 ne correspondent pas à des lettres... que peuvent-ils représenter ?"
        ],
        
        validation: function(answer) {
            return answer.toUpperCase().replace(/\s+/g, '') === this.solution.answer;
        }
    },

    // Énigme 2 - Détection de phishing
    enigma2: {
        id: 2,
        title: "📧 ÉNIGME 2 : DÉTECTEUR DE PHISHING",
        description: "Des emails suspects circulent dans l'université. Identifiez ceux qui sont des tentatives de phishing avant qu'ils ne fassent des victimes !",
        story: "La messagerie universitaire a reçu plusieurs emails suspects. Votre mission : analyser chaque email et identifier ceux qui sont des tentatives de phishing.",
        
        data: {
            emails: [
                {
                    id: 1,
                    from: "securite@bank-creditt-agricol.com",
                    subject: "URGENT - Vérifiez votre compte immédiatement",
                    body: "Votre compte sera suspendu dans 24h si vous ne confirmez pas votre identité. Cliquez ici immédiatement : http://bank-verificaton.tk/login",
                    isPhishing: true,
                    clues: ["Faute dans le domaine (creditt-agricol)", "URL suspecte (.tk)", "Urgence artificielle", "Faute orthographique (verificaton)"]
                },
                {
                    id: 2,
                    from: "notifications@paypal.com",
                    subject: "Récapitulatif mensuel PayPal",
                    body: "Voici votre récapitulatif d'activité du mois dernier. Consultez vos transactions sur https://www.paypal.com/myaccount",
                    isPhishing: false,
                    clues: ["Domaine officiel", "URL HTTPS correcte", "Pas d'urgence", "Message cohérent"]
                },
                {
                    id: 3,
                    from: "admin@universite-campus.fr",
                    subject: "Maintenance serveur ce weekend",
                    body: "Maintenance prévue samedi. Changez votre mot de passe via ce lien sécurisé : http://bit.ly/campusmaint",
                    isPhishing: true,
                    clues: ["URL raccourcie suspecte", "Demande de changement de mot de passe par email", "Pas de HTTPS"]
                },
                {
                    id: 4,
                    from: "support@microsoft.com",
                    subject: "Mise à jour de sécurité importante",
                    body: "Une mise à jour critique est disponible. Téléchargez-la depuis votre compte Microsoft : https://www.microsoft.com/security",
                    isPhishing: false,
                    clues: ["Domaine officiel Microsoft", "URL HTTPS correcte", "Redirection vers site officiel"]
                },
                {
                    id: 5,
                    from: "contact@amazon.com",
                    subject: "Votre commande #AMZ789456123",
                    body: "Votre commande a été expédiée et arrivera demain. Suivez votre colis : https://www.amazon.fr/tracking",
                    isPhishing: false,
                    clues: ["Domaine officiel Amazon", "Numéro de commande réaliste", "URL correcte"]
                },
                {
                    id: 6,
                    from: "noreply@googlle.com",
                    subject: "Activité suspecte détectée sur votre compte",
                    body: "Une connexion depuis un nouvel appareil a été détectée. Sécurisez immédiatement votre compte : http://secure-google.tk/verify",
                    isPhishing: true,
                    clues: ["Faute dans le domaine (googlle)", "URL suspecte (.tk)", "Demande d'action immédiate"]
                }
            ]
        },
        
        solution: {
            answer: [1, 3, 6], // IDs des emails de phishing
            explanation: "Les emails 1, 3 et 6 présentent des signes de phishing : fautes dans les domaines, URLs suspectes, urgence artificielle",
            code: "PHISH3",
            points: 150
        },
        
        hints: [
            "💡 Vérifiez attentivement les domaines des expéditeurs (fautes d'orthographe)",
            "💡 Méfiez-vous des URLs raccourcies et des domaines suspects (.tk, .ml)",
            "💡 L'urgence artificielle est une technique classique de phishing"
        ],
        
        validation: function(selectedEmails) {
            return JSON.stringify(selectedEmails.sort()) === JSON.stringify(this.solution.answer);
        }
    },

    // Énigme 3 - Puzzle cryptographique
    enigma3: {
        id: 3,
        title: "🧩 ÉNIGME 3 : PUZZLE CRYPTOGRAPHIQUE",
        description: "Un QR code contenant des informations critiques a été fragmenté. Reconstituez-le pour accéder au code secret !",
        story: "Les hackers ont fragmenté un QR code important en plusieurs morceaux. Votre mission : remettre les pièces dans le bon ordre pour révéler le message caché.",
        
        data: {
            pieces: [
                {
                    id: 1,
                    content: "█▀▀▀▀▀█",
                    position: {x: 0, y: 0},
                    correctPosition: {x: 0, y: 0}
                },
                {
                    id: 2,
                    content: " ▀▀█ █",
                    position: {x: 100, y: 0},
                    correctPosition: {x: 70, y: 0}
                },
                {
                    id: 3,
                    content: "▀▀▀▀▀█",
                    position: {x: 0, y: 50},
                    correctPosition: {x: 140, y: 0}
                },
                {
                    id: 4,
                    content: "█ ███ █",
                    position: {x: 100, y: 50},
                    correctPosition: {x: 0, y: 25}
                }
            ],
            
            completedQR: `
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
            `
        },
        
        solution: {
            answer: "puzzle_complete",
            explanation: "Une fois toutes les pièces correctement placées, le QR code révèle le message 'DECRYPT7'",
            code: "DECRYPT7",
            points: 125
        },
        
        hints: [
            "💡 Commencez par placer les coins du QR code",
            "💡 Les QR codes ont toujours des carrés de détection dans les coins",
            "💡 Glissez-déposez les pièces jusqu'à ce que l'image soit cohérente"
        ],
        
        validation: function(answer) {
            return answer === this.solution.answer;
        }
    },

    // Énigme 4 - Scanner Wi-Fi
    enigma4: {
        id: 4,
        title: "📶 ÉNIGME 4 : SCANNER WI-FI DE SÉCURITÉ",
        description: "Analysez ces réseaux Wi-Fi détectés sur le campus et identifiez ceux qui représentent une menace de sécurité !",
        story: "Votre scanner Wi-Fi a détecté plusieurs réseaux autour de l'université. Certains sont légitimes, d'autres sont des pièges tendus par les hackers.",
        
        data: {
            networks: [
                {
                    id: 1,
                    name: "CAMPUS-SECURE",
                    security: "WPA3",
                    signal: 95,
                    description: "Réseau officiel de l'université",
                    isDangerous: false,
                    reason: "Réseau officiel avec sécurité maximale"
                },
                {
                    id: 2,
                    name: "FreeWiFi-Guest",
                    security: "Open",
                    signal: 78,
                    description: "Réseau ouvert public",
                    isDangerous: true,
                    reason: "Réseau ouvert = données non chiffrées"
                },
                {
                    id: 3,
                    name: "CAMPUS-SECU",
                    security: "WEP",
                    signal: 88,
                    description: "Réseau qui ressemble au nom officiel",
                    isDangerous: true,
                    reason: "Nom similaire au vrai réseau (CAMPUS-SECURE) - Potentiel point d'accès pirate"
                },
                {
                    id: 4,
                    name: "iPhone_hotspot_Marie",
                    security: "WPA2",
                    signal: 67,
                    description: "Point d'accès personnel",
                    isDangerous: false,
                    reason: "Point d'accès personnel légitime"
                },
                {
                    id: 5,
                    name: "TP-LINK_DEFAULT",
                    security: "WEP (admin/admin)",
                    signal: 45,
                    description: "Routeur avec configuration par défaut",
                    isDangerous: true,
                    reason: "Configuration par défaut non modifiée = vulnérable"
                },
                {
                    id: 6,
                    name: "McDonaldsFree",
                    security: "Open",
                    signal: 34,
                    description: "Wi-Fi du restaurant",
                    isDangerous: false,
                    reason: "Wi-Fi légitime de restaurant (bien que ouvert)"
                },
                {
                    id: 7,
                    name: "CAMPUS-BACKUP",
                    security: "WPA3",
                    signal: 92,
                    description: "Réseau de sauvegarde officiel",
                    isDangerous: false,
                    reason: "Réseau de sauvegarde officiel sécurisé"
                },
                {
                    id: 8,
                    name: "wifi_gratuit",
                    security: "Open",
                    signal: 56,
                    description: "Nom générique suspect",
                    isDangerous: true,
                    reason: "Nom générique et vague = potentiellement piégé"
                }
            ]
        },
        
        solution: {
            answer: [3, 5, 8], // IDs des réseaux dangereux
            explanation: "CAMPUS-SECU (faux nom), TP-LINK_DEFAULT (config par défaut), wifi_gratuit (nom suspect)",
            code: "WIFI135",
            points: 175
        },
        
        hints: [
            "💡 Attention aux noms de réseaux qui ressemblent aux vrais mais avec des différences subtiles",
            "💡 Les équipements avec configuration par défaut sont très vulnérables",
            "💡 Méfiez-vous des noms de réseaux trop génériques ou vagues"
        ],
        
        validation: function(selectedNetworks) {
            return JSON.stringify(selectedNetworks.sort()) === JSON.stringify(this.solution.answer);
        }
    },

    // Énigme 5 - Ingénierie sociale
    enigma5: {
        id: 5,
        title: "👤 ÉNIGME 5 : INGÉNIERIE SOCIALE",
        description: "Analysez ce profil social pour déduire le mot de passe probable de cette personne. L'ingénierie sociale est l'arme préférée des hackers !",
        story: "Les hackers ont trouvé le profil social de Julie Martin, employée IT. Utilisez les informations publiques pour deviner son mot de passe.",
        
        data: {
            profile: {
                name: "Julie Martin",
                age: 28,
                location: "Rome (actuellement)",
                birthPlace: "Rome",
                job: "TechCorp - Équipe IT",
                pet: {
                    name: "Rex",
                    type: "Chien",
                    adoptionYear: 2018,
                    age: 6
                }
            },
            
            posts: [
                {
                    id: 1,
                    content: "🏛️ En vacances à Rome ! Magnifique ville où je suis née ❤️ #VacancesRome #Patrimoine",
                    location: "Rome, Italie",
                    clue: "Lieu de naissance révélé"
                },
                {
                    id: 2,
                    content: "🐕 Mon chien Rex fête ses 6 ans aujourd'hui ! Adopté en 2018, c'est mon fidèle compagnon 💕 #DogLover #Rex",
                    clue: "Nom de l'animal et année d'adoption"
                },
                {
                    id: 3,
                    content: "👔 Premier jour chez TechCorp ! Fière de rejoindre l'équipe IT. Nouveau badge, nouveaux défis ! 💻",
                    clue: "Employeur actuel"
                },
                {
                    id: 4,
                    content: "🎂 Merci pour tous vos messages d'anniversaire ! 28 ans et toujours aussi motivée ! 🎉",
                    clue: "Âge révélé"
                }
            ],
            
            passwordPattern: "Les gens utilisent souvent : lieu de naissance + nom d'animal + année importante"
        },
        
        solution: {
            answer: "RomeRex2018",
            explanation: "Combinaison du lieu de naissance (Rome) + nom du chien (Rex) + année d'adoption (2018)",
            code: "SOCIAL9",
            points: 200,
            alternativeAnswers: ["romerex2018", "Rome_Rex_2018", "Rome-Rex-2018"]
        },
        
        hints: [
            "💡 Les informations personnelles les plus utilisées dans les mots de passe : lieux, animaux, dates",
            "💡 Regardez bien les posts : lieu de naissance + nom du chien + année importante",
            "💡 Essayez de combiner : Rome + Rex + 2018"
        ],
        
        validation: function(answer) {
            const cleanAnswer = answer.toLowerCase().replace(/[^a-z0-9]/g, '');
            const correctAnswers = [
                this.solution.answer.toLowerCase(),
                ...this.solution.alternativeAnswers.map(alt => alt.toLowerCase().replace(/[^a-z0-9]/g, ''))
            ];
            return correctAnswers.includes(cleanAnswer);
        }
    },

    // Énigme 6 - Terminal final
    enigma6: {
        id: 6,
        title: "💻 ÉNIGME FINALE : CODE MAÎTRE DE NEUTRALISATION",
        description: "Utilisez tous les codes obtenus pour calculer le code maître et neutraliser définitivement l'attaque ! L'avenir de l'université dépend de vous !",
        story: "Vous voici à la dernière étape ! Le terminal de neutralisation attend le code maître. Utilisez tous les codes collectés pour le calculer selon l'algorithme de sécurité.",
        
        data: {
            requiredCodes: ["LOGIN2024", "PHISH3", "DECRYPT7", "WIFI135", "SOCIAL9"],
            algorithm: {
                step1: "Extraire tous les chiffres de chaque code",
                step2: "Additionner tous ces chiffres",
                step3: "Appliquer la transformation finale selon la table de conversion",
                calculation: "2024 + 3 + 7 + 135 + 9 = 2178",
                transformation: "2178 → Code final selon table secrète"
            },
            
            conversionTable: {
                "2178": "REVENGE",
                explanation: "2178 correspond au code REVENGE dans la table de conversion secrète"
            }
        },
        
        solution: {
            answer: "REVENGE",
            explanation: "Somme de tous les chiffres : 2024+3+7+135+9=2178, qui se transforme en REVENGE",
            code: "REVENGE",
            points: 300
        },
