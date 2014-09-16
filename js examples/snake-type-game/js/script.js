window.onload = init;
var kierunek = 2;
var elems = new Array();
var top;
var left;
var startgame;
var punkty = 0;
var snake = [[10,10],[10,11],[10,12],[10,13]];
var enemy = [[0,0]];

function init(){
	$('.koniec').hide();
	for(i=0;i<20;i++){
		elems[i] = new Array();
		for(j=0;j<30;j++){
			elems[i][j] = document.createElement('p');
			elems[i][j].style.width = 20;
			elems[i][j].style.height = 20;
			elems[i][j].style.position = "absolute";
			elems[i][j].style.background = "#444";
			elems[i][j].style.left = j*20;
			elems[i][j].style.top = i*20;
			elems[i][j].innerHTML = ".";
			document.getElementById("wrapper").appendChild(elems[i][j]);
		}
	}
	$('.newgame').click(function(){
		clearInterval(startgame);
		punkty = 0;
		snake = [[10,10],[10,11],[10,12],[10,13]];
		$('.points').text("Zdobyte punkty: "+punkty);
		$('.koniec').hide();
		$('.maininfo').text("Gra w toku");
		$('.adinfo').text("Poziom 1 - BUCHU");
		kierunek = 2;
		for(i=0;i<20;i++){
			for(j=0;j<30;j++){
				elems[i][j].style.background="#444";
			}
		}
		losujWroga();
		
		startgame = setInterval(rysuj,150);
		
	});
	$('.pause').click(function(){
		clearInterval(startgame);
		$('.maininfo').text("Gra zatrzymana");
	});
	$('.continue').click(function(){
		startgame = setInterval(rysuj,150);
		$('.maininfo').text(" w toku");
	});
	//parametry startowe
	losujWroga();
	var t=setTimeout("startgame = setInterval(rysuj,150);",500);
	
	
	//startgame = setInterval(rysuj,150);
	
	$('body').bind('keydown',zmianaKier);
}

function rysuj(){
	if(punkty==10){
		clearInterval(startgame);
		$('.adinfo').text("Poziom 2 - STAR");
		startgame = setInterval(rysuj,130);
	}
	if(punkty==20){
		clearInterval(startgame);
		$('.adinfo').text("Poziom 3 - NUNCHA");
		startgame = setInterval(rysuj,110);
	}
	if(punkty==30){
		clearInterval(startgame);
		$('.adinfo').text("Poziom 4 - POLE");
		startgame = setInterval(rysuj,90);
	}
	if(punkty==40){
		clearInterval(startgame);
		$('.adinfo').text("Poziom 5 - NEEDLE");
		startgame = setInterval(rysuj,70);
	}
	if(punkty==50){
		clearInterval(startgame);
		$('.adinfo').text("Poziom 6 - SWORD");
		startgame = setInterval(rysuj,55);
	}
	if(punkty==60){
		clearInterval(startgame);
		$('.adinfo').text("Poziom 7 - BLUES");
		startgame = setInterval(rysuj,40);
	}
		for(i=0;i<snake.length;i++){
			elems[snake[i][0]][snake[i][1]].style.background="#369";
		}
		
		if(snake[snake.length-1][0]==enemy[0][0] && snake[snake.length-1][1]==enemy[0][1]){
			losujWroga();
			punkty++;
			$('.points').text("Zdobyte punkty: "+punkty);
			if(kierunek==1){
				snake.unshift([snake[snake.length-1][0],(snake[snake.length-1][1])-1]);
			}
			if(kierunek==2){
				snake.unshift([snake[snake.length-1][0],(snake[snake.length-1][1])+1]);
			}
			if(kierunek==3){
				snake.unshift([(snake[snake.length-1][0])-1,snake[snake.length-1][1]]);			
			}
			if(kierunek==4){
				snake.unshift([(snake[snake.length-1][0])+1,snake[snake.length-1][1]]);			
			}
		}
		
		elems[snake[0][0]][snake[0][1]].style.background="#444";
		elems[enemy[0][0]][enemy[0][1]].style.background="#963";
		snake.shift();
			
	if(kierunek==1){
		for(i=0;i<snake.length;i++){
			if(snake[i][0]==snake[snake.length-1][0] && snake[i][1]==(snake[snake.length-1][1])-1){					
				koniec();
			}
		}
		if(snake[snake.length-1][1]==0){
				koniec();
		}
			snake.push([snake[snake.length-1][0],(snake[snake.length-1][1])-1]);
	}
	if(kierunek==2){
		for(i=0;i<snake.length;i++){
			if(snake[i][0]==snake[snake.length-1][0] && snake[i][1]==(snake[snake.length-1][1])+1){					
				koniec();
			}
		}
		if(snake[snake.length-1][1]==29){
				koniec();
		}
		snake.push([snake[snake.length-1][0],(snake[snake.length-1][1])+1]);			
	}
	if(kierunek==3){
		for(i=0;i<snake.length;i++){
			if(snake[i][0]==(snake[snake.length-1][0])-1 && snake[i][1]==snake[snake.length-1][1]){					
				koniec();
			}
		}
		if(snake[snake.length-1][0]==0){
				koniec();
		}
		snake.push([(snake[snake.length-1][0])-1,snake[snake.length-1][1]]);			
	}
	if(kierunek==4){
		for(i=0;i<snake.length;i++){
			if(snake[i][0]==(snake[snake.length-1][0])+1 && snake[i][1]==snake[snake.length-1][1]){					
				koniec();
			}
		}
		if(snake[snake.length-1][0]==19){
				koniec();
		}
		snake.push([(snake[snake.length-1][0])+1,snake[snake.length-1][1]]);			
	}
}

function koniec(){
	alert("bum!");
	$('.koniec').fadeIn();
	$('.maininfo').text("Koniec gry");
	clearInterval(startgame);
}

function losujWroga(){
	var top;
	var left;
	top = Math.floor(Math.random()*20);
	left = Math.floor(Math.random()*30);	
	for(i=0;i<snake.length;i++){
		if(snake[i][0]==top && snake[i][1]==left){
			return losujWroga();
		}
	}
	enemy[0][0]=[top];
	enemy[0][1]=[left];
}

function zmianaKier(event){
	//lewo, prawo, gora, dol
	if(kierunek==1 || kierunek==3 || kierunek==4){
		if(event.keyCode==37){
			kierunek = 1;	
		}
	}
	if(kierunek==2 || kierunek==3 || kierunek==4){
		if(event.keyCode==39){
		kierunek = 2;
		}
	}
	if(kierunek==1 || kierunek==2 || kierunek==3){
		if(event.keyCode==38){
			kierunek = 3;
		}	
	}
	if(kierunek==1 || kierunek==2 || kierunek==4){
		if(event.keyCode==40){
			kierunek = 4;
		}
	}
}