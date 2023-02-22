const moment = require('moment')


const messages = (message, username, color = "") => {
    return {
        message,
        username,
        color,
        time: moment().format('h:mm a'),
    }
}

module.exports = messages;