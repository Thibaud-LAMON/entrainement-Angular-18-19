# entrainement-Angular-18-19

Formation personnelle à Angular 18 suivant ce cours en ligne https://www.youtube.com/watch?v=U71TQN68QGU. Sera suivi par une découverte d'Angular 19

## Cours 1 - Installation de l'environnement de dév

Pour faire tourner Angular, il faut :

- un env d'exécution JS ([Node.js](https://nodejs.org/en))
- un package manager (NPM)
- un IDE ([VSCode](https://code.visualstudio.com/download) ou autre)

Pour installer Angular :

```
npm uninstall -g @angular/cli cache clean #si déjà installé mais qu'on souhaite le màj
npm install -g @angular/cli
```

Dans VSCode : installer les extensions "Angular Essentials (Version 18)"" par **_John Papa_** et "Auto import" par **_steoates_**.

## Cours 2 - Premier projet

Pour créer un projet :

1. `ng new [nom-du-projet]`
2. Sélectionner son format de stylesheet (CSS, Sass, SCSS, Less)
3. Choisir si oui ou non, on active le rendu côté serveur (SSR)

Pour lancer le projet :

```
cd [nom-du-projet]
ng serve
```

Dans le dossier du projet on a :

- ../.angular : caching des fichier généré pendant le build pour le rendre plus rapide
- ../.vscode : fichiers de config et préférences de VSCode
- ../node_modules : dépendances
- ../src : code source
- .editorconfig : fichier de config pour l'IDE, contient indent size, charset, etc. Pas considéré par défaut, peut être ignoré. On peut l'utiliser avec l'extension EditorConfig for VSCode et npm install editorconfig
- .gitignore
- angular.json : config du projet, options de compil', chemins vers les fichiers sources, etc.
- package.json : indique les dépendances du projets
- package-lock.json : indique les versions des dépendances du projets
- README.md : instructions par défaut, normalement remplacées par des info spécifiques au projets
- tsconfig.json : config lors de la compilation de TS en JS
- tsconfig.app.json : hérite du précédent et ajoute des config spécifiques à la compilation de l'app
- tsconfig.spec.json : hérite de l'avant-dernier et ajoute des config spécifiques à la compilation des tests
- ../public : remplace le dossier assets présent dans src dans les verisons antérieures. Les ressources s'importent avec `import [dossier]/[ressource.format]`

Dans src :

- styles.css : CSS qui touche toute l'app
- main.ts : point d'entrée de l'app, lance le module principal de l'app
- index.html : c'est ici que s'affiche l'app
  ../app : comprend les ressources du composant principal de l'app (rendu en .html, style en .css, comportement en .ts, test unitaire en .spec.ts), app.config.ts configure les dépendances externes, app.routes.ts défini les routes qu'on mappe sur les composants
