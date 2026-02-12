'use client';

import { useParams } from "next/navigation";
import Header from "../../../components/Home/Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { clearSelectedProduct, fetchProductByIdThunk } from "../../../redux/slices/productSlice";
import ProductNotFound from "./not-found";

export default function ProductDetailsPage() {
    const params = useParams();
    const productId = params.id as string;
    const dispatch = useDispatch<AppDispatch>();

    const { selectedProduct } = useSelector((state: RootState) => state.products);

    const [mainImage, setMainImage] = useState<string>("");

    useEffect(() => {
        if (productId) {
            dispatch(fetchProductByIdThunk(productId));
        }
        return () => {
            dispatch(clearSelectedProduct());
        };
    }, [dispatch, productId]);

    useEffect(() => {
        if (selectedProduct?.images && selectedProduct.images.length > 0) {
            setMainImage(selectedProduct.images[0] ?? "");
        }
    }, [selectedProduct]);

    if (!selectedProduct) {
        return ProductNotFound();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Section: Images and Description */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                            <div className="relative aspect-video bg-white">
                                <img
                                    src={mainImage || selectedProduct?.images[0]}
                                    alt={selectedProduct?.title}
                                    className="w-full h-full object-contain p-4"
                                />
                                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                                    {selectedProduct?.images.length} Images
                                </div>
                            </div>

                            {/* Dynamic Thumbnails */}
                            {(selectedProduct?.images?.length ?? 0) > 1 && (
                                <div className="flex gap-2 p-4 bg-gray-50 overflow-x-auto">
                                    {selectedProduct?.images.map((img: string, index: number) => (
                                        <div
                                            key={index}
                                            onClick={() => setMainImage(img)}
                                            className={`w-20 h-20 shrink-0 rounded-md overflow-hidden border-2 cursor-pointer transition ${mainImage === img ? 'border-blue-500' : 'border-transparent'
                                                }`}
                                        >
                                            <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Description Card */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-xl font-bold text-[#002f34] mb-4 border-b pb-4">Description</h3>
                            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                {selectedProduct?.description}
                            </div>

                            <div className="mt-8 pt-6 border-t flex justify-between text-sm text-gray-500">
                                <span>Category: <strong className="text-gray-800">
                                    {selectedProduct?.category?.name}</strong></span>
                                <span>ID: {selectedProduct?.id}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Section: Price and Seller */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h1 className="text-4xl font-bold text-[#002f34]">
                                ₹ {selectedProduct?.price.toLocaleString()}
                            </h1>
                            <h2 className="text-xl text-gray-600 mt-2 uppercase">{selectedProduct?.title}</h2>

                            <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                                    {selectedProduct?.location}
                                </span>
                                {new Date(selectedProduct?.createdAt || "").toLocaleDateString()}
                            </div>
                        </div>

                        {/* Seller Card */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-lg font-bold text-[#002f34] mb-4">Seller Information</h3>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold">
                                    {selectedProduct?.user?.name?.charAt(0) || ""}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">{selectedProduct?.user?.name}</h4>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button className="w-full bg-[#002f34] text-white py-3 rounded font-bold hover:bg-opacity-90 transition">
                                    Chat with Seller
                                </button>
                                <div className="text-center py-2 text-sm font-semibold text-blue-600 cursor-pointer hover:underline">
                                    Show Phone Number
                                </div>
                            </div>
                        </div>

                        {/* Safety Tips (Static) */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <p className="font-bold text-[#002f34] mb-2">Safety Tips</p>
                            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                                <li>Meet in a public place</li>
                                <li>Check item before paying</li>
                                <li>Avoid advance payments</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};