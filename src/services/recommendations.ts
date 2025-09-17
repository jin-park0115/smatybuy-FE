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

export async function fetchRecommendedProducts(
  params: RecommendationParams
): Promise<Product[]> {
  // TODO: 백엔드 연동 시 아래를 API 호출로 교체
  // const endpoint = `${import.meta.env.VITE_API_BASE_URL}/recommendations`;
  // const res = await fetch(`${endpoint}?${new URLSearchParams({ url: params.url || "", name: params.name || "" })}`);
  // const data = await res.json();
  // return data.products;

  const response = await fetch("/data.json");
  const productData = await response.json();
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
}
