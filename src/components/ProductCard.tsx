interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  stock: number;
  brand: string;
  country?: string;
  options: {
    color: string[];
    size: string[];
  };
  rating: {
    average: number;
    reviews: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
  onClick?: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const formatPrice = (price: number, currency: string) => {
    if (currency === "KRW") {
      return `₩${price.toLocaleString()}`;
    }
    return `$${(price / 1000).toFixed(2)}`;
  };

  // 국가별 국기 아이콘 렌더링
  const renderFlagIcon = (country: string) => {
    const iconClasses =
      "w-8 h-6 border border-gray-300 rounded-sm flex items-center justify-center overflow-hidden";

    switch (country) {
      case "미국":
        return (
          <div className={iconClasses}>
            <div className="w-full h-full relative">🇺🇸</div>
          </div>
        );
      case "한국":
        return (
          <div className={iconClasses}>
            <div className="w-full h-full relative">🇰🇷</div>
          </div>
        );
      case "중국":
        return (
          <div className={iconClasses}>
            <div className="w-full h-full relative">🇨🇳</div>
          </div>
        );
      case "일본":
        return (
          <div className={iconClasses}>
            <div className="w-full h-full relative">🇯🇵</div>
          </div>
        );
      case "독일":
        return (
          <div className={iconClasses}>
            <div className="w-full h-full relative">🇩🇪</div>
          </div>
        );
      default:
        return (
          <div className={iconClasses}>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        );
    }
  };

  return (
    <button
      type="button"
      onClick={() => onClick?.(product)}
      className="w-full text-left bg-white rounded-xl border border-gray-200 p-4 flex items-center space-x-4 hover:shadow-md transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      aria-label={`${product.name} 상세보기`}
    >
      {/* 제품 이미지 플레이스홀더 */}
      <div className="w-16 h-16 bg-gray-100 border border-gray-200 rounded-lg flex-shrink-0"></div>

      {/* 제품 정보 */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {product.name}
        </h3>
        <p className="text-lg font-medium text-gray-700">
          {formatPrice(product.price, product.currency)}
        </p>
      </div>

      {/* 국기 아이콘 */}
      <div className="flex-shrink-0">
        {renderFlagIcon(product.country || "한국")}
      </div>
    </button>
  );
}
