import fetch from "isomorphic-unfetch";

// Фетчер для swr ( работа с сетью )
export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}
