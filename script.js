console.log('It is time for WAR!');   //confirming the script link in html code is correct.

const main = document.querySelector('.game');
const gameArea = elementMaker(main, 'div', 'gameArea', '');
const btn = elementMaker(main, 'button','btn','Next Round')    //Creates the button to click for next round
const message = elementMaker(main, 'div', 'mes', 'Click to Play Next Round');
const game ={players:2, cards:[], view:[], s:[]};

//creates the Suits object to contain the various card suits in a standard deck.
// const cardData = { suits:['spades','hearts','diams','clubs',],
//                  val:['A', '2', '3', '4', '5', '6', '7',
//                  '8', '9', '10', 'J', 'Q', 'K']} 

 const cardData = { suits:['spades','hearts','diams','clubs',],
                 val:['A', '2', '3']}

let deck = [];  //Storage area for the deck of cards
 
buildDeck();   //calling the buildDeck function to build a deck of cards
addPlayers();

btn.addEventListener('click', (e) => {    //listens for a ckick on the "next round" button
    const temp = [];
    for (let i = 0; i < game.players; i++){
        game.s[i].lastChild.innerHTML = '';  //clears out the score at end of each hand
        if (game.cards[i].length > 0){
            temp.push(i);
        } else {
            const ele = game.view[i];
            ele.view[i].innerHTML = 'X';
            game.s[i].firstChild.innerHTML = 'OUT!';
            ele.style.backgroundColor = '#bbb';
        }
    }
    message.innerHTML = 'The Battle Has Begun!'
    gamer(temp, []);    //calls the gamer function and creates an array to hold the cards
})

function gamer(inPlay, holder){  //loops through all the elements that are in play and tracks the high values to determine the round winner
    const vals = [];  //sets up a temporary array to track all the values of the card values
       console.log(inPlay);   //entry only for debugging
    inPlay.forEach((i) => {
        if (game.cards[i].length > 0){
        const ele = game.view[i];
        const first = game.cards[i].shift();
        showCard(first, ele);
        vals.push(first.cardValue);
        holder.push(first);
        game.s[i].lastChild.innerHTML += `${first.cardNum}${first.icon}`
        }
    })
    const winners = [];  //array to store only the winning cards
    const highValue = Math.max(...vals);  //Math.max allows for return of the high value
    console.log(highValue);
    vals.forEach((e,i) =>{        //'e' = value of the index & 'i' = index value of the "vals array"
        if (e >= highValue) winners.push(inPlay[i]);
    })
        console.log(winners);
       
        if(winners.length > 1){
            message.innerHTML =+ `Tie!`
            winners.forEach(v =>{
                message.innerHTML += `P${v+1}`;
            })
            message.innerHTML += `...`;
            return gamer(winners, holder);
        } else if (winners.length == 0){
            message.innerHTML += 'No Winner'
        } else{
            const temp = winners[0];
            game.cards[temp].push(...holder);
            message.innerHTML += `Winner is Player ${temp + 1}!`;
        }

        updateScores();              
    }                    

function updateScores(){        //updates player's score at end of each round
    let tempPlay = [];
    game.s.forEach((el, i) =>{    //"el" is the score element ane "i" is the index associated with each player
        const cardCount = game.cards[i].length;
        if(cardCount){   //checks to see if the value of cardCount is greater than zero
            el.firstChild.innerHTML = `${cardCount} cards left`;  
            tempPlay.push(i);  
        } else{
            el.parentNode.style.opacity = 0.4;     //greys out the losing player
        }
    })
    if(tempPlay.length <= 1) {
        message.innerHTML = `GameOver! Player ${tempPlay [0]+1} wins!`;
        btn.disabled = true;
        btn.textContent = 'GAME OVER!';
    }   
}



function showCard(cardContents, ele){
    ele.innerHTML = `<div>${cardContents.cardNum}${cardContents.icon}</div>`;
    ele.style.color = cardContents.iconColor;
}

function addPlayers(){
    let start = 0;
    let num = Math.floor(deck.length / game.players);
    let end = start + num;
    for(let i = 0; i < game.players; i++){
        const el = elementMaker(gameArea, 'div', 'player',``)
        const ele = elementMaker(el,'div', 'info',`Player ${i + 1} `);
        const card = elementMaker(el,'div', 'card',``);
        game.view.push(card);
        game.cards [i] = deck.slice(start,end);
        const score = elementMaker(el,'div','score', ``);
        const cardLeft = elementMaker(score, 'div', 'box',`${game.cards[i].length} left`);
        const cardPlayed = elementMaker(score, 'div', 'box','');
        game.s.push(score);
        start = end;
        end = end + num;
    }
    console.log(game.cards);

}





function buildDeck(){      //this function will build the deck by looping over suits object and adding each value to each suit
    cardData.suits.forEach((suit) => {   
        cardData.val.forEach((v, ind) => {  //Supposed to loop through the "val" array.  "v" & "ind" are not defined aywhere??? 
     let bgColor = (suit =='hearts') || (suit =='diams') 
                ?'red' : "black";   //Ternary Operator...sets the background color to red on hearts and diamonds cards
        
    const card = {    //creating the card object
        suit : suit,     
        icon : `&${suit};`,    //Pulls the icon image for each suit and displays it on a card
        iconColor : bgColor,   //changes the icon color to red on hearts and diamonds
        cardNum : v,   //should assign a card to each element in the "val"array from the cardData object.
        cardValue : ind + 1  //This should step through the indexes of the "val" array and assign a numerical value to each card.  
            }
       deck.push(card);
        })
    })
    deck.sort(() => {
        return Math.random() - 0.5;
    })
 }
 console.log(deck);  //checking to see if the buildDeck function is creating each card for each suite and a total of 52 cards.
//  main.innerHTML = `&spades; &hearts; &diams; &clubs;`; //Creates the html code for shape of each suit and outputs to the document.

function elementMaker(par, eleType, cla, html){
    const ele = document.createElement(eleType);
    ele.classList.add(cla);
    ele.innerHTML = html;
    return par.appendChild(ele);
}