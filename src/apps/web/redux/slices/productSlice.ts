import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../lib/axios";

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    images: string[];
    categoryId: number;
    userId: string;
    createdAt: string;
    category?: { id: number; name: string };
    user: { id: string; name: string };
}

interface ProductState {
    products: Product[];
    selectedProduct: Product | null;
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
};

// Fetch Products

export const fetchProductsThunk = createAsyncThunk(
    "product/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/api/product");
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch products");
        }
    }
);

// Fetch Products By ID

export const fetchProductByIdThunk = createAsyncThunk(
    "product/fetchById",
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await api.get(`/api/product/${id}`);
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Product not found");
        }
    }
);

// Fetch Product By Cat ID

export const fetchByCategoryIdThunk = createAsyncThunk(
    "product/fetchByCat",
    async (categoryId: number, { rejectWithValue }) => {
        try {
            const res = await api.get(`/api/product/category/${categoryId}`);
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to filter products");
        }
    }
);

// Create Product

export const createProductThunk = createAsyncThunk(
    "product/create",
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const res = await api.post("/api/product", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to post product");
        }
    }
);

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch All Products
        builder.addCase(fetchProductsThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchProductsThunk.fulfilled, (state, action: PayloadAction<Product[]>) => {
            state.loading = false;
            state.products = action.payload;
        });
        builder.addCase(fetchProductsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Fetch Single Product
        builder.addCase(fetchProductByIdThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProductByIdThunk.fulfilled, (state, action: PayloadAction<Product>) => {
            state.loading = false;
            state.selectedProduct = action.payload;
        });

        // Fetch By Category
        builder.addCase(fetchByCategoryIdThunk.fulfilled, (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
            state.loading = false;
        });

        // Create Product
        builder.addCase(createProductThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createProductThunk.fulfilled, (state, action: PayloadAction<Product>) => {
            state.loading = false;
            state.products.unshift(action.payload);
        });
        builder.addCase(createProductThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;