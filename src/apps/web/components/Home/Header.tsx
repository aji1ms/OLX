'use client';

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useRouter } from "next/navigation";
import { logoutThunk } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

export default function Header() {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    const handleLogout = async () => {
        await dispatch(logoutThunk());
        router.push("/login")
    }

    const handleSellClick = () => {
        if (!isAuthenticated) {
            toast.error("Please login to sell items", { duration: 1000 });
            router.push("/login");
        } else {
            router.push("/sell");
        }
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-2">
                <div className="flex items-center gap-4 lg:gap-8">
                    {/*Logo*/}
                    <Link href="/" className="shrink-0">
                        <h1 className="text-3xl font-black text-[#002f34]">OLX</h1>
                    </Link>

                    {/*Search Bar*/}
                    <div className="hidden md:flex flex-1 items-center border-2 border-[#002f34] rounded-sm overflow-hidden bg-white">
                        <input
                            type="text"
                            placeholder="Find Cars, Mobile Phones and more..."
                            className="flex-1 px-4 py-2 outline-none text-[#002f34]"
                        />
                        <button className="bg-[#002f34] text-white px-5 py-2.5 hover:bg-opacity-90 transition">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-2 lg:gap-5 ml-auto">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-2">
                                <span className="hidden lg:block text-sm font-bold text-[#002f34]">
                                    Hi, {user?.name?.split(' ')[0]}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="px-3 py-2 text-sm font-bold text-red-600 underline hover:no-underline transition cursor-pointer"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className="px-3 py-2 text-sm lg:text-base text-[#002f34] font-bold underline hover:no-underline transition cursor-pointer">
                                Login
                            </Link>
                        )}

                        {/* Sell Button */}
                        <button
                            onClick={handleSellClick}
                            className="relative flex items-center justify-center group cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-white rounded-full border-[5px] border-t-yellow-400 border-l-blue-400 border-r-blue-700 border-b-blue-700 shadow-sm"></div>
                            <div className="relative flex items-center gap-1 px-5 py-1.5 text-[#002f34] font-bold text-sm lg:text-base uppercase">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Sell</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar (Mobile) */}
                <div className="md:hidden mt-3 mb-1">
                    <div className="flex items-center border-2 border-[#002f34] rounded-md overflow-hidden bg-white">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="flex-1 px-3 py-2 outline-none text-sm"
                        />
                        <button className="bg-[#002f34] text-white px-4 py-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}