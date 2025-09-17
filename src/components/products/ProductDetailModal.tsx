import type { Product } from "../../services/recommendations";

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: Props) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              SmartBuy
            </h2>
            <div className="flex justify-center space-x-2 mt-3">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-lg"></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center">
              <div className="w-10 h-10 border-2 border-gray-300 rounded-md relative">
                <div className="absolute inset-0 rotate-45">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300"></div>
                </div>
                <div className="absolute inset-0 -rotate-45">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300"></div>
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xl font-semibold text-gray-900 truncate">
                {product.name}
              </p>
              <p className="text-xl font-medium text-gray-700">
                ${(product.price / 1000).toFixed(2)}
              </p>
            </div>
          </div>

          <a
            href={product.buyUrl || "#"}
            target="_blank"
            rel="noreferrer"
            className="mt-6 block w-full text-center py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-colors duration-200"
          >
            Buy Now
          </a>

          <p className="mt-3 text-center text-gray-500 text-sm">
            Redirects to store app/website
          </p>

          <div className="mt-6 text-center">
            <span className="text-gray-600 font-medium bg-white/50 px-4 py-2 rounded-full">
              3/3
            </span>
          </div>

          <button
            type="button"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 border border-gray-200 text-gray-600 hover:text-gray-900 shadow-sm"
            aria-label="닫기"
            onClick={onClose}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

