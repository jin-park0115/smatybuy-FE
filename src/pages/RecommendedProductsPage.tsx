import { useEffect, useState } from "react";
import RecommendedHeader from "../components/products/RecommendedHeader";
import RecommendedList from "../components/products/RecommendedList";
import ProductDetailModal from "../components/products/ProductDetailModal";
import { useQueryInput } from "../components/products/useQueryInput";
import {
  fetchRecommendedProducts,
  type Product,
} from "../services/recommendations";

export default function RecommendedProductsPage() {
  const { url, name } = useQueryInput();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const list = await fetchRecommendedProducts({ url, name });
        setProducts(list);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [url, name]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProduct(null);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
            <div className="flex justify-center">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
            <p className="text-center text-gray-600 mt-4">
              상품을 불러오는 중...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-2xl mx-auto pt-8">
        <RecommendedHeader />
        <RecommendedList products={products} onSelect={setSelectedProduct} />
      </div>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
