import bcrypt from "bcrypt";
import { prisma } from "../../config/prisma.js";
import { ApiError } from "../../utils/apiError.js";
import { generateToken } from "../../utils/jwt.js";

const JWT_SECRET = process.env.JWT_SECRET as string;

// Register User

export const registerUser = async (
    name: string,
    email: string,
    phone: string,
    password: string
) => {
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [{ email }, { phone }],
        },
    });

    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
        data: {
            name,
            email,
            phone,
            password: hashedPassword,
        },   
    });
};

// Login User 

export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new ApiError(401, "Invalid email or password"); 
    }

    const token = generateToken({ userId: user.id });

    return { user, token };
};

// Get User

export const getUserById = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            createdAt: true,
        },
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
};