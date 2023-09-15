const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userModel = mongoose.Schema({
    // name
    name: {
        type: String,
        required: true
    },
    // email
    email: {
        type: String,
        required: true
    },
    // password
    password: {
        type: String,
        required: true
    },
    // photo
    photo: {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    }
},
    {
        timeStamps: true
    }
);

userModel.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compareSync(enteredPassword, this.password);
}

// before saving do this
userModel.pre('save', async function (next) {
    // if current password is not modified do this
    if (!this.isModified) {
        next();
    }

    // higher the number more strong password or salt will be generated
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userModel);

module.exports = User;