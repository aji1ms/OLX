import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../lib/axios';

interface Category {
    id: string;
    name: string;
}

interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null
}

// Fetch Categories

export const fetchCategoryThunk = createAsyncThunk(
    "category/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/api/category/")
            return res.data.data;
        } catch (error: any) {
            const message = error.response?.data?.message || "Failed to load categories";
            return rejectWithValue(message);
        }
    }
)

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoryThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategoryThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategoryThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
});

export default categorySlice.reducer