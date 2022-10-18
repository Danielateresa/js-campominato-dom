/*------------- PARTE 1 TRACCIA ESERCITAZIONE----------------/
/* Consegna
L'utente clicca su un bottone che genererà una griglia di gioco quadrata. Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata. */


/*1.L'utente clicca su un bottone che genererà una griglia di gioco quadrata. 
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.

 -Serve un bottone che scatenerà l'evento
 -Serve un container nel DOM che conterrà le celle della griglia
 -seleziono l'elemento del DOM container
 -con il ciclo for posso creare le varie celle, sono 100 in totale

*/

/* ------------PARTE 2 TRACCIA ESERCITAZIONE-------------*/
/*Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
Attenzione:
**nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba*/




//creo :
//delle carìvariabili con il numero totale delle caselle, 
//la stringa con i tag che comporanno la cella singola, 


//seleziono il container dal DOM
const containerEl = document.querySelector('.container');
//ogni cella ha un numero progressivo da 1 a 100

//al click deve essere creata la griglia
//seleziono il bottone dal DOM
const buttonEl = document.querySelector('.btn');

buttonEl.addEventListener('click', function () {

    //recupero l'elemento dal dom
    let totalCells = document.querySelector('.cells_number').value;
    //let totalCells = 100;//cambiando il numero delle celle cambia la difficoltà 
    //celle per riga da inserie (con la radice quadrata di totalCells ootengo il numero delle righe 100/10, 81/9, 49/7)
    const cellsRow = Math.sqrt(totalCells);
    //console.log(cellsRow);

    //loop per creare le celle che mi servono secondo il livello scelto(numero ri celle)
    for (i = 1; i <= totalCells; i++) {
        //aggiungo al DOM la stringa dellea cella 
        //la funzione ha il compito di creare la cella
        const cellString = cellElementGenerator('div', 'cell', i, cellsRow);
        //assegno la classe al div creato
        cellString.classList.add('cell');
        //console.log(cellString);
        //aggiungo i numeri nelle celle
        cellString.innerText = i;
        //ci sono 10 caselle per 10 righe
        cellString.style.width = `calc( 100% / ${cellsRow})`;
        //inserisco le celle nel container
        containerEl.insertAdjacentElement('beforeend', cellString);


        //cliccando sulla singola cella questa cambia colore 
        cellString.addEventListener('click', function () {
            //this si riferisce a cellstring, ossia la cella
            this.classList.toggle('clicked_cell');
            //compare in console innertext che rappresenta il numero legato alla cella
            console.log(this.innerText);
        })
    }

})

//funzione con i segnaposto che poi passeranno le variabili nella funzione stessa
function cellElementGenerator(tagname, cssClass, n, cellsRow) {
    const cellString = document.createElement(tagname);
    cellString.className = cssClass;
    cellString.innerText = n;
    cellString.style.width = `calc( 100% / ${cellsRow})`;
    return cellString;
}


