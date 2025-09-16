# 🎮 CYBER ESCAPE GAME - Operation Digital Lockdown

![Cyber Security](https://img.shields.io/badge/Cybersecurity-Education-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)

## 📖 Description

Escape Game numérique de sensibilisation à la cybersécurité conçu pour les étudiants de première année d'études supérieures. Les participants doivent résoudre 6 énigmes en 30 minutes pour neutraliser une cyberattaque simulée.

## 🎯 Objectifs pédagogiques

- Sensibiliser aux enjeux de la cybersécurité
- Identifier les principales menaces numériques
- Adopter les bonnes pratiques de sécurité informatique
- Développer des réflexes de protection des données

## 🎲 Les 6 Énigmes

1. **🔐 Déchiffrage de mot de passe** - Cryptographie basique
2. **📧 Détection de phishing** - Analyse d'emails suspects
3. **🧩 Puzzle cryptographique** - Reconstitution de QR Code
4. **📶 Scanner Wi-Fi** - Identification de réseaux dangereux
5. **👤 Ingénierie sociale** - Analyse de profils sociaux
6. **💻 Code maître** - Terminal de neutralisation finale

## 🚀 Installation et déploiement

### Déploiement sur GitHub Pages

1. **Cloner ce repository**
```bash
git clone https://github.com/[VOTRE-USERNAME]/cyber-escape-game.git
cd cyber-escape-game
```

2. **Activer GitHub Pages**
- Settings > Pages > Source: Deploy from a branch > main

3. **Accéder au jeu**
- URL : `https://[VOTRE-USERNAME].github.io/cyber-escape-game/`

### Déploiement local

```bash
# Serveur Python simple
python -m http.server 8000

# Ou avec Node.js
npx http-server

# Puis ouvrir : http://localhost:8000
```

## 👥 Organisation des équipes

### Génération des QR Codes d'équipes

```javascript
// Utiliser ce script pour générer les QR codes
const teams = ['TEAM01', 'TEAM02', 'TEAM03', 'TEAM04', 'TEAM05', 'TEAM06', 'TEAM07', 'TEAM08'];
const baseURL = 'https://[VOTRE-USERNAME].github.io/cyber-escape-game';

teams.forEach(team => {
    const url = `${baseURL}?team=${team}`;
    const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
    console.log(`${team}: ${qrURL}`);
});
```

### Codes d'accès direct
- **Équipe 1 :** `?team=TEAM01`
- **Équipe 2 :** `?team=TEAM02`
- **Équipe 3 :** `?team=TEAM03`
- **Etc...**

## 🎮 Guide d'animation

### Matériel nécessaire
- **Projecteur** pour affichage du dashboard admin
- **8 appareils** (smartphones/tablettes/ordinateurs)
- **Connexion Internet** stable
- **QR Codes imprimés** pour chaque équipe

### Déroulement du cours (2h)
1. **Introduction** (15 min) - Présentation du cas Garmin
2. **Formation des équipes** (10 min) - Distribution QR codes
3. **Escape Game** (30 min) - Jeu en autonomie
4. **Débriefing** (15 min) - Discussion des solutions

### Interface animateur
- **URL Admin :** `/admin.html`
- **Fonctions :**
  - Suivi temps réel des équipes
  - Envoi de messages globaux
  - Distribution d'indices
  - Classement final

## 🛠️ Configuration technique

### Variables à personnaliser

```javascript
// Dans js/game.js - ligne 15
const COURSE_CONFIG = {
    duration: 30, // Durée en minutes
    teamsCount: 8, // Nombre d'équipes
    hintsEnabled: true, // Activer les indices
    adminPassword: 'cyber2024' // Mot de passe admin
};
```

### URLs importantes
- **Jeu :** `/index.html` ou `/game.html?team=TEAMXX`
- **Admin :** `/admin.html`
- **QR Generator :** `/qr-generator.html`

## 📊 Solutions des énigmes

### Énigme 1 - Déchiffrage
- **Code :** `12-15-7-9-14-50-50-52-52`
- **Solution :** `LOGIN2024` (L=12, O=15, G=7, I=9, N=14, puis 2024)

### Énigme 2 - Phishing
- **Emails suspects :** #1, #3, #6
- **Indices :** Fautes domaine, URLs suspectes, urgence artificielle

### Énigme 3 - Puzzle
- **Action :** Reconstituer le QR Code
- **Code révélé :** `DECRYPT7`

### Énigme 4 - Wi-Fi
- **Réseaux dangereux :** CAMPUS-SECU (faux), TP-LINK_DEFAULT, wifi_gratuit
- **Code :** `WIFI135`

### Énigme 5 - Social
- **Profil :** Julie Martin, Rome, Rex (chien), 2018
- **Mot de passe :** `RomeRex2018`
- **Code :** `SOCIAL9`

### Énigme 6 - Final
- **Calcul :** 2024+3+7+135+9 = 2178 → `REVENGE`

## 📈 Suivi et analytics

### Données collectées
- Temps par énigme
- Nombre de tentatives
- Indices utilisés
- Taux de réussite global

### Export des résultats
```javascript
// Dans admin.html - bouton "Export Résultats"
// Format CSV avec toutes les statistiques
```

## 🎓 Ressources pédagogiques

### Documents ANSSI utilisés
- Guide des bonnes pratiques informatiques
- 10 règles d'or de la sécurité numérique
- Cas d'étude Garmin (ransomware WastedLocker)

### Prolongements possibles
- **MOOC ANSSI** sur la cybersécurité
- **Certification PIX** - Compétences numériques
- **Challenge SecNumCloud** - Approfondissement

## 🤝 Contribution

### Comment contribuer
1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Push (`git push origin feature/amelioration`)
5. Créer une Pull Request

### Idées d'améliorations
- [ ] Mode multijoueur en réseau
- [ ] Nouvelles énigmes thématiques
- [ ] Support multilingue
- [ ] Mode hors-ligne complet
- [ ] Intégration avec des LMS (Moodle, etc.)

## 📞 Support

### En cas de problème technique
1. Vérifier la console navigateur (F12)
2. Tester sur un autre navigateur
3. Vider le cache navigateur
4. Créer une issue GitHub

### Contact
- **Issues GitHub :** Pour bugs et suggestions
- **Discussions :** Pour questions générales

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🏆 Remerciements

- **ANSSI** pour les ressources pédagogiques
- **CGPME** pour le guide des bonnes pratiques
- **Communauté cybersécurité** pour les retours

## 📚 Ressources complémentaires

### Liens utiles
- [ANSSI - Agence nationale de la sécurité des systèmes d'information](https://www.ssi.gouv.fr/)
- [CNIL - Commission nationale de l'informatique et des libertés](https://www.cnil.fr/)
- [Cybermalveillance.gouv.fr - Plateforme nationale d'assistance](https://www.cybermalveillance.gouv.fr/)

---

**🎮 Amusez-vous bien et restez cyber-vigilants ! 🛡️**
