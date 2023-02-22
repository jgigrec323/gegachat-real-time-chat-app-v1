let socket = io.connect()


//get username from url
const { username } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
})


// importing dom objects
const displayMsg = document.querySelector('.display-msg')
const sendingForm = document.querySelector('.sending-form')
const sendingInput = document.querySelector('input.text')
const onlineUsers = document.querySelector('.online-users')


//messaging when a user join
socket.emit("joinRoom", {
        username: username,
    })
    //listening when a user left
socket.on('userleave', (data) => {
    outputmsg(data)
})

//listening for message from bot
socket.on("joinRoom", function(data) {
        outputmsg(data)
    })
    //upadating users list
socket.on("updateUsersList", data => {
    onlineUsers.innerHTML = '';
    data.forEach((user) => {
        const li = document.createElement('li');
        li.innerHTML = `${user.username}<span style="color:#${user.color}">#${user.color}</span>`
        onlineUsers.appendChild(li);
    });

})


//sending message to the server
sendingForm.addEventListener("submit", function(e) {
    e.preventDefault()

    if (sendingInput.value != "") {
        socket.emit("message", {
            message: sendingInput.value,
        })
    } else {
        alert('Enter a message')
    }

})

//listening for message from users
socket.on("message", (data) => {

    msg(data)

})

//output message from bot
const outputmsg = (data) => {
        const onoff = document.createElement('p')
        onoff.classList.add('onoff')
        onoff.innerHTML = `${data.message} - <span class="onofftime">${data.time}</span> `
        displayMsg.appendChild(onoff)
    }
    //output message from users
const msg = (data) => {

    let msgBlock = document.createElement('div')


    if (username == data.username) {
        msgBlock.classList.add('msg-block', "msg-sent")
    } else {
        msgBlock.classList.add('msg-block', 'msg-received')
    }

    msgBlock.innerHTML = `
    <div class="infos">
        <p class="username" style="color:#${data.color}">${data.username}</p><span style="color:#${data.color}" class="time">${data.time}</span>
    </div>
    <p class="message">${data.message}</p>
    `

    displayMsg.appendChild(msgBlock)
    displayMsg.scrollTop = displayMsg.scrollHeight
    sendingInput.value = ""
    sendingInput.focus()
}