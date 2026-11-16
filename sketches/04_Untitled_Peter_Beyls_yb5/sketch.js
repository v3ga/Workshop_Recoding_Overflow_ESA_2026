// --------------------------------
// Recode de Untitled | Peter Beyls
// https://recodeproject.com/artworks/yb5-untitled-peter-beyls
// --------------------------------

let filename          = 'Untitled_Peter_Beyls';
let bDrawGrid         = true;
let bDrawPatterns     = true;
let bDoExportSvg      = false; 

// --------------------------------
let palette           = {'paperColor':'#FFF', 'strokeColor':'#000'};

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
  'res' : 17
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


        // Dessin du motif
        drawPatternBeyls(x,y,step,i,j)
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
function drawPatternBeyls(x,y,d,i,j)
{
  //let a = random_int(0,3) * PI/2;
  let a = floor( noise( 0.05*(x+d/2), 0.05*(y+d/2) ) * 4 ) * PI/2;

  let d2  = d/2;

  push();
  translate(x+d2, y+d2);
  rotate(a);

  beginShape();
  vertex(-d2,0);
  vertex(-d2,d2);
  vertex(0,0);
  vertex(d2,0);
  vertex(d2,-d2);
  vertex(0,-d2);

  endShape(CLOSE);

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
  noiseSeed(params.seed);
}


// --------------------------------
function drawGrid()
{
  push();
  stroke(0,60);
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
