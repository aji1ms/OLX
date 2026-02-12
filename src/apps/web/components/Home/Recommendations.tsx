'use client';

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { fetchProductsThunk, fetchByCategoryIdThunk } from "../../redux/slices/productSlice";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Recommendations() {
    const dispatch = useDispatch<AppDispatch>();
    const searchParams = useSearchParams();

    const categoryId = searchParams.get('category');

    const { loading, products } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        if (categoryId) {
            dispatch(fetchByCategoryIdThunk(Number(categoryId)));
        } else {
            dispatch(fetchProductsThunk());
        }
    }, [dispatch, categoryId]);

    if (loading) {
        return (
            <section className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-72 bg-gray-200 animate-pulse rounded-lg" />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {categoryId ? "Filtered Results" : "Fresh recommendations"}
            </h2>

            {products.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-500">No products found in this category.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((prod) => (
                        <Link href={`/product/${prod.id}`} key={prod?.id}>
                            <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition cursor-pointer border border-gray-200 h-full">
                                <div className="relative">
                                    <img
                                        src={prod?.images[0]}
                                        alt={prod?.title}
                                        className="w-full object-cover"
                                    />
                                </div>
                                <div className="p-3">
                                    <h3 className="font-bold text-lg text-gray-800">₹ {prod?.price.toLocaleString()}</h3>
                                    <p className="text-gray-600 text-sm mt-1 line-clamp-1">{prod?.title}</p>
                                    <div className="flex items-center justify-between mt-6 text-[10px] text-gray-400 uppercase">
                                        <span className="truncate w-24">{prod?.location}</span>
                                        <span>{new Date(prod?.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}