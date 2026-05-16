import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { app, server } from "./lib/socket.js";
dotenv.config();

const PORT = process.env.PORT || 5001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// increase file upload limit
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ limit: "2mb", extended: true }));

app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:5174"],
        credentials: true,
    }),
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// in production, we serve api and frontend in the same place
if (process.env.NODE_ENV === "production") {
    // Go up ONE level (out of 'backend') to reach the project root
    const frontendPath = path.join(__dirname, "../..", "frontend", "dist");

    // Serve the static files
    app.use(express.static(frontendPath));

    // Catch-all route using the corrected wildcard syntax
    app.get("*splat", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}

server.listen(PORT, (error) => {
    console.log(`App running on port: `, PORT);
    connectDB();
    if (error) console.log(error);
});
