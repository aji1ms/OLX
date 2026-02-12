'use client';

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState, useRef } from "react";
import { fetchCategoryThunk } from "../../redux/slices/categorySlice";
import { createProductThunk } from "../../redux/slices/productSlice";
import toast from "react-hot-toast";

export default function AddProductPage() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { categories } = useSelector((state: RootState) => state.category);
    const { user } = useSelector((state: RootState) => state.auth);
    const { loading } = useSelector((state: RootState) => state.products);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        categoryId: "",
        location: ""
    });
    const [selectedImages, setSelectedImages] = useState<(File | null)[]>([null, null, null, null]);
    const [previews, setPreviews] = useState<string[]>([]);

    useEffect(() => {
        dispatch(fetchCategoryThunk());
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement>
    ) => {
        const { value, name } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) return toast.error("File size must be less than 5MB");

            const newImages = [...selectedImages];
            newImages[index] = file;
            setSelectedImages(newImages);

            const reader = new FileReader();
            reader.onloadend = () => {
                const newPreviews = [...previews];
                newPreviews[index] = reader.result as string;
                setPreviews(newPreviews);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const actualImages = selectedImages.filter(img => img !== null);
        if (actualImages.length < 1) return toast.error("Please upload at least 1 photo");
        if (!formData.categoryId || !formData.title || !formData.price || !formData.location) {
            return toast.error("Please fill all required fields");
        }

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("location", formData.location);
        data.append("categoryId", formData.categoryId);

        actualImages.forEach((img) => {
            data.append("images", img as File);
        });

        const result = await dispatch(createProductThunk(data));
        if (createProductThunk.fulfilled.match(result)) {
            toast.success("Ad posted successfully!");
            router.push("/");
        } else {
            toast.error("Failed to post ad");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            <header className="bg-white shadow-sm mb-8">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-[#002f34] cursor-pointer" onClick={() => router.push("/")}>OLX</h1>
                    <button onClick={() => router.push("/")} className="text-gray-500 hover:text-black transition">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">POST YOUR AD</h2>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                    <div className="p-6 space-y-8">
                        {/* Category */}
                        <section>
                            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase">Category *</label>
                            <select
                                id="categoryId"
                                name="categoryId"

                                value={formData.categoryId}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded focus:border-blue-500 outline-none"
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                            </select>
                        </section>

                        <hr />

                        {/* Details */}
                        <section className="space-y-4">
                            <h3 className="font-bold text-gray-800 uppercase">Include some details</h3>
                            <div>
                                <label className="text-sm text-gray-600">Ad Title *</label>
                                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded mt-1" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-600">Description *</label>
                                <textarea id="description" name="description" rows={4} value={formData.description} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded mt-1"></textarea>
                            </div>
                        </section>

                        <hr />

                        {/* Price */}
                        <section>
                            <h3 className="font-bold text-gray-800 uppercase mb-4">Set a Price</h3>
                            <div className="flex items-center border border-gray-300 rounded p-3">
                                <span className="text-gray-500 mr-2">₹</span>
                                <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} className="flex-1 outline-none" />
                            </div>
                        </section>

                        <hr />

                        {/* Images */}
                        <section>
                            <h3 className="font-bold text-gray-800 uppercase mb-4">Upload Photos (Max 4)</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[0, 1, 2, 3].map((i) => (
                                    <label key={i} className="relative aspect-square border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 overflow-hidden">
                                        {previews[i] ? (
                                            <img src={previews[i]} className="w-full h-full object-fill" alt="preview" />
                                        ) : (
                                            <div className="text-center">
                                                <svg className="w-8 h-8 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2" /></svg>
                                                <span className="text-xs text-gray-500">Add Photo</span>
                                            </div>
                                        )}
                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageChange(i, e)} />
                                    </label>
                                ))}
                            </div>
                        </section>

                        <hr />

                        {/* Location */}
                        <section>
                            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase">Location *</label>
                            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} placeholder="City, State" className="w-full p-3 border border-gray-300 rounded" />
                        </section>
                    </div>

                    <div className="bg-gray-50 p-6 border-t border-gray-200">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full md:w-max px-12 py-3 bg-[#002f34] text-white font-bold rounded hover:bg-opacity-90 transition disabled:bg-gray-400"
                        >
                            {loading ? "Posting..." : "Post Now"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}