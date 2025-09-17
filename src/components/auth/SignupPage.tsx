import { Link } from "react-router-dom";
import SignupHeader from "./SignupHeader";
import SignupForm from "./SignupForm";
import SocialLogin from "./SocialLogin";
import Divider from "../ui/Divider";

export default function SignupPage() {
  const handleSignup = (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    // 회원가입 로직 구현
    console.log("회원가입 시도:", data);
  };

  const handleGoogleLogin = () => {
    // Google 로그인 로직 구현
    console.log("Google 로그인 시도");
  };

  const handleNaverLogin = () => {
    // 네이버 로그인 로직 구현
    console.log("네이버 로그인 시도");
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
          <SignupHeader />

          {/* 회원가입 폼 */}
          <SignupForm onSubmit={handleSignup} />

          {/* 구분선 */}
          <Divider />

          {/* 소셜 로그인 */}
          <SocialLogin
            onGoogleLogin={handleGoogleLogin}
            onNaverLogin={handleNaverLogin}
          />

          {/* 로그인 링크 */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              이미 계정이 있으신가요?{" "}
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-500 font-semibold transition-colors duration-200"
              >
                로그인
              </Link>
            </p>
          </div>
        </div>

        {/* 하단 텍스트 */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-xs">
            회원가입하면 SmartBuy의{" "}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">이용약관</a> 및{" "}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">개인정보처리방침</a>에 동의하는 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}

