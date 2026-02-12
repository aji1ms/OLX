import { Request, Response, NextFunction } from "express";
import * as categoryService from "./category.services";

// GET ALL CATEGORIES

export const getCategories = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const categories = await categoryService.getAllCategories();

        res.status(200).json({
            success: true,
            data: categories,
        });
    } catch (error) {
        next(error);
    }
};

// GET SINGLE CATEGORY (by slug)

export const getCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const slug = req.params.slug as string;

        const category = await categoryService.getCategoryBySlug(slug);

        res.status(200).json({
            success: true,
            data: category,
        });
    } catch (error) {
        next(error);
    }
};