console.log('It is time for WAR!');   //confirming the script link in html code is correct.

const main = document.querySelector('.game');

//creates the Suits object to contain the various card suits in a standard deck.
const cardData = { suits:['spades','hearts','diams','clubs',],
                 val:['A', '2', '3', '4', '5', '6', '7',
                 '8', '9', '10', 'J', 'Q', 'K']}

let deck = [];  //Storage area for the deck of cards
 
buildDeck();   //invoking/calling the buildDeck function to build a deck of cards

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
 }
 console.log(deck);  //checking to see if the buildDeck function is creating each card for each suite and a total of 52 cards.
 main.innerHTML = `&spades; &hearts; &diams; &clubs;`; //Creates the html code for shape of each suit and outputs to the document.
