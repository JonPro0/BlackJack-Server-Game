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

document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation){
        return alert('Geolocation is not asupported by your browser.')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    })
})