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
            this.classList.add('clicked_cell');
            //compare in console innertext che rappresenta il numero legato alla cella
            console.log(this.innerText);


            //ad ogni click su una cella deve generarsi un numero, ma come?
            //genero il numero casuale singolo con la funzione
            const bombNumber = getRandomNumber(1, totalCells);
            console.log('numero della cella', bombNumber);
            //ma una cella può contenere un solo numero



            //array delle bombe
            //il ciclo mi restituisce la lista intera dei 16 numeri da 1 al numero massimo della griglia
            const bombNumbersList = [];
            while (bombNumbersList.length !== 16) {
                //finchè la lunghezza della lista è diversa da 16 inserisco un numero casuale generato dalla funzione
                const bombNumber = getRandomNumber(1, totalCells);
                //se il numero generato non si trova nella lista lo aggiungo
                if (!bombNumbersList.includes(bombNumber)) {
                    bombNumbersList.push(bombNumber);


                }
            } console.log('array delle bombe', bombNumbersList);

            //array dei numeri rivelati che non sono bombe (bombNumber)
            let notBombList = [];
            //finchè la lista dei numeri non bombe è diversa dal totale delle celle - 16
            //potrei trasformarlo in un ciclo
            //mi serve inserire i singoli numeri non bombe in un array

            if (notBombList.length !== (totalCells - 16)) {
                notBombList.push(bombNumber);
                console.log('array delle celle non bombe', notBombList);
            }



            const looserEl = document.querySelector('.looser');
            //provo a verificare se il numero della cella è presente nell'array delle bombe
            //con il ciclo for potrei scorrere nell'array
            for (let i = 0; i < bombNumbersList.length; i++) {
                //seleziono il singolo numero dell'array delle bombe
                const bombArrayItem = bombNumbersList[i];
                //se il numero della cella si trova nella lista dell'array delle bombe generato, la cella si colora di rosso
                if (bombNumber === bombArrayItem) {
                    console.log('hai trovato una bomba');
                    cellString.classList.add('bomb_found');
                    looserEl.classList.remove('d-none');
                }
                //l'utente finisce il gioco quando rivela tutte le celle che non sono bombe,
                //ossia tutti i numeri non presenti nell'array delle bombe
                //si potrebbe creare un array con i numeri rivelati che non sono bombe

                //se l'arrey di non bombe è uguale al numero delle celle totali-16 (totalCells-16) la partita finisce con l'utente vincitore
            }



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


//Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// -Math random 
// dvrò impostare un valore minimo e massimo 1-16
// let/const
//ciclo while per generare i numeri finchè non arriva al massimo

//geneare numeri 16 casuali
//la funzione genera i numeri casuali
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//funzione del numero non bomba
function singleNotBombNumber(notBombArray, bombNum, totCells) {

    if (notBombArray.length !== (totCells - 16)) {
        notBombArray.push(bombNum);
        console.log('array delle celle non bombe', notBombArray);
        return notBombArray
    }
}



//const bombNumber = getRandomNumber(1, 16);
//console.log(bombNumber);

//devo creare un array delle bombe
//all'inizio la lista è vuota, i numeri verranno generati man mano fino a 16 totali e non dovranno ripetesi.
//se un numero è già presente non deve essere aggiunto alla lista
/* function createBombsList(min, max) {
    const bombNumbersList = [];
    while (bombNumbersList.length !== 16) {
        //finchè la lunghezza della lista è diversa da 16 inserisco un numero casuale generato dalla funzione
        const bombNumber = getRandomNumber(1, totalCells);
        //se il numero generato non si trova nella lista lo aggiungo
        if (!bombNumbersList.includes(bombNumber)) {
            bombNumbersList.push(bombNumber);
            //console.log(bombNumbersList);
        }
    }
    //se non metto return avrò un valore undefined
    return bombNumbersList
} */
//const totalBombs = createBombsList(1, totalCells);
