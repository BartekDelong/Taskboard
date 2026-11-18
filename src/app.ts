import express from "express";
import prisma from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "TaskBoard API is running"
    });
});

app.get("/api/db-test", async (req, res) => {
    try {
        await prisma.$connect();

        res.status(200).json({
            status: "OK",
            message: "Database connection successful"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: "ERROR",
            message: "Database connection failed"
        });
    }
});

export default app;