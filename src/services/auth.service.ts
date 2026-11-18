import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../repositories/user.repository.js";

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