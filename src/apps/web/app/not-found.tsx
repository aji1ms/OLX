import Footer from "../components/Home/Footer";
import Header from "../components/Home/Header";

export default function ErrorPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header />
            <h1 className="text-3xl font-bold mt-20">Page Not Found</h1>
            {/* Footer */}
            <Footer />
        </div>
    )
}