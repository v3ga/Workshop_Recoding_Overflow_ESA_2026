# Recoding : aux origines de l'art génératif
Recoding est un court workshop qui explore la logique des premiers temps de l'art génératif à travers la réinterprétation d'une œuvre historique : [Segrid](https://recodeproject.com/artworks/v2n3-segrid) (1973) de John Roy.

Il se tiendra à <a href="https://overflow.gallery/fr/events/workshop-recoding-v3ga/" target="_blank">la galerie Overflow</a> le 15 novembre 2026 et à <a href="https://www.saint-luc.be/" target="_blank">l'ESA Saint-Luc</a> le 16 novembre 2026.

<a href="https://ragnar-digital.transforms.svdcdn.com/production/images/artwork/Segrid_John_Roy_11102025.jpg?w=3000&q=80&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1762802771&s=b11859ba603d3e7d3b4557bd47581e77"><img src="https://ragnar-digital.transforms.svdcdn.com/production/images/artwork/Segrid_John_Roy_11102025.jpg?w=3000&q=80&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1762802771&s=b11859ba603d3e7d3b4557bd47581e77" height="400px" /></a><a href="https://ragnar-digital.transforms.svdcdn.com/production/images/artwork/20250520_153540.jpg?w=3000&q=80&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1762802772&s=0bff021494e504b75e6a006a5467d0a5"><img src="https://ragnar-digital.transforms.svdcdn.com/production/images/artwork/20250520_153540.jpg?w=3000&q=80&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1762802772&s=0bff021494e504b75e6a006a5467d0a5" height="400px" /></a>
<span style="font-size:12px"><em>Images utilisées avec l'autorisation de Ragnar Digital</em></span>



## À propos
Les participant·es partiront d'un « recode » contemporain de l'œuvre originale en [p5js](https://p5js.org/) — un programme qui recrée le système visuel et la structure de l'œuvre. Une interface minimale sera fournie, permettant d'interagir directement avec les paramètres du système et d'explorer rapidement des variations visuelles sans partir de zéro.

Le workshop se concentrera sur la manière dont l'image est construite à partir de règles, de répétitions, de variations et de contraintes algorithmiques, dans la lignée des approches développées par les pionniers de l'art informatique dans les années 1960 et 1970. À partir de cette base de code commune, les participant·es créeront leurs propres itérations et mutations de l'œuvre.

Une sélection d'itérations sera également tracée sous forme de dessins physiques à l'aide de traceurs de plume modernes et anciens.

## Programme
* 10h - 10h45 : présentation Julien + outils (p5js, plotters AxiDraw + Roland DXY) 
* 11h - 13h : début de la session, template fourni pour cadrer
* 14h - 16h30 : itérations, productions
* 16h30 - 18h : impression + affichage

## Sketches
* [Template](https://editor.p5js.org/v3ga/sketches/lD0uUIE_g)
* [Sketch avec paramètres aléatoires et interface](https://editor.p5js.org/v3ga/sketches/GEq3U8fdO)

## Marche à suivre
### La méthode simple
* Rendez-vous sur https://editor.p5js.org/v3ga/sketches/lD0uUIE_g
* Dupliquez le sketch, modifiez le code, il est prêt pour être tracé !

### L'autre méthode
Il n'est pas obligatoire d'installer et de lancer le projet pour ce workshop, mais cela est utile pour manipuler facilement des SVG et générer des commandes HPGL pour le traceur Roland DXY.

##### Prérequis
Un environnement ```python``` est nécessaire pour lancer le serveur.
Note pour les utilisateurs de Mac : si ```python``` ne fonctionne pas, remplacez-le par ```python3``` dans les commandes suivantes.

##### Téléchargement
Clonez ou téléchargez ce dépôt.

##### Installation et exécution
Nous allons d'abord créer un environnement virtuel pour le serveur.
Dans un terminal, saisissez les commandes suivantes :
```bash
# Remplacez [path] par l'emplacement du dépôt sur votre système
cd [path] 
```
```bash
python -m venv .venv
```

Puis activez l'environnement virtuel :

**MacOS / Linux**
```bash
source .venv/bin/activate
```
**Windows**
```bash
.\.venv\Scripts\Activate.ps1
```

Une fois l'environnement virtuel activé, installez les dépendances du projet listées dans le fichier ```requirements.txt``` :
```bash
pip install -r requirements.txt
```
Et voilà ! Vous devriez pouvoir lancer le serveur.

##### Lancement du serveur
```bash
python ./server.py
```
Si tout s'est bien passé, vous pouvez ouvrir ```http://127.0.0.1:8080``` dans votre navigateur et naviguer dans les exemples.

## Référence rapide
Les fichiers ```utils.js``` et ```sketch.js``` contiennent des fonctions utiles pour le workshop.

#### Fonctions aléatoires
```js
// nombre aléatoire entre 0 et 1
// random_dec est initialisée dans setup() avec une fonction PRNG personnalisée
let rnd = random_dec()
// nombre aléatoire entre a et b (exclu)
let rnd = random_between(a,b)
// entier aléatoire entre a (inclus) et b (inclus)
let rnd = random_int(a,b)
// booléen aléatoire
let is = random_bool()
// valeur aléatoire parmi les éléments d'un tableau
let rnd_item = random_choice(a)
```
#### Géométrie
```js
// Récupère un sommet de la grille en (i,j)
let v = getVertex(i,j)
// Met à l'échelle un tableau de p5.Vector depuis son centroïde
let verticesScaled = scaleVertices(vertices, s=1.0)
// Calcule des hachures orientées pour un tableau de sommets (p5.Vector)
// Renvoie [ [A,B], [A,B], ... ]
let lines = getHatches(vertices, angle, step);
```
#### Calcul
```js
// Calcule la position et les dimensions de la grille en fonction de la marge définie par l'utilisateur
let [xGrid,yGrid,dimGrid] = getGridInformation()
// Convertit des millimètres en pixels (selon le format du papier)
let px = mmToPx(mm)
// Ratio du papier
let ratio = paperRatio()
```

## Bibliothèques et outils
* [Golan Levin / p5.plotSvg](https://github.com/golanlevin/p5.plotSvg/)<br />*Bibliothèque p5.js pour exporter des fichiers SVG adaptés au tracé au plotter.*
* [Antoine Beyeler / vpype](https://github.com/abey79/vpype)<br />*vpype est le couteau suisse en ligne de commande pour le graphisme vectoriel destiné aux traceurs.*

## Liens
* [Le projet ReCode](https://recodeproject.com/)<br />*Le projet ReCode est une initiative communautaire visant à préserver l'art informatique en le traduisant dans un langage de programmation moderne (Processing / p5js).*
* [Zach Lieberman / Recreating The Past](https://rtp.media.mit.edu/)<br />*Dans Recreating the Past, nous étudions l'art computationnel des dernières décennies et recréons ces œuvres avec des techniques contemporaines afin d'acquérir des connaissances esthétiques, analytiques et techniques.*
* [Yseul Song / Re-coded](https://yeseul.com/Re-coded)<br />*La School for Poetic Computation a étudié cinq pionniers des médias computationnels et recréé leurs projets avec des outils contemporains comme OpenFrameworks et Processing. Une cinquantaine de sketches ont été réalisés et présentés sur deux murs LED de 9 pieds x 9 pieds.*
* [Lycée Le Corbusier à Strasbourg](https://www.lyceelecorbusier.eu/p5js/?page_id=2861)<br />*Collection de sketches*
* [Julien Gachadoat / Dessins géométriques et artistiques avec votre micro-ordinateur](https://github.com/v3ga/dessins_geometriques_et_artistiques)
* [Julien Gachadoat / Nouveaux dessins géométriques et artistiques avec votre micro-ordinateur](https://github.com/v3ga/nouveaux_dessins_geometriques_et_artistiques)<br />*Ces dépôts présentent les programmes écrits par le mathématicien et informaticien français Jean-Paul Delahaye dans les livres « Dessins géométriques et artistiques avec votre micro-ordinateur » et « Nouveaux dessins géométriques et artistiques avec votre micro-ordinateur », publiés en 1985 aux éditions Eyrolles.*

### Traceurs
* [Brian Boucheron / awesome-plotters](https://github.com/beardicus/awesome-plotters)<br />*Une liste commentée de codes et de ressources pour les machines à dessiner pilotées par ordinateur et autres robots artistiques.*
* [Julien Dorra / 3D printable plotter adapters for pens and refills](https://github.com/juliendorra/3D-printable-plotter-adapters-for-pens-and-refills)<br />*Utilisez vos stylos contemporains préférés sur de vieux traceurs HP grâce à ce code OpenSCAD paramétrique pour créer des adaptateurs sur mesure.*
* [Roland DXY-1300 -1200 -1100 Command Reference Manual](https://archive.org/details/rolanddxy130012001100commandreferencemanualaf)

### Générateurs de nombres aléatoires
* [A Million Random Digits with 100,000 Normal Deviates](https://www.rand.org/pubs/monograph_reports/MR1418.html)<br />*Toujours la plus grande source connue de chiffres aléatoires et d'écarts normaux, cet ouvrage est couramment utilisé par les statisticiens, physiciens, sondeurs, analystes de marché, gestionnaires de loteries et ingénieurs qualité.*
* [List of random number generators](https://en.wikipedia.org/wiki/List_of_random_number_generators)<br />*Les générateurs de nombres aléatoires sont importants dans de nombreuses applications techniques, notamment en physique, en ingénierie ou dans les études d'informatique mathématique.*
* [prng](https://github.com/dworthen/prng)<br />*Une collection de meilleurs PRNG*

### Histoire
* [v3ga / Computer & Computer art history](https://github.com/v3ga/computer_history)<br />*Un ensemble de liens sur l'histoire de l'informatique et du code (liens en anglais et en français)*
