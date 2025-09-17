import { useLocation } from "react-router-dom";

export function useQueryInput() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const url = params.get("url") || "";
  const name = params.get("name") || "";
  return { url, name };
}



