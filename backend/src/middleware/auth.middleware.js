import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// middleware to check user is authenticated before letting him modify anything related to profile
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res
                .status(401)
                .json({ message: "Unauthorized - No token provided" });
        }

        // decodes jwt using user JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res
                .status(401)
                .json({ message: "Unauthorized - Token is invalid" });
        }

        // we signed the token with the user id in utils.js generateToken(),
        // thats why we can gather user id from the token itself
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
