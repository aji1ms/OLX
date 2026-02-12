import { prisma } from "../../config/prisma.js";
import { ApiError } from "../../utils/apiError.js";
import { ProductInput } from "./product.types.js";

// Create Product

export const createProduct = async (
    userId: string,
    data: ProductInput
) => {
    const category = await prisma.category.findUnique({
        where: { id: data.categoryId },
    });

    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    return prisma.product.create({
        data: {
            ...data,
            userId,
        },
    });
};

// Get All Products

export const getAllProducts = async () => {
    return prisma.product.findMany({
        include: {
            category: true,
            user: {
                select: { id: true, name: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });
};

// Get Product By ID

export const getProductById = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: { id },
        include: {
            category: true,
            user: {
                select: { id: true, name: true },
            },
        },
    });

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return product;
};

// Get Product By Category

export const getProductsByCategory = async (categoryId: number) => {
    return prisma.product.findMany({
        where: { categoryId },
        orderBy: { createdAt: "desc" },
    });
};
