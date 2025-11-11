# TimeForge – Front-End

Application front-end pour **TimeForge**, construite avec Angular.  
Ce projet fournit l’interface utilisateur pour le module CRM (“customer-wala”) et interagit avec le backend correspondant.  
Repo GitHub : https://github.com/walaghrairi24-afk/TimeForge-Front-end

## 🚀 Objectifs

- Offrir une interface utilisateur moderne pour les entités CRM (clients, contacts, interactions, etc.).  
- Utiliser Angular pour modularité, lisibilité et scalabilité.  
- S’intégrer avec le backend (microservices ou monolithique) de TimeForge.  
- Être prêt pour le déploiement (dev/prod) avec configuration distincte.

## 🧱 Architecture (vue d’ensemble)

```
[ Utilisateur ]  →  Browser (SPA Angular)  
                   - Modules Angular : dashboard, customer-wala, shared, core  
                   - Services HTTP vers API backend  
                   - Routage Angular, guards, lazy-loading  
```

### Structure typique des dossiers

```
src/
 ├─ app/
 │   ├─ core/         (singleton services, auth, interceptors)
 │   ├─ shared/       (composants, pipes, directives réutilisables)
 │   ├─ dashboard/    (DashboardComponent, etc)
 │   ├─ customer-wala/ (module CRM, listes, formulaires)
 │   ├─ app-routing.module.ts
 │   └─ app.module.ts
 ├─ assets/
 └─ environments/
     ├─ environment.ts
     └─ environment.prod.ts
```

## 🛠️ Stack technique

- Angular (version X) + TypeScript  
- HTML5 + SCSS  
- RxJS pour flux asynchrones  
- Angular Router  
- Services REST pour communiquer avec l’API backend  
- Possiblement des bibliothèques UI (ex. Angular Material, NgBootstrap ou autre)  
- Environnements de build : Angular CLI, Webpack, etc.  
- Build & déploiement dans dev/prod (ex. `ng build --prod`)

## 📦 Prérequis

- Node.js (version LTS)  
- npm ou yarn  
- Angular CLI installé globalement (optionnel)  
- Accès à l’API backend pour le bon fonctionnement.

## ▶️ Démarrage (local)

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/walaghrairi24-afk/TimeForge-Front-end.git
   cd TimeForge-Front-end
   ```
2. Installer les dépendances :
   ```bash
   npm install
   # ou
   yarn install
   ```
3. Configurer les environnements :
   - Vérifie `src/environments/environment.ts` et `environment.prod.ts`, adapte l’URL de l’API backend.  
4. Lancer l’application en mode développement :
   ```bash
   ng serve
   ```
   Par défaut l’application est accessible sur `http://localhost:4200/`  
5. Build pour production :
   ```bash
   ng build --prod
   ```

## 🔌 Configuration majeure

- `environment.ts` : endpoint backend, flags de logging, etc.  
- Guards & Interceptors : authentification/token, gestion erreurs globales.  
- Lazy-loading modules : Charger `customer-wala` uniquement quand besoin.  
- Style global & thèmes (SCSS variables) : pour cohérence UI.  

## ✅ Tests

Exécuter les tests unitaires :
```bash
ng test
```
Exécuter les tests end-to-end (si configuré) :
```bash
ng e2e
```

## 📁 Structure du repo (résumé)

```
TimeForge-Front-End/
├─ src/
│   ├─ app/
│   ├─ assets/
│   └─ environments/
├─ angular.json
├─ package.json
└─ README.md
```

## 🗺️ Roadmap (suggestions)

- Ajout d’un module « Reporting » (rapports de satisfaction client)  
- Mise en place de l’authentification (ex. JWT + refresh token)  
- Responsive design : mobile/tablette  
- Internationalisation (i18n)  
- Optimisation performance : lazy loading, pré-chargement, minification, lazy images

## 🤝 Contribuer

1. Fork du projet et crée ta branche feature : `feat/xxx`  
2. Ajoute des tests et respecte le style de code Angular (lint, formatting)  
3. Ouvre une Pull Request avec description claire du changement.

## 📜 Licence

Ce projet est fourni à titre pédagogique. Ajoute une licence (ex. MIT) si besoin.

## 👥 Auteurs

- [wala-ghrairi](https://github.com/walaghrairi24-afk)  
- [hadhemibelgacem](https://github.com/hadhemibelgacem)
