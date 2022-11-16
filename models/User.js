const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },

    }, { timestamps: true });

// if model exist use it else create it
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
// mongoose.model = {}
// export default mongoose.model('User', UserSchema);