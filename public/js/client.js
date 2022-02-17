const socket = io()

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')
const assignPlayer1 = document.querySelector('#assignPlayer1')

//Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

//Options
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
})

const autoscroll = () => {
    const $newmessage = $messages.lastElementChild

    const newMessageStyles = getComputedStyle($newmessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newmessage.offsetHeight + newMessageMargin

    const visibleHeight = $messages.offsetHeight

    const contentHeight = $messages.scrollHeight

    const scrollOffset = $messages.scrollTop + visibleHeight

    if (contentHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }
}

socket.on('message', (message) => {
    console.log(message)
    //document.querySelector('#chat').innerHTML += "<p>" + message + "</p>"
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a'),
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('roomData', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users,
    })
    document.querySelector('#sidebar').innerHTML = html
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')

    const msg = e.target.elements.message.value

    socket.emit('sendMessage', msg, (error) => {
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()
        if (error) {
            return console.log(error)
        }

        console.log('Message delivered!')
    })
})

socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})

//Logik für das Spiel

//Alle querySelector
const startGame = document.querySelector('#startGame')
const hit = document.querySelector('#hit')
const stay = document.querySelector('#stay')
const showResult1 = document.querySelector('#showResult1')
const showResult2 = document.querySelector('#showResult2')
const showResult3 = document.querySelector('#showResult3')
const showResult4 = document.querySelector('#showResult4')
const player1 = document.querySelector('#player1')
const player2 = document.querySelector('#player2')
const player3 = document.querySelector('#player3')
const player4 = document.querySelector('#player4')
const $playerScore = document.querySelector('#player1Score')
const $player2Score = document.querySelector('#player2Score')
const $player3Score = document.querySelector('#player3Score')
const $player4Score = document.querySelector('#player4Score')
const loadCardDealer = document.querySelector('#loadCardDealer')
const loadCardDealerScore = document.querySelector('#loadCardDealerScore')
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

let dealerCard = Math.round(Math.random() * 51)
let dealerCard2 = Math.round(Math.random() * 51)
let dealerCard3 = Math.round(Math.random() * 51)
let dealerCard4 = Math.round(Math.random() * 51)
let dealerCard5 = Math.round(Math.random() * 51)
let dealerCard6 = Math.round(Math.random() * 51)

let playerScore = 0
let player2Score = 0
let player3Score = 0
let player4Score = 0
let cardDealerScore = 0

let isPlayable1 = false
let isPlayable2 = false
let isPlayable3 = false
let isPlayable4 = false
let isDealable = false
let isBusted = false
let isBusted2 = false
let isBusted3 = false
let isBusted4 = false

startGame.addEventListener('click', () => {
    isPlayable1 = true
    socket.emit('startGame1')
})

socket.on('startGame', () => {
    $startGame()
})

hit.addEventListener('click', () => {
    let card = Math.round(Math.random() * 51)
    socket.emit('hit1', card)
})

socket.on('hit', (card) => {
    showCreatedCard(card)
})

stay.addEventListener('click', () => {
    socket.emit('stay1', {dealerCard, dealerCard2, dealerCard3, dealerCard4, dealerCard5, dealerCard6})
})

socket.on('stay', ({dealerCard, dealerCard2, dealerCard3, dealerCard4, dealerCard5, dealerCard6}) => {
    $stay({dealerCard, dealerCard2, dealerCard3, dealerCard4, dealerCard5, dealerCard6})
})

const $startGame = () => {
    startGame.innerHTML = ''
    showResult1.innerHTML = 'Player 1 ist dran'
    player1.innerHTML = ''
    $playerScore.innerHTML = 'Score: '
    playerScore = 0
    player2.innerHTML = ''
    showResult2.innerHTML = ''
    $player2Score.innerHTML = 'Score: '
    player2Score = 0
    player3.innerHTML = ''
    showResult3.innerHTML = ''
    $player3Score.innerHTML = 'Score: '
    player3Score = 0
    player4.innerHTML = ''
    showResult4.innerHTML = ''
    $player4Score.innerHTML = 'Score: '
    player4Score = 0
    loadCardDealer.innerHTML = ''
    loadCardDealerScore.innerHTML = 'Score: '
    cardDealerScore = 0
    isBusted = false
    isDealable = false
    isPlayable1 = true
}

const showCreatedCard = (card) => {
    if (isPlayable1) {
        showCreatedCardPlayer1(card)
    } else if (isPlayable2) {
        showCreatedCardPlayer2(card)
    } else if (isPlayable3) {
        showCreatedCardPlayer3(card)
    } else if (isPlayable4) {
        showCreatedCardPlayer4(card)
    }
}

