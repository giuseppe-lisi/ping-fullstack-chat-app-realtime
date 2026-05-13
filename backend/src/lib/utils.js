import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    // user has to login after 7 days as token expires
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, // xss attacks prevention
        sameSite: "strict", // csfr attacks prevention
        secure: process.env.NODE_ENV !== "development" // uses http in development and https in prod
    });
};
