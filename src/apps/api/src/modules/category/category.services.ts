import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/apiError";

// Get all categories

export const getAllCategories = async () => {
    return prisma.category.findMany({
        orderBy: {
            id: "asc",
        },
    });
};

// Get single category by slug

export const getCategoryBySlug = async (slug: string) => {
    const category = await prisma.category.findUnique({
        where: { slug },
    });

    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    return category;
};
