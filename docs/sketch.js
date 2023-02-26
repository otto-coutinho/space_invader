let imagemNave;
let imagemMissil;
let imagemInimigo1;

let posicaoMissil;
let posicoesMisseis = new Array();


let posicaoNave;
let posicaoInimigo1;

let alienVivo = true;
let estaTocando;
let alienSpeed = 2;

//preparando ambiente de trabalho
function preload() {
  //carregar as imagens (fantasias)
  imagemNave = loadImage("imagens/spaceship.png");
  imagemInimigo1 = loadImage("imagens/Inimigo1.png");
  loadImage("imagens/Inimigo2.png");
  loadImage("imagens/Inimigo3.png");
  loadImage("imagens/Inimigo4.png");
  imagemMissil = loadImage("imagens/missel.png");
}

    //ao iniciar o jogo ("apertar na bandeira verde")
function setup() {
  // criando um cenário
  createCanvas(1000, 650);

  posicaoMissil = createVector(1001, 450);
  posicoesMisseis.push(createVector(1001, 450));
  posicaoInimigo1 = createVector(375, 50);
  posicaoNave = createVector(500, 450);

}
    //desenhando os atores (está rodando o tempo todo)
function draw(){
  // pintar o cenário (estou usando a base RGB)
  background(0, 0, 50);

  moveMissile();
      //subtrai por 100 porque defini a largura da nave como 200
  posicaoNave.x = mouseX-100
      //desenhar fantasias
  image(imagemMissil, posicaoMissil.x, posicaoMissil.y, 150, 150);
  image(imagemNave, posicaoNave.x, posicaoNave.y, 200, 200);

  missileColision();
  moveAlien();
  drawAlien();
  MissileDraw();
  
}

function mousePressed(){
  //atirar o missil
  posicoesMisseis.push(createVector(posicaoNave.x+25, posicaoNave.y-75));

}

function missileColision(){
  
  for(let posicao of posicoesMisseis){
    if(posicao.x + imagemMissil.width-230 < posicaoInimigo1.x ||
      posicaoInimigo1.x + imagemInimigo1.width-230 < posicao.x ||
      posicao.y > posicaoInimigo1.y + imagemInimigo1.height-200 ||
      posicao.y < posicaoInimigo1.y){
        estaTocando = false
      }else{
        alienVivo = false;
      }
      //condição para morte do alien
if(estaTocando == true){
  alienVivo = false;
}
  }
      //missil estrapolou os limites da fantasia do alien (|| significa OU)
      
}

function drawAlien(){
  //condição de existência do alien (quando desenhá-lo)
  if(alienVivo == true){
    image(imagemInimigo1, posicaoInimigo1.x, posicaoInimigo1.y, 150, 150);
  }
}

function moveAlien(){
  posicaoInimigo1.x = posicaoInimigo1.x + alienSpeed;
  if(posicaoInimigo1.x + imagemInimigo1.width > 1150 || posicaoInimigo1.x < 0){
    alienSpeed = alienSpeed * -1;
  }
}

function MissileDraw(){
    //para cada item da lista -> desenhar aquele ator
    for(let posicao of posicoesMisseis){
      image(imagemMissil, posicao.x, posicao.y, 150, 150);
    }
}

function moveMissile(){
   //para cada posição dentro da lista - mover missil (no p5js o y cresce pra baixo e diminui pra cima)
   for(let posicao of posicoesMisseis){
    posicao.y = posicao.y-2;
   }
}