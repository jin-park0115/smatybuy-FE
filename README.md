# SmartBuy - 상품 추천 서비스

React + TypeScript + Vite로 구축된 상품 추천 서비스입니다. n8n 백엔드와 연동하여 AI 기반 상품 추천을 제공합니다.

## 주요 기능

- 상품 URL 또는 이름을 통한 추천 상품 조회
- n8n 백엔드 API 연동
- 로컬 데이터 fallback 지원
- 반응형 UI (Tailwind CSS)

## 환경 설정

### n8n 백엔드 연동 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경변수를 설정하세요:

```env
# n8n 백엔드 연동 설정
VITE_N8N_API_URL=http://localhost:5678/webhook
VITE_USE_N8N=false

# 개발/프로덕션 환경 설정
VITE_API_BASE_URL=http://localhost:3000/api
```

### 환경변수 설명

- `VITE_N8N_API_URL`: n8n 웹훅 URL (기본값: http://localhost:5678/webhook)
- `VITE_USE_N8N`: n8n API 사용 여부 (true/false)
- `VITE_API_BASE_URL`: 일반 API 베이스 URL

### n8n 워크플로우 설정

n8n에서 다음과 같은 웹훅 엔드포인트를 설정하세요:

- **엔드포인트**: `/recommendations`
- **메서드**: POST
- **요청 형식**:
  ```json
  {
    "url": "상품 URL (선택사항)",
    "name": "상품 이름 (선택사항)"
  }
  ```
- **응답 형식**:
  ```json
  {
    "success": true,
    "products": [
      {
        "id": "P0001",
        "name": "상품명",
        "description": "상품 설명",
        "category": "카테고리",
        "price": 10000,
        "currency": "KRW",
        "stock": 100,
        "brand": "브랜드명",
        "country": "한국",
        "options": {
          "color": ["빨강", "파랑"],
          "size": ["S", "M", "L"]
        },
        "rating": {
          "average": 4.5,
          "reviews": 100
        },
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z",
        "buyUrl": "구매 URL"
      }
    ],
    "message": "성공 메시지 (선택사항)"
  }
  ```

## 개발 및 실행

### 의존성 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

### 미리보기

```bash
npm run preview
```

## 사용 방법

1. **로컬 모드**: `VITE_USE_N8N=false`로 설정하면 로컬 JSON 데이터를 사용합니다.
2. **n8n 연동 모드**: `VITE_USE_N8N=true`로 설정하고 n8n 워크플로우를 실행하면 실제 AI 추천을 받을 수 있습니다.

## 기술 스택

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Backend Integration**: n8n 웹훅
- **Routing**: React Router DOM

## 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── auth/           # 인증 관련 컴포넌트
│   ├── products/       # 상품 관련 컴포넌트
│   └── ui/             # 공통 UI 컴포넌트
├── pages/              # 페이지 컴포넌트
├── services/           # API 서비스
│   └── recommendations.ts  # 추천 서비스 (n8n 연동)
└── assets/             # 정적 자산
```

## 라이센스

MIT License

---

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
