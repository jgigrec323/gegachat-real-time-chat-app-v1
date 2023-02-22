const colorGenerator = require("./colors");

const users = []

//user join

const userJoin = (id, username, color = colorGenerator()) => {
        const user = { id, username, color }

        users.push(user)

        return user;
    }
    //current user
const getCurrentUser = (id) => {
        return users.filter(user => user.id === id)
    }
    //all users
const getUsers = () => {
        return users.map(user => user)
    }
    //user leave
const userLeave = (id) => {
    const index = users.findIndex(user => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}
module.exports = {
    getUsers,
    userJoin,
    getCurrentUser,
    userLeave
};