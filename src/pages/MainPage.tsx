import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const [productUrl, setProductUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isLikelyUrl = (value: string) => {
    try {
      // URL 형식 검사 (스킴 없으면 실패할 수 있으므로 간단한 휴리스틱 포함)
      if (/^https?:\/\//i.test(value)) return true;
      // 도메인 형식 감지
      if (/^[\w.-]+\.[a-zA-Z]{2,}(\/.*)?$/.test(value)) return true;
      return false;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productUrl.trim()) return;

    setIsLoading(true);

    // 제품 URL/이름 처리 로직
    const input = productUrl.trim();
    const query = isLikelyUrl(input)
      ? new URLSearchParams({ url: input }).toString()
      : new URLSearchParams({ name: input }).toString();

    // 로딩 시뮬레이션 (실제 AI 호출로 대체)
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/recommended-products?${query}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      {/* 배경 장식 요소들 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* 메인 카드 */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 space-y-8">
          {/* 헤더 */}
          <div className="text-center space-y-2">
            {/* 로고 영역 */}
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-bold">S</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              SmartBuy
            </h1>
            <p className="text-gray-600 text-lg">
              스마트한 쇼핑 분석을 시작하세요
            </p>
            <p className="text-gray-500 text-sm">
              제품 URL 또는 제품명을 입력하세요
            </p>
          </div>

          {/* 진행 표시기 */}
          <div className="flex justify-center space-x-3">
            <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-lg"></div>
            <div className="w-3 h-3 border-2 border-gray-300 rounded-full"></div>
            <div className="w-3 h-3 border-2 border-gray-300 rounded-full"></div>
          </div>

          {/* 제품 URL/이름 입력 폼 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="productUrl"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                제품 URL 또는 제품명
              </label>
              <input
                type="text"
                id="productUrl"
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                placeholder="Enter product URL or productName"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400"
                disabled={isLoading}
              />
            </div>

            {/* 제출 버튼/로딩 인디케이터 */}
            <div className="flex justify-center">
              {isLoading ? (
                <div className="w-16 h-16 border-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin"></div>
              ) : (
                <button
                  type="submit"
                  disabled={!productUrl.trim()}
                  className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              )}
            </div>
          </form>

          {/* 페이지 번호 */}
          <div className="text-center">
            <span className="text-gray-600 font-medium bg-white/50 px-4 py-2 rounded-full">
              1/3
            </span>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500 text-xs">
            AI 분석을 통해 최적의 구매 결정을 도와드립니다
          </p>
        </div>
      </div>
    </div>
  );
}
