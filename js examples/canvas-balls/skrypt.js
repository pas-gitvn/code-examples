
//deklaracje
var odswiez1;
var ctx;
ctx = $('#canvas')[0].getContext("2d");
var dx=0;
var dy=0;
var W=600;
var H=400;
var dragok=false;
var dragok2=false;
var dragok3=false;
var canvas;
var ktorakulka=0;
var parametrczas;
var zderzenie=0;
var zderzenie2=0;
var zderzenie3=0;
var zderzeniepoziom2=0;
canvas=document.getElementById("canvas");

//funkcja obiektu kulki (parametry wejściowe, kolor, rozmiar, pozycja wyjściowa na ekranie
//metody ustawiania i pobierania pozycji x,y
//metoda rysująca
function kulka(color,xpos, ypos, size, number){
	this.color=color;
	this.xpos=xpos;
	this.ypos=ypos;
	this.xpoczatkowe=xpos;
	this.ypoczatkowe=ypos;
	this.size=size;
	this.number=number;
	this.setNumber=setNumber;
	this.getNumber=function(){return this.number;};
	this.rysuj=rysuj;	
	this.setSize=setSize;
	this.getXpos=function(){return this.xpos;};
	this.getYpos=function(){return this.ypos;};
	this.setXpos=setXpos;
	this.setYpos=setYpos;
	this.setXpoczatkowe=setXpoczatkowe;
	this.setYpoczatkowe=setYpoczatkowe;
	this.getXpoczatkowe=function(){return this.xpoczatkowe;};
	this.getYpoczatkowe=function(){return this.ypoczatkowe;};
}
//metody - ustawianie parametrow
function setSize(pos){
	this.size=pos;
}
function setNumber(pos){
	this.number=pos;
}
function setXpos(pos){
	this.xpos=pos;
}
function setYpos(pos){
	this.ypos=pos;
}
function setXpoczatkowe(pos){
	this.xpoczatkowe=pos;
}
function setYpoczatkowe(pos){
	this.ypoczatkowe=pos;
}
//funkcja rysujaca kule o zadanych parametrach wejsciowych (pozycja x, pozycja y, rozmiar, kolor, tekst - liczba)
function rysuj(){
  
  ctx.beginPath();
  ctx.fillStyle    = '#'+this.color;
  ctx.arc(this.xpos, this.ypos, this.size, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
  
  
  ctx.fillStyle    = '#fff';
  ctx.font         = 'italic 30px sans-serif';
  ctx.textBaseline = 'left';
  if(this.number>=10){
	ctx.fillText  (this.number, this.xpos-20, this.ypos+8);
  }
  else{
	ctx.fillText  (this.number, this.xpos-10, this.ypos+8);
  }
   
}
//przechwytywanie kliknięcia - klawisz myszy
//zatrzymywanie interwału, wywołania funkcji animuj (gdy zostanie chwycona jakas kulka, poprzednie animacje zostaja zatrzymane, np. wyhamowujacy ruch kulki)
//obliczenie pozycji kursora na zasadzie roznic parametrow x oraz y okna przegladarki oraz przesuniecia canvas i rozmiaru kulki
//ustawienie parametru dragok i wywolanie funkcji ruch
//wywolanie odpowiedniej funkcji ruch w zaleznosci od chwyconej kulki
function klik(e){

if (e.pageX < kul1.getXpos() + 30 + canvas.offsetLeft && e.pageX > kul1.getXpos() - 30 + 
 canvas.offsetLeft && e.pageY < kul1.getYpos() + 30 + canvas.offsetTop && 
 e.pageY > kul1.getYpos() -30 + canvas.offsetTop){ 
  kul1.setXpos(e.pageX - canvas.offsetLeft); 
  kul1.setYpos(e.pageY - canvas.offsetTop); 
  dragok = true; 
  canvas.onmousemove = ruch; 
  clearInterval(parametrczas);

}else if (e.pageX < kul2.getXpos() + 30 + canvas.offsetLeft && e.pageX > kul2.getXpos() - 30 + 
 canvas.offsetLeft && e.pageY < kul2.getYpos() + 30 + canvas.offsetTop && 
 e.pageY > kul2.getYpos() -30 + canvas.offsetTop){ 
  kul2.setXpos(e.pageX - canvas.offsetLeft); 
  kul2.setYpos(e.pageY - canvas.offsetTop); 
  dragok2 = true; 
  canvas.onmousemove = ruch2; 
  clearInterval(parametrczas);

}else if (e.pageX < kul3.getXpos() + 30 + canvas.offsetLeft && e.pageX > kul3.getXpos() - 30 + 
 canvas.offsetLeft && e.pageY < kul3.getYpos() + 30 + canvas.offsetTop && 
 e.pageY > kul3.getYpos() -30 + canvas.offsetTop){ 
  kul3.setXpos(e.pageX - canvas.offsetLeft); 
  kul3.setYpos(e.pageY - canvas.offsetTop); 
  dragok3 = true; 
  canvas.onmousemove = ruch3; 
  clearInterval(parametrczas);

}
}

//uaktualnianie pozycji kulki, w przypadku, gdy caly czas jest przesuwana za pomoca myszy - klawisz wcisniety (aktualizacja x i y)
function ruch(e){
 if (dragok){

 ctx.clearRect(0, 0, W, H);
  kul1.setXpos(e.pageX - canvas.offsetLeft); 
  kul1.setYpos(e.pageY - canvas.offsetTop); 

	kul1.rysuj();
	kul2.rysuj();
	kul3.rysuj();  
 }
}
function ruch2(e){
 if (dragok2){
 ctx.clearRect(0, 0, W, H);
  kul2.setXpos(e.pageX - canvas.offsetLeft); 
  kul2.setYpos(e.pageY - canvas.offsetTop); 
  kul2.rysuj();
  kul1.rysuj();
kul3.rysuj();
 }
}
function ruch3(e){
 if (dragok3){
 ctx.clearRect(0, 0, W, H);
  kul3.setXpos(e.pageX - canvas.offsetLeft); 
  kul3.setYpos(e.pageY - canvas.offsetTop); 
  kul3.rysuj();
  kul1.rysuj();
kul2.rysuj();
 }
}
//funkcja wywolywana w przypadku zwolnienia klawisza myszy
//wywolanie okreslonej funkcji wyliczajacej w zaleznosci od tego ktora kulka zostala przesunieta
//funkcja wyliczajaca oblicza przesuniecie x i y, tak aby mozliwe bylo wywolanie animacji wyhamowujacej
//kulki w odpowiednim kierunku 
//zerowanie dragok i canvas.onmousemove, co oznacza ze kulka nie jest juz przesuwana
function zamroz(){
 if(dragok){wyliczWspolczynniki();};
 if(dragok2){wyliczWspolczynniki2();};
 if(dragok3){wyliczWspolczynniki3();};
 dragok = false;
 dragok2= false;
 dragok3= false;
 canvas.onmousemove = null;
}
//wywolanie funkcji wyhamowujacej kulke oraz wyliczanie wspolczynnikow
//wynik wyliczenia dzielony jest na 25, poniewaz bez tego bylby zbyt duzy przyrost x i y
function wyliczWspolczynniki(){	
	dx=(kul1.getXpos()-kul1.getXpoczatkowe())/25;
	dy=(kul1.getYpos()-kul1.getYpoczatkowe())/25;
	ktorakulka=1;
	wyhamowanie();
}
function wyliczWspolczynniki2(){	
	dx=(kul2.getXpos()-kul2.getXpoczatkowe())/25;
	dy=(kul2.getYpos()-kul2.getYpoczatkowe())/25;
	ktorakulka=2;
	wyhamowanie();
}
function wyliczWspolczynniki3(){	
	dx=(kul3.getXpos()-kul3.getXpoczatkowe())/25;
	dy=(kul3.getYpos()-kul3.getYpoczatkowe())/25;
	ktorakulka=3;
	wyhamowanie();
}
//wywolanie funkcji animacji wyhamowujacej z intervalem rownym 10 milisekund - teoretycznie 100 klatek na sekunde
function wyhamowanie(){
	parametrczas=setInterval(animuj,10);
}
//najdluzsza funkcja programu
//warunki sprawdzajace pozycje kulek
//i w zaleznosci od pozycji, sprawdzanie czy wystapilo zderzenie kulek
//jesli nastapilo zderzenie, przesuniecie jednej z kulek poza obszar rysowania
//oraz suma liczb z obydwu kulek i zapisanie wyniku na pozostajacej kulce na ekranie
//sprawdzanie czy kulka jest blisko scianek ekranu
//kulki maja startowo 30 pikseli srednicy, wiec zeby bylo w miare naturalnie, gdy kulka
//zbliza sie do krawedzi na odleglosc 30 pikseli, zostaje odwrocony przyrost dx, dy i kulka odbija sie od krawedzi
//aby uzyskac efekt wyhamowania, dx oraz dy sa zmniejszane za kazdym przebiegiem funkcji
function animuj(){
	ctx.clearRect(0, 0, W, H);
	if(ktorakulka==1){
			kul1.setXpos(kul1.getXpos()+dx);
			kul1.setYpos(kul1.getYpos()+dy);
			if(kul1.getXpos()>570 || kul1.getXpos()<30){
				dx=-dx;
			}
			if(kul1.getYpos()>370 || kul1.getYpos()<30){
				dy=-dy;
			}
			dx*=0.99;
			dy*=0.99;
			
			if(zderzenie==0){
			kul1.rysuj();
			kul2.rysuj();
			kul3.rysuj();
			if(Math.abs(kul1.getXpos()-kul2.getXpos())<28 & Math.abs(kul1.getYpos()-kul2.getYpos())<28){
				zderzenie=1;
				kul1.setNumber(kul1.getNumber()+kul2.getNumber());
			}
			if(Math.abs(kul1.getXpos()-kul3.getXpos())<28 & Math.abs(kul1.getYpos()-kul3.getYpos())<28){
				zderzenie=2;
				kul1.setNumber(kul1.getNumber()+kul3.getNumber());
			}
			}else if(zderzenie==1){
				if(zderzeniepoziom2==1){
					kul1.rysuj();
					kul3.setXpos(-5000);
				}else{
				kul1.rysuj(); 
				kul3.rysuj();
					kul2.setXpos(-5000);
				if(Math.abs(kul1.getXpos()-kul3.getXpos())<28 & Math.abs(kul1.getYpos()-kul3.getYpos())<28){
				zderzeniepoziom2=1; 
				kul1.setNumber(kul1.getNumber()+kul3.getNumber());
				}
				
				}
			}else if(zderzenie==2){
				if(zderzeniepoziom2==2){
					kul1.rysuj();
					kul2.setXpos(-5000);
				}else{
				kul1.rysuj();
				kul2.rysuj();
					kul3.setXpos(-5000);
				if(Math.abs(kul1.getXpos()-kul2.getXpos())<28 & Math.abs(kul1.getYpos()-kul2.getYpos())<28){
				zderzeniepoziom2=2; 
				kul1.setNumber(kul1.getNumber()+kul2.getNumber());
				}
				}
			}
		  
			kul1.setXpoczatkowe(kul1.getXpos());
			kul1.setYpoczatkowe(kul1.getYpos());
	}
	if(ktorakulka==2){
			kul2.setXpos(kul2.getXpos()+dx);
			kul2.setYpos(kul2.getYpos()+dy);
			if(kul2.getXpos()>570 || kul2.getXpos()<30){
				dx=-dx;
			}
			if(kul2.getYpos()>370 || kul2.getYpos()<30){
				dy=-dy;
			}
			dx*=0.99;
			dy*=0.99;
					
			if(zderzenie2==0){
			kul1.rysuj();
			kul2.rysuj();
			kul3.rysuj();
			if(Math.abs(kul2.getXpos()-kul3.getXpos())<28 & Math.abs(kul2.getYpos()-kul3.getYpos())<28){
				zderzenie2=1;
				kul2.setNumber(kul2.getNumber()+kul3.getNumber());
			}
			if(Math.abs(kul2.getXpos()-kul1.getXpos())<28 & Math.abs(kul2.getYpos()-kul1.getYpos())<28){
				zderzenie2=2;
				kul2.setNumber(kul2.getNumber()+kul1.getNumber());
			}
			}else if(zderzenie2==1){
				if(zderzeniepoziom2==3){
					kul2.rysuj();
					kul1.setXpos(-5000);
				}else{
				kul2.rysuj(); 
				kul1.rysuj();
					kul3.setXpos(-5000);
				if(Math.abs(kul2.getXpos()-kul1.getXpos())<28 & Math.abs(kul2.getYpos()-kul1.getYpos())<28){
				zderzeniepoziom2=3; 
				kul2.setNumber(kul2.getNumber()+kul1.getNumber());
				}
				
				}
			}else if(zderzenie2==2){
				if(zderzeniepoziom2==4){
					kul2.rysuj();
					kul3.setXpos(-5000);
				}else{
				kul2.rysuj();
				kul3.rysuj();
					kul1.setXpos(-5000);
				if(Math.abs(kul2.getXpos()-kul3.getXpos())<28 & Math.abs(kul2.getYpos()-kul3.getYpos())<28){
				zderzeniepoziom2=4; 
				kul2.setNumber(kul2.getNumber()+kul3.getNumber());
				}
				}
			}
			
			kul2.setXpoczatkowe(kul2.getXpos());
			kul2.setYpoczatkowe(kul2.getYpos());
	}
	if(ktorakulka==3){
			kul3.setXpos(kul3.getXpos()+dx);
			kul3.setYpos(kul3.getYpos()+dy);
			if(kul3.getXpos()>570 || kul3.getXpos()<30){
				dx=-dx;
			}
			if(kul3.getYpos()>370 || kul3.getYpos()<30){
				dy=-dy;
			}
			dx*=0.99;
			dy*=0.99;
						
			if(zderzenie3==0){
			kul1.rysuj();
			kul2.rysuj();
			kul3.rysuj();
			if(Math.abs(kul3.getXpos()-kul1.getXpos())<28 & Math.abs(kul3.getYpos()-kul1.getYpos())<28){
				zderzenie3=1;
				kul3.setNumber(kul3.getNumber()+kul1.getNumber());
			}
			if(Math.abs(kul3.getXpos()-kul2.getXpos())<28 & Math.abs(kul3.getYpos()-kul2.getYpos())<28){
				zderzenie3=2;
				kul3.setNumber(kul3.getNumber()+kul2.getNumber());
			}
			}else if(zderzenie3==1){
				if(zderzeniepoziom2==5){
					kul3.rysuj();
					kul2.setXpos(-5000);
				}else{
				kul3.rysuj(); 
				kul2.rysuj();
					kul1.setXpos(-5000);
				if(Math.abs(kul3.getXpos()-kul2.getXpos())<28 & Math.abs(kul3.getYpos()-kul2.getYpos())<28){
				zderzeniepoziom2=5; 
				kul3.setNumber(kul3.getNumber()+kul2.getNumber());
				}
				
				}
			}else if(zderzenie3==2){
				if(zderzeniepoziom2==6){
					kul3.rysuj();
					kul1.setXpos(-5000);
				}else{
				kul3.rysuj();
				kul1.rysuj();
					kul2.setXpos(-5000);
				if(Math.abs(kul3.getXpos()-kul1.getXpos())<28 & Math.abs(kul3.getYpos()-kul1.getYpos())<28){
				zderzeniepoziom2=6; 
				kul3.setNumber(kul3.getNumber()+kul1.getNumber());
				}
				}
			}
					
			kul3.setXpoczatkowe(kul3.getXpos());
			kul3.setYpoczatkowe(kul3.getYpos());
	}	
}

//tworzenie nowych obiektow
//ustalenie parametrow wejsciowych (kolor, pozycjax, pozycjay, srednica, liczba na kulce - tekst)
//liczba ustalana losowo od 1 do 10 - zaokraglenie w dol(0..1 * 10)+1 czyli od 0 do 9 plus 1
var kul1=new kulka(963,40,40,30,Math.floor(Math.random()*10)+1);
var kul2=new kulka(693,170,170,30,Math.floor(Math.random()*10)+1);
var kul3=new kulka(369,450,300,30,Math.floor(Math.random()*10)+1);

//klikniecie klawisza myszy
canvas.onmousedown = klik; 
//zwolnienie myszy
canvas.onmouseup = zamroz; 

kul1.rysuj();
kul2.rysuj();
kul3.rysuj();
