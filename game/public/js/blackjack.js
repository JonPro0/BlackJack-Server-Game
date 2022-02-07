 const showCard = document.querySelector('#pLayer1').innerHTML
const cards = [{value : 11, word : "Ace of Club"}, {value : 2, word : "2 of Club"}, {value : 3, word : "3 of Club"}, {value : 4, word : "4 of Club"}, 
{value : 5, word : "5 of Club"}, {value : 6, word : "6 of Club"}, {value : 7, word : "7 of Club"}, {value : 8, word : "8 of Club"}, {value : 9, word : "9 of Club"},
{value : 10, word : "10 of Club"}, {value : 10, word : "Jack of Club"}, {value : 10, word : "Queen of Club"}, {value : 10, word : "10 of Club"},
{value : 11, word : "Ace of Spade"}, {value : 2, word : "2 of Spade"}, {value : 3, word : "3 of Spade"}, {value : 4, word : "4 of Spade"}, 
{value : 5, word : "5 of Spade"}, {value : 6, word : "6 of Spade"}, {value : 7, word : "7 of Spade"}, {value : 8, word : "8 of Spade"}, {value : 9, word : "9 of Spade"},
{value : 10, word : "10 of Spade"}, {value : 10, word : "Jack of Spade"}, {value : 10, word : "Queen of Spade"}, {value : 10, word : "10 of Spade"},
{value : 11, word : "Ace of Heart"}, {value : 2, word : "2 of Heart"}, {value : 3, word : "3 of Heart"}, {value : 4, word : "4 of Heart"}, 
{value : 5, word : "5 of Heart"}, {value : 6, word : "6 of Heart"}, {value : 7, word : "7 of Heart"}, {value : 8, word : "8 of Heart"}, {value : 9, word : "9 of Heart"},
{value : 10, word : "10 of Heart"}, {value : 10, word : "Jack of Heart"}, {value : 10, word : "Queen of Heart"}, {value : 10, word : "10 of Heart"},
{value : 11, word : "Ace of Diamond"}, {value : 2, word : "2 of Diamond"}, {value : 3, word : "3 of Diamond"}, {value : 4, word : "4 of Diamond"}, 
{value : 5, word : "5 of Diamond"}, {value : 6, word : "6 of Diamond"}, {value : 7, word : "7 of Diamond"}, {value : 8, word : "8 of Diamond"}, {value : 9, word : "9 of Diamond"},
{value : 10, word : "10 of Diamond"}, {value : 10, word : "Jack of Diamond"}, {value : 10, word : "Queen of Diamond"}, {value : 10, word : "10 of Diamond"}]

let playerScore = 0
let cardDealerScore = 0

let isPlayable = true
let isDealable = false

const showCreatedCard = () => {
    if(isPlayable){
        isDealable = true
        let card = Math.round((Math.random() * 51))
        console.log(cards[card].word)
    
        document.querySelector('#player1').innerHTML += `<p>${cards[card].word}</p>` 
        if((card == 0 || card == 13 || card == 26 || card == 39) && playerScore >= 11){
            playerScore += 1
        } else {
            playerScore += cards[card].value
        }
        document.querySelector('#playerScore').innerHTML = `Score: ${playerScore}` 
        if(playerScore > 21){
            document.querySelector('#playerScore').innerHTML = `Score: ${playerScore} `
            alert('Du hast dich gebusted')
            isPlayable = false
        }
    } 
    
    
}

const botTime = () => {

    if(isDealable){
    
    isPlayable = false

         while(cardDealerScore <= 17){
            let dealerCard = Math.round(Math.random() * 51)
            cardDealerScore += cards[dealerCard].value
            document.querySelector('#botCardDealer').innerHTML += `<p>${cards[dealerCard].word}</p>`  
            document.querySelector('#botCardDealerScore').innerHTML = `Score: ${cardDealerScore}`      
        }

        if(cardDealerScore > playerScore) alert('Der Kartengeber hat gewonnen!')

    }

}

