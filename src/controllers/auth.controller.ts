import { Request, Response } from "express";
import { registerUser } from "../services/auth.service.js";

export async function register(req: Request, res: Response) {
    try {
        const user = await registerUser(req.body);

        res.status(201).json({
            message: "User registered successfully",
            user
        });
    } catch (error) {
        if (error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS") {
            res.status(409).json({
                message: "Email address is already registered"
            });
            return;
        }

        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}