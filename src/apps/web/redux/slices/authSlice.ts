import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/axios';

interface User {
    id: string;
    name: string;
    phone: string;
    email: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
}

// Register

export const registerThunk = createAsyncThunk(
    "auth/register",
    async (
        data: { name: string; email: string; phone: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await api.post("/api/auth/register", data);
            return res.data.data;
        } catch (error: any) {
            const message = error.response?.data?.message || "Registration failed";
            return rejectWithValue(message);
        }
    }
)

// Login

export const loginThunk = createAsyncThunk(
    "auth/login",
    async (
        data: { email: string, password: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await api.post("/api/auth/login", data);
            return res.data.data;
        } catch (error: any) {
            const message = error.response?.data?.message || "Login failed!";
            return rejectWithValue(message);
        }
    }
)

// GetUser

export const getUserThunk = createAsyncThunk(
    "auth/me",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/api/auth/me");
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(null);
        }
    }
)

// Logout

export const logoutThunk = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            await api.post("/api/auth/logout");
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                "Logout failed"
            );
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // login
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


            // Get User
            .addCase(getUserThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(getUserThunk.rejected, (state) => {
                state.loading = false;
                state.error = null;
            })

            // Logout
            .addCase(logoutThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutThunk.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(logoutThunk.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload as string;
            });
    }
})

export default authSlice.reducer;