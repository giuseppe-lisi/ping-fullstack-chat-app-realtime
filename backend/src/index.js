import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// increase file upload limit
app.use(express.json({ limit: "2mb" })); 
app.use(express.urlencoded({ limit: "2mb", extended: true }));

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5174",
        credentials: true,
    }),
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, (error) => {
    console.log(`App running on port: `, PORT);
    connectDB();
    if (error) console.log(error);
});
