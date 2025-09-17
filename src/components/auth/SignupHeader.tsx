export default function SignupHeader() {
  return (
    <div className="text-center space-y-2">
      {/* 로고 영역 */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-white text-2xl font-bold">S</span>
        </div>
      </div>

      {/* 제목 */}
      <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        SmartBuy
      </h1>

      {/* 부제목 */}
      <p className="text-gray-600 text-lg">
        계정을 만들어보세요
      </p>

      {/* 설명 */}
      <p className="text-gray-500 text-sm">
        스마트한 쇼핑의 시작, SmartBuy와 함께하세요
      </p>
    </div>
  );
}

