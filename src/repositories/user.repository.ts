import prisma from "../config/database.js";

export async function findUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: {
            email
        }
    });
}

export async function createUser(data: {
    name: string;
    email: string;
    passwordHash: string;
}) {
    return prisma.user.create({
        data,
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true
        }
    });
}