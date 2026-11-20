import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service.js";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";
import { getCurrentUser } from "../services/auth.service.js";

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

export async function login(req: Request, res: Response) {
    try {
        const result = await loginUser(req.body);

        res.status(200).json({
            message: "Login successful",
            ...result
        });
    } catch (error) {
        if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
            res.status(401).json({
                message: "Invalid email or password"
            });
            return;
        }

        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function getMe(req: AuthenticatedRequest, res: Response) {
    try {
        if (req.userId === undefined) {
            res.status(401).json({
                message: "Authentication required"
            });
            return;
        }

        const user = await getCurrentUser(req.userId);

        res.status(200).json({
            user
        });
    } catch (error) {
        if (error instanceof Error && error.message === "USER_NOT_FOUND") {
            res.status(404).json({
                message: "User not found"
            });
            return;
        }

        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}
