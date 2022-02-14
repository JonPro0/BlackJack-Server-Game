//Alle querySelector
const startGame = document.querySelector('#startGame')
const showResult = document.querySelector('#showResult')
const player1 = document.querySelector('#player1')
const $playerScore = document.querySelector('#playerScore')
const botCardDealer = document.querySelector('#botCardDealer')
const botCardDealerScore = document.querySelector('#botCardDealerScore')
const imgSource = 'https://deckofcardsapi.com/static/img/'

const cards = [
    { value: 11, word: 'Ace of Club', img: 'AC.png' },
    { value: 2, word: '2 of Club', img: '2C.png' },
    { value: 3, word: '3 of Club', img: '3C.png' },
    { value: 4, word: '4 of Club', img: '4C.png' },
    { value: 5, word: '5 of Club', img: '5C.png' },
    { value: 6, word: '6 of Club', img: '6C.png' },
    { value: 7, word: '7 of Club', img: '7C.png' },
    { value: 8, word: '8 of Club', img: '8C.png' },
    { value: 9, word: '9 of Club', img: '9C.png' },
    { value: 10, word: '10 of Club', img: '0C.png' },
    { value: 10, word: 'Jack of Club', img: 'JC.png' },
    { value: 10, word: 'Queen of Club', img: 'QC.png' },
    { value: 10, word: 'King of Club', img: 'KC.png' },
    { value: 11, word: 'Ace of Spade', img: 'AS.png' },
    { value: 2, word: '2 of Spade', img: '2S.png' },
    { value: 3, word: '3 of Spade', img: '3S.png' },
    { value: 4, word: '4 of Spade', img: '4S.png' },
    { value: 5, word: '5 of Spade', img: '5S.png' },
    { value: 6, word: '6 of Spade', img: '6S.png' },
    { value: 7, word: '7 of Spade', img: '7S.png' },
    { value: 8, word: '8 of Spade', img: '8S.png' },
    { value: 9, word: '9 of Spade', img: '9S.png' },
    { value: 10, word: '10 of Spade', img: '0S.png' },
    { value: 10, word: 'Jack of Spade', img: 'JS.png' },
    { value: 10, word: 'Queen of Spade', img: 'QS.png' },
    { value: 10, word: 'King of Spade', img: 'KS.png' },
    { value: 11, word: 'Ace of Heart', img: 'AH.png' },
    { value: 2, word: '2 of Heart', img: '2H.png' },
    { value: 3, word: '3 of Heart', img: '3H.png' },
    { value: 4, word: '4 of Heart', img: '4H.png' },
    { value: 5, word: '5 of Heart', img: '5H.png' },
    { value: 6, word: '6 of Heart', img: '6H.png' },
    { value: 7, word: '7 of Heart', img: '7H.png' },
    { value: 8, word: '8 of Heart', img: '8H.png' },
    { value: 9, word: '9 of Heart', img: '9H.png' },
    { value: 10, word: '10 of Heart', img: '0H.png' },
    { value: 10, word: 'Jack of Heart', img: 'JH.png' },
    { value: 10, word: 'Queen of Heart', img: 'QH.png' },
    { value: 10, word: 'King of Heart', img: 'KH.png' },
    { value: 11, word: 'Ace of Diamond', img: 'AD.png' },
    { value: 2, word: '2 of Diamond', img: '2D.png' },
    { value: 3, word: '3 of Diamond', img: '3D.png' },
    { value: 4, word: '4 of Diamond', img: '4D.png' },
    { value: 5, word: '5 of Diamond', img: '5D.png' },
    { value: 6, word: '6 of Diamond', img: '6D.png' },
    { value: 7, word: '7 of Diamond', img: '7D.png' },
    { value: 8, word: '8 of Diamond', img: '8D.png' },
    { value: 9, word: '9 of Diamond', img: '9D.png' },
    { value: 10, word: '10 of Diamond', img: '0D.png' },
    { value: 10, word: 'Jack of Diamond', img: 'JD.png' },
    { value: 10, word: 'Queen of Diamond', img: 'QD.png' },
    { value: 10, word: 'King of Diamond', img: 'KD.png' },
]

let playerScore = 0
let cardDealerScore = 0

let isPlayable = false
let isDealable = false
let isBusted = false

startGame.addEventListener('click', () => {
    isPlayable = true
    $startGame()
})

const $startGame = () => {
    startGame.innerHTML = ''
    showResult.innerHTML = ''
    player1.innerHTML = ''
    $playerScore.innerHTML = 'Score: '
    playerScore = 0
    botCardDealer.innerHTML = ''
    botCardDealerScore.innerHTML = 'Score: '
    cardDealerScore = 0
    isBusted = false
    isDealable = false
    isPlayable = true
}

const showCreatedCard = () => {
    if (isPlayable) {
        isDealable = true
        let card = Math.round(Math.random() * 51)
        console.log(cards[card].word)

        player1.innerHTML += `<img src="${imgSource}${cards[card].img}" width="80px" height="111.15px"/>`

        if (
            (card == 0 || card == 13 || card == 26 || card == 39) &&
            playerScore >= 11
        ) {
            playerScore += 1
        } else {
            playerScore += cards[card].value
        }
        $playerScore.innerHTML = `Score: ${playerScore}`
        if (playerScore > 21) {
            $playerScore.innerHTML = `Score: ${playerScore} `
            showResult.innerHTML = 'Du hast dich gebusted'
            isBusted = true
            isPlayable = false
        }
    }
}

const botTime = () => {
    if (isDealable) {
        isPlayable = false

        let i = 0
        let tmpScore = 0
        while (cardDealerScore < 17) {
            let dealerCard = Math.round(Math.random() * 51)
            cardDealerScore += cards[dealerCard].value
            setTimeout(() => {
                tmpScore += cards[dealerCard].value
                botCardDealer.innerHTML += `<img src="${imgSource}${cards[dealerCard].img}" width="80px" height="111.15px"/>`
                botCardDealerScore.innerHTML = `Score: ${tmpScore}`
            }, i * 1000)
            i += 1
        }
        setTimeout(() => {}, i * 999)

        setTimeout(() => {
            if (
                (cardDealerScore > playerScore && cardDealerScore <= 21) ||
                (cardDealerScore <= 21 && isBusted)
            ) {
                showResult.innerHTML = 'Der Kartengeber hat gewonnen!'
            } else if (
                (cardDealerScore < playerScore && !isBusted) ||
                (!isBusted && cardDealerScore >= 21)
            )
                showResult.innerHTML = 'Du hast gewonnen!'
            else showResult.innerHTML = 'Unentschieden'
        }, i * 1000)
        setTimeout(() => {
            startGame.innerHTML = 'Restart!'
        }, i * 1001)
    }
}
