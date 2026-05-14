import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        // tells mongodb that sender and receiverId will be references to the user model
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true },
);

const Message = mongoose.model("Message", messageSchema);

export default User;