import { Request, Response, NextFunction } from "express";
import * as productService from "./product.services";
import { AuthRequest } from "../../middleware/auth.middleware.js";

// CREATE PRODUCT 

export const createProduct = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const files = req.files as Express.Multer.File[];

        if (!files || files.length < 4) {
            return res.status(400).json({
                success: false,
                message: "4 image is required",
            });
        }

        const imageUrls = files.map((file: any) => file.path);

        const product = await productService.createProduct(
            req.userId as string,
            {
                title: req.body.title,
                description: req.body.description,
                price: Number(req.body.price),
                location: req.body.location,
                categoryId: Number(req.body.categoryId),
                images: imageUrls,
                userId: req.userId as string, 
            }
        );

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

// GET ALL PRODUCTS

export const getProducts = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const products = await productService.getAllProducts();

        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        next(error);
    }
};

// GET SINGLE PRODUCT

export const getProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id as string;

        const product = await productService.getProductById(id);

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

// GET PRODUCTS BY CATEGORY

export const getProductsByCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const categoryId = Number(req.params.categoryId);

        const products = await productService.getProductsByCategory(categoryId);

        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        next(error);
    }
};
