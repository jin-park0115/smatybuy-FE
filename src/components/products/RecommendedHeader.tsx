import { Link } from "react-router-dom";

export default function RecommendedHeader() {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-6">
      {/* 페이지네이션 점들 */}
      <div className="flex justify-center space-x-2 mb-6">
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-lg"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
      </div>

      {/* 제목 */}
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
        Recommended Products
      </h1>

      {/* 뒤로가기 버튼 */}
      <div className="text-center">
        <Link
          to="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-500 font-medium transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          다시 검색하기
        </Link>
      </div>
    </div>
  );
}

