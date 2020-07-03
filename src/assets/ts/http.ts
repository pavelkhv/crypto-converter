export const http = async (url: string): Promise<any> => {
  const res = await fetch(url);
  const body = await res.json();
  return body;
}