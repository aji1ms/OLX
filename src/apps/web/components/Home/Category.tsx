'use client';

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { useEffect, useState } from "react";
import { fetchCategoryThunk } from "../../redux/slices/categorySlice";
import { useRouter } from "next/navigation";

export default function Categories() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, categories, error } = useSelector((state: RootState) => state.category);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchCategoryThunk());
    }, [dispatch]);

    const handleCategoryClick = (id: string) => {
        router.push(`/?category=${id}`);
    };

    if (loading) {
        return (
            <section className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-8 w-24 bg-gray-200 animate-pulse rounded-full"></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 text-red-500 text-xs py-2 text-center">
                Failed to load categories. <button onClick={() => dispatch(fetchCategoryThunk())} className="underline font-bold">Retry</button>
            </div>
        );
    }

    return (
        <section className="bg-white border-b border-gray-200 relative">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">

                <div className="relative border-r border-gray-300 pr-4 mr-4">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 text-gray-800 font-bold hover:text-blue-600 transition whitespace-nowrap cursor-pointer text-sm"
                    >
                        ALL CATEGORIES
                        <svg className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* DROPDOWN MENU */}
                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-3 w-64 bg-white shadow-2xl border border-gray-200 rounded-md py-2 z-70">
                            <button
                                className="w-full text-left px-4 py-3 hover:bg-gray-100 hover:text-blue-600 transition text-sm text-gray-700 border-b border-gray-50 last:border-0"
                                onClick={() => {
                                    handleCategoryClick('')
                                    setIsDropdownOpen(false);
                                }}
                            >
                                All
                            </button>
                            <div className="max-h-96 overflow-y-auto">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        className="w-full text-left px-4 py-3 hover:bg-gray-100 hover:text-blue-600 transition text-sm text-gray-700 border-b border-gray-50 last:border-0"
                                        onClick={() => {
                                            router.push(`/?category=${cat.id}`);
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide py-1">
                    <button
                        onClick={() => handleCategoryClick('')}
                        className="text-sm text-gray-700 hover:text-blue-600 transition whitespace-nowrap cursor-pointer"
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat?.id}
                            onClick={() => handleCategoryClick(cat.id)}
                            className="text-sm text-gray-700 hover:text-blue-600 transition whitespace-nowrap cursor-pointer"
                        >
                            {cat?.name}
                        </button>
                    ))}
                </div>
            </div>

            {
                isDropdownOpen && (
                    <div
                        className="fixed inset-0 z-60 bg-black/5"
                        onClick={() => setIsDropdownOpen(false)}
                    ></div>
                )
            }
        </section >
    )
}