import ProductCard from "../ProductCard";
import type { Product } from "../../services/recommendations";

interface Props {
  products: Product[];
  onSelect: (product: Product) => void;
}

export default function RecommendedList({ products, onSelect }: Props) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6">
      <div className="space-y-4">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product as any}
            index={index}
            onClick={() => onSelect(product)}
          />
        ))}
      </div>
      <div className="mt-8 text-center">
        <span className="text-gray-600 font-medium bg-white/50 px-4 py-2 rounded-full">
          2/3
        </span>
        <p className="text-gray-500 text-sm">AI가 분석한 추천 상품입니다</p>
      </div>
    </div>
  );
}


