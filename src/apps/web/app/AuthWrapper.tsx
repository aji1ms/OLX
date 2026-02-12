"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk } from "../redux/slices/authSlice";
import { AppDispatch, RootState } from "../redux/store";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.auth);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initAuth = async () => {
            await dispatch(getUserThunk());
            setIsInitialized(true);
        };
        initAuth();
    }, [dispatch]);
    if (!isInitialized || loading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return <>{children}</>;
}