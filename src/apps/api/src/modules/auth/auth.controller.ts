import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.services";
import { ApiError } from "../../utils/apiError";

export interface AuthRequest extends Request {
    userId?: string;
}

// Register

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, email, phone, password } = req.body;

        const user = await authService.registerUser(
            name,
            email,
            phone,
            password
        );

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        next(error);
    }
};
 
// Login

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => { 
    try {
        const { email, password } = req.body;

        const { user, token } = await authService.loginUser(email, password);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 1 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

// Get User

export const getUser = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.userId;

        if (!userId) {
            throw new ApiError(401, "User ID not found in request");
        }

        const user = await authService.getUserById(userId);

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

// Logout

export const logout = (
    _req: Request,
    res: Response
) => {
    res.clearCookie("token").status(200).json({
        success: true,
        message: "Logout successful",
    })
        .status(200)
        .json({
            success: true,
            message: "Logout successful",
        });
};