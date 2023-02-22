const express = require("express")
const path = require('path')
const app = express()

const server = require('http').createServer(app)
const { Server } = require("socket.io")
const messages = require("./functions/messages")
const { userJoin, getCurrentUser, getUsers, userLeave } = require("./functions/users")
const io = new Server(server, {
    cors: {
        origin: ['http://127.0.0.1:8080/']
    }
})
const botName = "gegachat"
const port = 8080;

/* console.log(path.join(__dirname, 'views')) */


app.use(express.static(path.join(__dirname, 'views')))

io.on("connection", (socket) => {
    // welcome whenever a user join
    socket.on("joinRoom", (data) => {
        const user = userJoin(socket.id, data.username)

        io.to(user.id).emit("joinRoom", messages("Welcome to gegachat", botName))

        //broadcast when a new user join

        socket.broadcast.emit("joinRoom", messages(`${user.username} has joined the chat`, botName))

        //upadate users list
        io.emit('updateUsersList', getUsers())

    })


    //runs whenever a message is sent
    socket.on("message", (data) => {
        const user = getCurrentUser(socket.id)[0]
        io.emit("message", messages(data.message, user.username, user.color), user.id)
    })




    //Runs whenever a user has left
    socket.on("disconnect", () => {
        const lUser = userLeave(socket.id)

        if (lUser) {
            io.emit("userleave", messages(`${lUser.username} has left the chat`, botName))

            io.emit('updateUsersList', getUsers())
        }


    })
})




server.listen(port, function() {
    console.log(`Running on ${port}`)
})