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

## Cours 3 - Les composants

Composant : brique d'appli en charge d'un aspect spécifique de l'app, défini le contenu, style & comportement de la brique.

Un composant commence avec 4 fichier mais ne les a pas tous obligatoirement. On peut supprimer .spec.ts sans substitut, .html si on mets un paramètre template dans le décorateur @Component du .ts

Composant Angular = classe TS avec @Component + paramètres :

- selector : nom de la balise utilisable dans le HTML
- standalone : autrefois un composant vivait dans un module gérant les imports des composants et leurs dépendances, depuis Angular 17 plus besoin de module : les composants peuvent être standalones et depuis Angular 19 ils le sont par défaut.
- template : comprend le HTML du composant #loin d'être pratique car trop peu lisible
- styles : comprend le CSS du composant #loin d'être pratique car trop peu lisible
- templateUrl : permet d'importer un fichier .html pour le composant
- styleUrl : permet d'importer un fichier .css pour le composant
- imports : permet d'importer d'autres composants

Pour générer un composant : `ng generate component [nom-du-composant]` ou `ng g c [nom-du-composant]`
pour le générer sans tests : `ng g c [nom-du-composant] --skip-tests`

Pour afficher un composant dans un autre : on l'importe puis dans le code html, on y met la balise du composant importé

## Cours 4 - Les inputs & signal inputs

Pour afficher plusieurs cartes sans avoir besoin de créer un composant par carte on peut utiliser des inputs, des valeurs d'entrée passée au composant et utilisable comme propriété.

2 méthodes :

- **Le décorateur @Input** :

  Dans le fichier .component.ts ajouter @Input() devant un attribut.
  Puis dans le fichier .component.html aller dans la balise du composant et ajouter `attribut="valeur"` (NB: si la valeur est un number écrire `[attribut]="valeur"`).

  On peut aussi passer des objets plus complexe en créant un modèle contenant les données liés aux monstre :

  1. On commence pour cela par créer un dossier "models" dans le dossier "app" où on va créer une classe contenant les attributs avec une valeur par défaut.
  2. Remplacer les attributs du .component.ts par `@Input() [attribut]: [Modèle] = new [Modèle]()`.
  3. Dans le .component.html, remplacer les attributs par `{{[attribut].[attribut]}}`.
  4. app.component.html doit aussi être modifié, pour cela on commence par modifier le app.component.ts en déclarant une propriété du type du modèle créé `prop1: [Modèle] = new [Modèle]()` puis ajouter un constructeur avec les attributs et valeurs nécessaires.
  5. Dans app.component.html appeler le composant `<selector [attribut]="prop1"/>`.

  Un input peut être configuré pour être obligatoire : `@Input({ required : true})` ; Ou avoir un alias : `@Input({ alias : 'mon-alias'})` ; On peut aussi leur appliquer une transformation, recevoir une valeur en Input et la modifier avant de la stocker : `transform: (attributs) => {fonction}`

- **Les signal inputs**
  signal : sorte de warper se plaçant autour d'une valeur et qui notifie une partie du code qu'elle a changée.
  Plus besoin d'@Input dans le .component.ts, on le remplace par un attribut de type InputSignal : `attribut: InputSignal<type> = input(new Model())`. Puis dans le .component.html, remplacer les attributs par `{{[attribut]().[attribut]}}`.
  On peut aussi le customiser en le rendant obligatoire : `attribut: InputSignal<type> = input.required()` ; en lui donnant un alias : `attribut: InputSignal<type> = input(new Model(), {alias : 'mon-alias'})` ; ou en le transformant `attribut: InputSignal<type> = input(new Model(), {transform: (attributs) => {fonction}})`

## Cours 5 - Outputs, signal outputs et models

Pour ajouter un effet à un bouton au moment du clique, on utilise un évènement (click) `<button (click)="fonction()>"` la fonction est codée dans le .component.ts ;

Pour créer un évènement utilisé par AppComponent pour être notifié à chaque clique :

1. Créer dans le .component.ts un EventEmitter qui permet d'émettre un évènement et y ajouter le décorateur @Output : `@Output() maPropriété = new EventEmitter();`
2. Remplacer le code de la fonction de l'évènement par `this.maPropriété.emit() ;`
3. Dans app.component.html : `<selector (maPropriété)=fonction()>`

Pour renvoyer la valeur entrée dans la barre de recherche vers AppComponent :

1. Importer FromsModule dans AppComponent
2. Dans .component.ts : `@Input() nom = 'valeur initiale'`
3. Dans .component.html : `<input [ngModel]="nom" />`

Pour réagir aux modifications :

1. `(ngModelChange)="nomUpdate($event)` dans le même \<input>. $event est la variable dans laquelle est stockée la valeur émise par un event.
2. Dans le .component.ts :

```
@Output() nomOutput = new EventEmitter<type>();

nomUpdate(value: type) {
	this.nomOutput.emit(value);
}
```

3. Dans appComponent : créer une variable = ""
4. Dans le .component.html :

```
<selector (maPropriété)=fonction() [variable]="search" (nomOutput)="variable = $event">
Search: {{variable}}
```

\[variable\]="search" sert à initialiser la variable en input pour initialiser le composant avec le contenu de la variable

**IMPORTANT** : pour un output "name" et un input "nameChange", si on souhaite que l'output assigne la valeur de celui-ci à la variable de l'input, on peut utiliser une notation raccourcie :

```
[name]="name"
(nameChange)="name=$event"
```

devient :

```
[(name)]="name"
```

Cette méthode s'appelle du "Two-Way Binding (TWB)". Par contraste, les inputs et outputs sont des "One-Way Binding (OWB)".

@Output peut prendre un alias pour donner à l'output un nom différent de la variable du EventEmitter.

dans .component.ts :

```
@Output() name = new EventEmitter<type>();
@Output('alias') nameClicked = new EventEmitter();
```

dans app.component.html :

```
<app-search-bar (alias)="increaseCount()" [(search)]="search" /> // alias remplace nameClicked
```

Depuis Angular 17.3 plus besoin de @Output, on peut utiliser les signal outputs :

dans .component.ts :

```
@Output('alias') nameClicked = new EventEmitter();
//devient
nameClicked = output({alias : "alias"});
```

dans app.component.html :

```
<app-search-bar (alias)="increaseCount()" [(search)]="search" /> // alias remplace nameClicked
```

On peut faire encore plus simple avec la fonction model() :

dans .component.ts :

```
nameInput = input<string>('initialValue');
//devient
nameInput = model<string>('initialValue');
```

on efface le nameChange car model() créer un input et un outputChange, et il émet un input pour chaque changement de valeur.

```
nomUpdate(value: type) {
	this.nameInput.emit(value);
}
```

enfin on effectue le TWB sur ngModel dans .component.html :

`<input [(ngModel)]="search" />`

et on efface la fonction d'update
