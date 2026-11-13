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
// Disponibles : [15,15] [25,25] [21,29.7]
let paperFormatCM      = [25,25]; // cm

// --------------------------------
let canvasW            = 600; // pixels

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
function setup() 
{
  // Création du canvas
  createCanvas(canvasW, floor(canvasW/paperRatio()));
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
  
  // Export SVG
  if (bDoExportSvg)
    beginRecordSvg(this, `${filename}.svg`);

  // Motifs
  if (bDrawPatterns)
  {
    let [xGrid,yGrid,dimGrid] =  getGridInformation();

    let r           = params.res;
    let step        = dimGrid/r;
    let cx          = (r - 1) / 2;
    let cy          = (r - 1) / 2;
    let dMax        = floor(r / 2);
    
    strokeWeight( mmToPx(params.sw) );
    for (let j=0; j<r; j++)
    {
      for (let i=0; i<r; i++)
      {
        // Coordonnées de la cellule (i,j)
        let x = xGrid + i*step;
        let y = yGrid + j*step;

        // Densité
        let dst = max(abs(i - cx), abs(j - cy));
        let n   = map(dst / dMax,0,params.nbLinesMin,params.nbLinesMax,1);

        // Dessin du motif
        drawPatternSegrid(x,y,step,i,j,n);              
      }
    }
  }

  // Fin de l'export SVG
  if (bDoExportSvg)
  {
    endRecordSvg();
    bDoExportSvg = false;
  }

}

// --------------------------------
// Fonction dans laquelle les participants vont travailler
// (x,y) : position de la cellule
// d     : largeur/hauteur de la cellule
// (i,j) : coordonnées de la cellule
// n     : densité
function drawPattern(x,y,d,i,j,n)
{
  
}

// --------------------------------
// Fonction dans laquelle les participants vont travailler
// (x,y) : position de la cellule
// d     : largeur/hauteur de la cellule
// (i,j) : coordonnées de la cellule
// n     : densité
function drawPatternSegrid(x,y,d,i,j,n)
{
  let d2  = d/2;
  let gap = d2 * 1/params.nbLinesHalfCell;
  
  push();
  translate(x+d2, y+d2);

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
function drawGrid()
{
  push();
  stroke(255,120);
  strokeWeight(1);

  let r = params.res;
  let [xGrid,yGrid,dimGrid] =  getGridInformation();
  for (let i=0; i<=r; i++)
  {
     let x = map(i,0,r,xGrid,xGrid+dimGrid);
     line(x,yGrid,x,yGrid+dimGrid);
  }  
  for (let j=0; j<=r; j++)
  {
     let y = map(j,0,r,yGrid,yGrid+dimGrid);
     line(xGrid,y,xGrid+dimGrid,y);
  }  
  pop();
}

// --------------------------------
function getGridInformation()
{
  let margin      = params.margin;
  let m           = min(width,height)*margin;
  let dimGrid     = min(width,height)-2*m;
  let xGrid       = (width-dimGrid)/2;
  let yGrid       = (height-dimGrid)/2;
  return [xGrid,yGrid,dimGrid];
}

// --------------------------------
function getVertex(i,j)
{
  let [xGrid,yGrid,dimGrid] =  getGridInformation(); // TODO : devrait être stocké quelque part
  let r           = params.res;
  let step        = dimGrid/r;
  return createVector(xGrid + i*step, yGrid + j*step);
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
