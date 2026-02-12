import Header from '../components/Home/Header';
import Categories from '../components/Home/Category';
import Recommendations from '../components/Home/Recommendations';
import Footer from '../components/Home/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Category Filter Section */}
      <Categories />

      {/* Fresh Recommendations Section */}
      <Recommendations />

      {/* Footer */}
      <Footer />
    </div>
  );
};