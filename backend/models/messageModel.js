const mongoose = require('mongoose');

const messageeModel = mongoose.Schema({

    // name of the sender or the id of the sender
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    // content of the message
    content: {
        type: String,
        trim: true
    },
    // ref to the chat to which it belongs
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    }

},
    {
        timeStamps: true,
    }
);

const Message = mongoose.model("Message", messageeModel);

module.exports = Message;

