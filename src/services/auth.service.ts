import bcrypt from "bcrypt";
import {
    createUser,
    findUserByEmail,
    findUserById
} from "../repositories/user.repository.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt.js";

interface RegisterInput {
    name: string;
    email: string;
    password: string;
}

export async function registerUser(input: RegisterInput) {
    const existingUser = await findUserByEmail(input.email);

    if (existingUser) {
        throw new Error("EMAIL_ALREADY_EXISTS");
    }

    const passwordHash = await bcrypt.hash(input.password, 12);

    return createUser({
        name: input.name,
        email: input.email,
        passwordHash
    });
}

export async function loginUser(input: {
    email: string;
    password: string;
}) {
    const user = await findUserByEmail(input.email);

    if (!user) {
        throw new Error("INVALID_CREDENTIALS");
    }

    const passwordMatches = await bcrypt.compare(
        input.password,
        user.passwordHash
    );

    if (!passwordMatches) {
        throw new Error("INVALID_CREDENTIALS");
    }

    const token = jwt.sign(
        { userId: user.id },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] }
    );

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        token
    };
}

export async function getCurrentUser(userId: number) {
    const user = await findUserById(userId);

    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    return user;
}
