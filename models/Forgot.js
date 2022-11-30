const mongoose = require('mongoose')

const ForgotSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },

        token: {
            type: String,
            required: true,
            unique: true
        }

    }, { timestamps: true });

// if model exist use it else create it
module.exports = mongoose.models.User || mongoose.model('Forgot', ForgotSchema);
