import { useEffect } from "react";
import { getUserThunk } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

export const useAuthInit = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getUserThunk());
    }, [dispatch]);
};
