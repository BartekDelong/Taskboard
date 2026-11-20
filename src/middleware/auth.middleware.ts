
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt.js";

export interface AuthenticatedRequest extends Request {
    userId?: number;
}

export function authenticateToken(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({
            message: "Authentication token is required"
        });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (
            typeof decoded === "string" ||
            typeof decoded.userId !== "number"
        ) {
            res.status(401).json({
                message: "Invalid authentication token"
            });
            return;
        }

        req.userId = decoded.userId;
        next();
    } catch {
        res.status(401).json({
            message: "Invalid or expired authentication token"
        });
    }
}
