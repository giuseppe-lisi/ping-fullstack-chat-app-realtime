import mongoose from "mongoose";

// building model of users: each user has an email and pw for auth and a name and pfp (defaulted)
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        profilePic: {
            type: String,
            default: "",
        },
    },
    // so later we can show the "member since tag"
    { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;