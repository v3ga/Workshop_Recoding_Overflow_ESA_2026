// --------------------------------
// Recode de Segrid | John Roy | 1973
// schéma ici : https://www.ragnardigital.art/collection/segrid
// --------------------------------

let filename          = 'Recoding_Segrid_John_Roy';
let bDrawGrid         = false;
let bDrawPatterns     = true;
let bDoExportSvg      = false; 

// --------------------------------
let palette           = {'paperColor':'#000', 'strokeColor':'#FFF'};

// --------------------------------
// Format du papier
let paperFormatCM      = [25,25]; // cm

// --------------------------------
// Valeurs par défaut
let params = 
{
  'margin' : 0.05, // %
  'sw' : 0.4, // mm
  'res' : 17,
  'nbLinesMin' : 1,
  'nbLinesMax' : 9,
  'nbLinesHalfCell' : 5
}

// --------------------------------
// Fonction dans laquelle les participants vont travailler
// (x,y) : position de la cellule
// d     : largeur/hauteur de la cellule
// (i,j) : coordonnées de la cellule
// n     : densité
function drawPattern(x,y,d,i,j,n)
{
  let d2  = d/2;
  let gap = d2 * 1/params.nbLinesHalfCell;
  
  push();
  translate(x+d2, y+d2);

  let offset = d/(2*n)/2;
  for (let a=0;a<4;a++)
  {
    push();
    rotate(a*PI/2)
    let y = -d2+gap; 
    for (let k=0;k<n;k++)
    {
      line(-d2,y,0,y)
      y += gap;
    }
    pop();
    
  }
  
  pop();
}


// --------------------------------
function setup() 
{
  // Création du canvas
  createCanvas(800, floor(800/paperRatio()));
  setSvgResolutionDPCM(Math.floor(width/paperFormatCM[0]));  

  // pas de boucle, on dessine une seule fois
  noLoop();
}

// --------------------------------
function draw() 
{
  background(palette.paperColor);
  noFill();
  strokeCap(ROUND);
  stroke(palette.strokeColor);
  
  // Choix de paramètres aléatoires
  // Initialisation de la graine pour les appels aléatoires
  // Pour que la séquence de nombres aléatoires soit toujours la même
  setupRandomGenerator();
  // params.res = random_int(10,20);

  // Grille
  if (bDrawGrid)
    drawGrid();
  
  if (bDoExportSvg)
    beginRecordSvg(this, `${filename}.svg`);

  if (bDrawPatterns)
  {
    // Motifs
    let margin = params.margin;
    let r     = params.res;
    let mw    = margin*width; 
    let w     = width-2*mw;
    let mh    = 0.5*(height-w); 
    let d     = (width-2*mw)/r;
    let cx    = (r - 1) / 2;
    let cy    = (r - 1) / 2;
    let dMax  = floor(r / 2);
    
    strokeWeight( mmToPx(params.sw) );
    for (let [i,j] of getGridCellsOnionOrder(r))
    {
      // Coordonnées de la cellule (i,j)
      let x = mw+i*d;
      let y = mh+j*d;

      // Densité
      let dst = max(abs(i - cx), abs(j - cy));
      let n   = floor( map(dst / dMax,0,1, params.nbLinesMax, params.nbLinesMin) );

      // Dessin du motif
      drawPattern(x,y,d,i,j,n);
    }


  }
  if (bDoExportSvg)
  {
    endRecordSvg();
    bDoExportSvg = false;
  }

}

// --------------------------------
function setupRandomGenerator()
{
  if (!params.seed)
  {
    params.seed = Date.now();
    console.log(`Choosing seed : ${params.seed}`);
  }
  random_dec = PRNG.Alea(params.seed);
}


// --------------------------------
// Renvoie les coordonnées (i,j) d'une grille r x r ordonnées anneau par anneau,
// du périmètre extérieur vers l'intérieur, comme les couches d'un oignon.
function getGridCellsOnionOrder(r)
{
  let cells   = [];
  let maxRing = Math.ceil(r / 2);

  for (let ring=0; ring<maxRing; ring++)
  {
    let iStart = ring, iEnd = r-1-ring;
    let jStart = ring, jEnd = r-1-ring;

    if (iStart == iEnd && jStart == jEnd)
    {
      // il ne reste qu'une cellule au centre (r impair)
      cells.push([iStart, jStart]);
    }
    else if (iStart == iEnd)
    {
      // il ne reste qu'une colonne
      for (let j=jStart; j<=jEnd; j++)
        cells.push([iStart, j]);
    }
    else if (jStart == jEnd)
    {
      // il ne reste qu'une ligne
      for (let i=iStart; i<=iEnd; i++)
        cells.push([i, jStart]);
    }
    else
    {
      // ligne du haut, de gauche à droite
      for (let i=iStart; i<=iEnd; i++)
        cells.push([i, jStart]);
      // colonne de droite, de haut+1 à bas
      for (let j=jStart+1; j<=jEnd; j++)
        cells.push([iEnd, j]);
      // ligne du bas, de droite-1 à gauche
      for (let i=iEnd-1; i>=iStart; i--)
        cells.push([i, jEnd]);
      // colonne de gauche, de bas-1 à haut+1
      for (let j=jEnd-1; j>=jStart+1; j--)
        cells.push([iStart, j]);
    }
  }

  return cells;
}

// --------------------------------
function drawGrid()
{
  push();
  stroke(255,100,0,120);
  strokeWeight(1);

  let m = params.margin*width; 
  let r = params.res;
  for (let i=0; i<=r; i++)
  {
     let x = map(i,0,r,m,width-m);
     line(x,m,x,height-m);
  }  
  for (let j=0; j<=r; j++)
  {
     let y = map(j,0,r,m,height-m);
     line(m,y,width-m,y);
  }  
  pop();
}

// --------------------------------
function mmToPx(mm)
{
  return mm/(10*paperFormatCM[0]) * width;
}

// --------------------------------
function paperRatio()
{
  return paperFormatCM[0] / paperFormatCM[1]; 
}

// --------------------------------
function keyPressed()
{
  if (key == 'e')
  {
    bDoExportSvg = true;
    redraw();
  }
}