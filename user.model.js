import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    profile: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

export default User;