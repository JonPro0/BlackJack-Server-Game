const users = []

//addUser, removeUser, getUser, getUsersInRoom

const addUser = ({id, username, room}) => {
    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //Validate the data
    if(!username || !room){
        return {
            error: 'Username and room are required!'
        }
    }

    // Check for existing users
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    // VAlidate username
    if(existingUser) {
        return {
            error: 'Username is in use!'
        }
    }

    //Store user
    const user = { id, username, room}
    users.push(user)
    return {user}
}

addUser({
    id: 22,
    username: 'Jonas',
    room: 'Hi'
})

console.log(users)

const res = addUser({
    id: 33,
    username: 'jonas',
    room: 'hi'
})

console.log(res)