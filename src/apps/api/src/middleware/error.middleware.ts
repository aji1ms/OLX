import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError.js";

export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    console.error("❌ Unexpected Error:", err);

    return res.status(500).json({
        success: false,    
        message: "Internal server error",
    });
};