const $stay = ({dealerCard, dealerCard2, dealerCard3, dealerCard4, dealerCard5, dealerCard6}) => {
    if (isPlayable1) {
        showResult1.innerHTML = 'Halten'
        isPlayable1 = false
        isPlayable2 = true
        showResult2.innerHTML = 'Player 2 ist dran'
    } else if (isPlayable2) {
        showResult2.innerHTML = 'Halten'
        isPlayable2 = false
        isPlayable3 = true
        showResult3.innerHTML = 'Player 3 ist dran'
    } else if (isPlayable3) {
        showResult3.innerHTML = 'Halten'
        isPlayable3 = false
        isPlayable4 = true
        showResult4.innerHTML = 'Player 4 ist dran'
    } else if (isPlayable4) {
        showResult4.innerHTML = 'Halten'
        isPlayable4 = false
        isDealable = true
        dealerTurn({dealerCard, dealerCard2, dealerCard3, dealerCard4, dealerCard5, dealerCard6})
    }
}

const dealerTurn = ({dealerCard, dealerCard2, dealerCard3, dealerCard4, dealerCard5, dealerCard6}) => {
    if (isDealable) {
        let i = 1

       

        cardDealerScore += cards[dealerCard].value
        loadCardDealer.innerHTML += `<img src="${imgSource}${cards[dealerCard].img}" width="50px" height="70px"/>`
        loadCardDealerScore.innerHTML = `Score: ${cardDealerScore}`

        cardDealerScore += cards[dealerCard2].value
        setTimeout(() => {
            loadCardDealer.innerHTML += `<img src="${imgSource}${cards[dealerCard2].img}" width="50px" height="70px"/>`
            loadCardDealerScore.innerHTML = `Score: ${cardDealerScore}`
        }, i * 1000)
        i++

        setTimeout(() => {
            if (cardDealerScore >= 17) {
                checkwin1()
                checkwin2()
                checkwin3()
                checkwin4()
            } else {
                cardDealerScore += cards[dealerCard3].value
                loadCardDealer.innerHTML += `<img src="${imgSource}${cards[dealerCard3].img}" width="50px" height="70px"/>`
                loadCardDealerScore.innerHTML = `Score: ${cardDealerScore}`
            }
        }, i * 1000)
        i++

        setTimeout(() => {
            if (cardDealerScore >= 17) {
                checkwin1()
                checkwin2()
                checkwin3()
                checkwin4()
            } else {
                cardDealerScore += cards[dealerCard4].value
                loadCardDealer.innerHTML += `<img src="${imgSource}${cards[dealerCard4].img}" width="50px" height="70px"/>`
                loadCardDealerScore.innerHTML = `Score: ${cardDealerScore}`
            }
        }, i * 1000)
        i++

        setTimeout(() => {
            if (cardDealerScore >= 17) {
                checkwin1()
                checkwin2()
                checkwin3()
                checkwin4()
            } else {
                cardDealerScore += cards[dealerCard5].value
                loadCardDealer.innerHTML += `<img src="${imgSource}${cards[dealerCard5].img}" width="50px" height="70px"/>`
                loadCardDealerScore.innerHTML = `Score: ${cardDealerScore}`
            }
        }, i * 1000)
        i++

        setTimeout(() => {
            if (cardDealerScore >= 17) {
                checkwin1()
                checkwin2()
                checkwin3()
                checkwin4()
            } else {
                cardDealerScore += cards[dealerCard6].value
                loadCardDealer.innerHTML += `<img src="${imgSource}${cards[dealerCard6].img}" width="50px" height="70px"/>`
                loadCardDealerScore.innerHTML = `Score: ${cardDealerScore}`
            }
        }, i * 1000)

        startGame.innerHTML = 'Restart!'
    }
}

const showCreatedCardPlayer1 = (card) => {
    if (isPlayable1) {
        console.log(cards[card].word)

        if (playerScore == 0) {
        }
        player1.innerHTML += `<img src="${imgSource}${cards[card].img}" width="50px" height="70px"/>`

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
            showResult1.innerHTML = 'Du hast dich gebusted'
            isBusted = true
            isPlayable1 = false
            isPlayable2 = true
            showResult2.innerHTML = 'Player 2 ist dran'
        }
    }
}

