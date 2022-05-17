var tamanhoBloco = 25;
var linhas = 20;
var colunas = 20;
var tela;
var ctx;

//cabeça
var xGabi = 5 * tamanhoBloco; 
var yGabi = 5 * tamanhoBloco;
var xVelocidade = 0;
var yVelocidade = 0;
//corpo
var corpoCobra = [];
//comida
var xSushi;
var ySushi;
//fim de jogo
var gameOver = false;

window.onload = function (){
    tela = document.getElementById("fundo-jogo");
    tela.width = linhas * tamanhoBloco;
    tela.height = colunas * tamanhoBloco;
    ctx = tela.getContext('2d');

    colocarComida();
    document.addEventListener('keyup',mudaDirecao);
    setInterval(update, 1000/9);

}

function update(){
    if (gameOver){
        return;
    }

    ctx.fillStyle = 'rgb(20, 33, 44)'; // fundo - azul-escuro
    ctx.fillRect(0, 0, tela.width,tela.height); // tela

    ctx.fillStyle = 'aliceblue'; //sushi - branco
    ctx.fillRect(xSushi, ySushi, (tamanhoBloco - 10), (tamanhoBloco - 10)); //comida


    if (xGabi == xSushi && yGabi == ySushi){ //Quando comer, add corpo e muda posição da comida.
        corpoCobra.push([xSushi,ySushi]);
        colocarComida();
    }
    for (let i = corpoCobra.length - 1 ; i > 0; i --) {
        corpoCobra [i] = corpoCobra[i-1];
    }
    if (corpoCobra.length){
        corpoCobra[0] = [xGabi,yGabi]
    }
    ctx.fillStyle= 'rgb(24, 214, 119)'; // verde - claro - cabeça
    xGabi += xVelocidade * tamanhoBloco;
    yGabi += yVelocidade  * tamanhoBloco;

    ctx.fillRect(xGabi,yGabi,tamanhoBloco,tamanhoBloco)

    for (let i = 0; i < corpoCobra.length; i++) {
        ctx.fillRect(corpoCobra[i][0], corpoCobra[i][1], tamanhoBloco, tamanhoBloco)
        
    }

    //Condições para fim do jogo
    if (xGabi < 0 || xGabi > colunas * tamanhoBloco || yGabi < 0 || yGabi > linhas * tamanhoBloco){
        gameOver = true;
        alert("Fim de jogo");
    }
    for (let i = 0; i < corpoCobra.length; i++) {
        if(xGabi == corpoCobra[i][0] && yGabi == corpoCobra[i][1]){
        gameOver = true;
        alert("Fim de jogo");
        }
    } 
}

function colocarComida(){
    xSushi = Math.floor(Math.random() * colunas) * tamanhoBloco;
    ySushi = Math.floor(Math.random() * linhas) * tamanhoBloco;

}

function mudaDirecao(event){
    
    if (event.code == "ArrowUp" && yVelocidade != 1){
        xVelocidade = 0 ;
        yVelocidade = -1;
    }else if (event.code == "ArrowDown" && yVelocidade != -1){
        xVelocidade = 0;
        yVelocidade = 1;
    }else if (event.code == "ArrowLeft" && xVelocidade != 1){
        xVelocidade = -1 ;
        yVelocidade = 0;
    }else if (event.code == "ArrowRight" && xVelocidade != -1){
        xVelocidade = 1;
        yVelocidade = 0;
    }
}
