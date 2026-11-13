// ----------------------------------------------------------------
// Recode de Segrid | John Roy | 1973
// schéma ici : https://www.ragnardigital.art/collection/segrid
// ----------------------------------------------------------------

let filename          = 'Recoding_Segrid_John_Roy';
let bDrawGrid         = false;
let bDrawPatterns     = true;
let bDoExportSvg      = false; 

// ----------------------------------------------------------------
let palette           = {'paperColor':'#000', 'strokeColor':'#FFF'};

// ----------------------------------------------------------------
// Format du papier
let paperFormatCM      = [25,25]; // cm

// ----------------------------------------------------------------
let sliderMargin, sliderStrokeWeight, sliderRes, sliderNbLines, chkDrawGrid, chkDrawPatterns;

// ----------------------------------------------------------------
// Valeurs par défaut, laissées ensuite au hasard et/ou à l'utilisateur
let params = 
{
  'margin' : 0.05, // %
  'sw' : 0.4, // mm
  'res' : 17,
  'nbLinesMin' : 1,
  'nbLinesMax' : 9,
  'nbLinesHalfCell' : 5
}

// ----------------------------------------------------------------
// Valeurs définies par l'utilisateur depuis l'interface
let userParams = {}

// ----------------------------------------------------------------
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


// ----------------------------------------------------------------
function setup() 
{
  // Création du canvas
  createCanvas(800, floor(800/paperRatio()));
  setSvgResolutionDPCM(Math.floor(width/paperFormatCM[0]));  

  // Création de l'interface avec les paramètres
  setupUI();

  // pas de boucle, on dessine une seule fois
  noLoop();
}

// ----------------------------------------------------------------
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
  params.res = random_int(10,20);
  
  // Écrase avec les valeurs de l'utilisateur
  for (var p in userParams)
    params[p] = userParams[p];
  
  updateUI();


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
    for (let j=0; j<r; j++)
    {
      for (let i=0; i<r; i++)
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
  if (!userParams.seed)
  {
    userParams.seed = Date.now();
    console.log(`Choosing seed : ${userParams.seed}`);
  }
  random_dec = PRNG.Alea(userParams.seed);
}


// ----------------------------------------------------------------
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
function setupUI()
{
    // Création du conteneur
    ui = new UIContainerFoldable({'title' : 'MAGBa3 — Recoding'});

    let lblInfos = 
      UI.label().text(`Dimensions : ${width}x${height}px / ${paperFormatCM[0]}x${paperFormatCM[1]}cm`).addClass('small').addClass('grey');

    sliderMargin = 
      new UISlider({'label': 'Margin (% of width)', 'min':0.05,'max':0.3,'step':0.01})
      .change( value => { userParams.margin = +(value); redraw() } );

    sliderStrokeWeight = 
      new UISlider({'label': 'Stroke weight (mm)', 'min':0.1,'max':1.0,'step':0.01})
      .change( value => { userParams.sw = +(value); redraw() } );

      sliderRes = 
      new UISlider({'label': 'res', 'min':10,'max':20,'step':1})
      .change( value => { userParams.res = parseInt(value); redraw() } );

    sliderNbLines = 
      new UISliderRange({'label' : 'Nb lines', 'range':[1,10],'rangeDeltaMin':1,'step':1})
      .change( value => {
        params.nbLinesMin = value[0];
        params.nbLinesMax = value[1];
        redraw();
      } )

    chkDrawGrid = 
      new UICheckbox({'label' : 'Draw grid'})
      .change( value=>{ bDrawGrid = value; redraw() } ).addClass('mb')

    chkDrawPatterns = 
      new UICheckbox({'label' : 'Draw patterns'})
      .change( value=>{ bDrawPatterns = value; redraw() } ).addClass('mb')

    btnExport      = new UIButton({'label' : 'Save PNG'}).addClass('mb').click( _ => save(`${filename}.png`) );
    btnExportSVG   = new UIButton({'label' : 'Save SVG'}).addClass('mb').click( _ => { bDoExportSvg=true ; redraw(); } );
    
    // Ajout des contrôles au conteneur
    ui.child_( [lblInfos,sliderMargin, sliderStrokeWeight, sliderRes, sliderNbLines, chkDrawGrid, chkDrawPatterns, btnExport, btnExportSVG] );

    // Enfin, ajout de l'élément d'interface au body (la div #ui-user doit être dans index.html)
    document.getElementById("ui-user").appendChild( ui.elmt() );
}

// --------------------------------
function updateUI()
{
  sliderMargin        .val( params.margin );
  sliderRes           .val( params.res );
  sliderStrokeWeight  .val( params.sw );
  sliderNbLines       .val( [params.nbLinesMin, params.nbLinesMax] );
  chkDrawGrid         .val( bDrawGrid );
  chkDrawPatterns     .val( bDrawPatterns );
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
