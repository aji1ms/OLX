import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";

export interface AuthRequest extends Request {
    userId?: string;
}

export const authenticate = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => { 
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    try {
        const decoded = verifyToken(token);
        req.userId = decoded.userId;
        next();
    } catch {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
};
