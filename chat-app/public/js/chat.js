const socket = io()

socket.on('message', (message) => {
    console.log(message)
    document.querySelector('#chat').innerHTML += "<p>" + message + "</p>"
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const msg = e.target.elements.message.value
    document.getElementById('reset').value = ''

    

    socket.emit('sendMessage', msg)
})