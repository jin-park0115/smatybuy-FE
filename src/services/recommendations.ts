import axios, { AxiosResponse } from 'axios';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  stock: number;
  brand: string;
  country?: string;
  options: { color: string[]; size: string[] };
  rating: { average: number; reviews: number };
  createdAt: string;
  updatedAt: string;
  buyUrl?: string;
}

export interface RecommendationParams {
  url?: string;
  name?: string;
}

export interface N8nRecommendationResponse {
  products: Product[];
  success: boolean;
  message?: string;
}

// n8n 백엔드 API 설정
const N8N_API_BASE_URL = import.meta.env.VITE_N8N_API_URL || 'http://localhost:5678/webhook';

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: N8N_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// n8n 백엔드에서 추천 상품 가져오기
export async function fetchRecommendedProductsFromN8n(
  params: RecommendationParams
): Promise<Product[]> {
  try {
    const response: AxiosResponse<N8nRecommendationResponse> = await apiClient.post('/recommendations', {
      url: params.url,
      name: params.name,
    });

    if (response.data.success && response.data.products) {
      return response.data.products;
    } else {
      throw new Error(response.data.message || '추천 상품을 가져오는데 실패했습니다.');
    }
  } catch (error) {
    console.error('n8n API 호출 오류:', error);
    throw new Error('백엔드 서버와 통신 중 오류가 발생했습니다.');
  }
}

// 기존 로컬 데이터를 사용하는 함수 (fallback)
export async function fetchRecommendedProductsLocal(
  params: RecommendationParams
): Promise<Product[]> {
  try {
    const response = await axios.get("/data.json");
    const productData = response.data;
    const baseName = params.name || productData.name;

    // 5개 국가 목록
    const countries = ["미국", "한국", "중국", "일본", "독일"];

    const products: Product[] = [];
    for (let i = 0; i < 5; i++) {
      products.push({
        ...productData,
        id: `P000${i + 1}`,
        name: `${baseName} ${i + 1}`,
        price: productData.price + i * 10000,
        country: countries[i],
        buyUrl: params.url, // 데모: 입력 URL을 buyUrl로 보존
      });
    }
    return products;
  } catch (error) {
    console.error('로컬 데이터 로드 오류:', error);
    throw new Error('상품 데이터를 불러오는데 실패했습니다.');
  }
}

// 메인 추천 상품 가져오기 함수 (n8n 우선, 실패 시 로컬 fallback)
export async function fetchRecommendedProducts(
  params: RecommendationParams
): Promise<Product[]> {
  // 환경변수로 n8n 사용 여부를 제어할 수 있음
  const useN8n = import.meta.env.VITE_USE_N8N === 'true';

  if (useN8n) {
    try {
      return await fetchRecommendedProductsFromN8n(params);
    } catch (error) {
      console.warn('n8n API 실패, 로컬 데이터로 fallback:', error);
      return await fetchRecommendedProductsLocal(params);
    }
  } else {
    return await fetchRecommendedProductsLocal(params);
  }
}