const showCreatedCardPlayer2 = (card) => {
    if (isPlayable2) {
        console.log(cards[card].word)
        player2.innerHTML += `<img src="${imgSource}${cards[card].img}" width="50px" height="70px"/>`

        if (
            (card == 0 || card == 13 || card == 26 || card == 39) &&
            player2Score >= 11
        ) {
            player2Score += 1
        } else {
            player2Score += cards[card].value
        }
        $player2Score.innerHTML = `Score: ${player2Score}`
        if (player2Score > 21) {
            $playerScore.innerHTML = `Score: ${player2Score} `
            showResult2.innerHTML = 'Du hast dich gebusted'
            isBusted2 = true
            isPlayable2 = false
            isPlayable3 = true
            showResult3.innerHTML = 'Player 3 ist dran'
        }
    }
}

const showCreatedCardPlayer3 = (card) => {
    if (isPlayable3) {
        console.log(cards[card].word)

        player3.innerHTML += `<img src="${imgSource}${cards[card].img}" width="50px" height="70px"/>`

        if (
            (card == 0 || card == 13 || card == 26 || card == 39) &&
            player3Score >= 11
        ) {
            player3Score += 1
        } else {
            player3Score += cards[card].value
        }
        $player3Score.innerHTML = `Score: ${player3Score}`
        if (player3Score > 21) {
            $player3Score.innerHTML = `Score: ${player3Score} `
            showResult3.innerHTML = 'Du hast dich gebusted'
            isBusted3 = true
            isPlayable3 = false
            isPlayable4 = true
            showResult4.innerHTML = 'Player 4 ist dran'
        }
    }
}

const showCreatedCardPlayer4 = (card) => {
    if (isPlayable4) {
        console.log(cards[card].word)
        player4.innerHTML += `<img src="${imgSource}${cards[card].img}" width="50px" height="70px"/>`

        if (
            (card == 0 || card == 13 || card == 26 || card == 39) &&
            player4Score >= 11
        ) {
            player4Score += 1
        } else {
            player4Score += cards[card].value
        }
        $player4Score.innerHTML = `Score: ${player4Score}`
        if (player4Score > 21) {
            $playerScore.innerHTML = `Score: ${player4Score} `
            showResult4.innerHTML = 'Du hast dich gebusted'
            isBusted4 = true
            isPlayable4 = false
            isDealable = true
            dealerTurn({dealerCard, dealerCard2, dealerCard3, dealerCard4, dealerCard5, dealerCard6})
        }
    }
}

const checkwin1 = () => {
    //check for win player 1
    if (
        (cardDealerScore > playerScore && cardDealerScore <= 21) ||
        (cardDealerScore <= 21 && isBusted)
    ) {
        showResult1.innerHTML = 'Der Kartengeber hat gewonnen!'
    } else if (
        (cardDealerScore < playerScore && !isBusted) ||
        (!isBusted && cardDealerScore >= 21)
    )
        showResult1.innerHTML = 'Du hast gewonnen!'
    else showResult1.innerHTML = 'Unentschieden'
}

const checkwin2 = () => {
    if (
        (cardDealerScore > player2Score && cardDealerScore <= 21) ||
        (cardDealerScore <= 21 && isBusted2)
    ) {
        showResult2.innerHTML = 'Der Kartengeber hat gewonnen!'
    } else if (
        (cardDealerScore < player2Score && !isBusted2) ||
        (!isBusted2 && cardDealerScore > 21)
    )
        showResult2.innerHTML = 'Du hast gewonnen!'
    else showResult2.innerHTML = 'Unentschieden'
}

const checkwin3 = () => {
    if (
        (cardDealerScore > player3Score && cardDealerScore <= 21) ||
        (cardDealerScore <= 21 && isBusted3)
    ) {
        showResult3.innerHTML = 'Der Kartengeber hat gewonnen!'
    } else if (
        (cardDealerScore < player3Score && !isBusted3) ||
        (!isBusted3 && cardDealerScore > 21)
    )
        showResult3.innerHTML = 'Du hast gewonnen!'
    else showResult3.innerHTML = 'Unentschieden'
}

const checkwin4 = () => {
    if (
        (cardDealerScore > player4Score && cardDealerScore <= 21) ||
        (cardDealerScore <= 21 && isBusted4)
    ) {
        showResult4.innerHTML = 'Der Kartengeber hat gewonnen!'
    } else if (
        (cardDealerScore < player4Score && !isBusted4) ||
        (!isBusted4 && cardDealerScore > 21)
    )
        showResult4.innerHTML = 'Du hast gewonnen!'
    else showResult4.innerHTML = 'Unentschieden'
}
