import { useState } from "react";

interface SignupFormProps {
  onSubmit: (data: {
    // name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
}

export default function SignupForm({ onSubmit }: SignupFormProps) {
  const [formData, setFormData] = useState({
    // name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // if (!formData.name.trim()) {
    //   newErrors.name = "이름을 입력해주세요";
    // }

    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
    } else if (
      !/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "비밀번호는 8자 이상이며, 대문자/숫자/특수문자를 포함해야 합니다";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다";
    }

    setErrors(newErrors);

    if (newErrors.password || newErrors.confirmPassword) {
      setFormData((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // 에러가 있으면 해당 필드의 에러 제거
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 이름 입력 */}
      <div>
        {/* <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          이름
        </label> */}
        {/* <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            errors.name ? "border-red-300 bg-red-50" : "border-gray-200 bg-white hover:border-gray-300"
          }`}
          placeholder="이름을 입력해주세요"
        /> */}
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      {/* 이메일 입력 */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          이메일
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            errors.email
              ? "border-red-300 bg-red-50"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
          placeholder="이메일을 입력해주세요"
        />
        {errors.email && (
          <p className="mt-1 text-[9px] text-red-600">{errors.email}</p>
        )}
      </div>

      {/* 비밀번호 입력 */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            errors.password
              ? "border-red-300 bg-red-50"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
          placeholder="비밀번호를 입력해주세요 (8자 이상)"
        />
        {errors.password && (
          <p className="mt-1 text-[9px] text-red-600">{errors.password}</p>
        )}
      </div>

      {/* 비밀번호 확인 입력 */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          비밀번호 확인
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            errors.confirmPassword
              ? "border-red-300 bg-red-50"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
          placeholder="비밀번호를 다시 입력해주세요"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-[9px] text-red-500">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* 회원가입 버튼 */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
      >
        회원가입
      </button>
    </form>
  );
}
