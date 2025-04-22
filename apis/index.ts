export const Fetch = async <T>(
  url: string,
  request: RequestInit
): Promise<T> => {
  try {
    const response = await fetch(url, request);
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
  } catch (error) {
    throw new Error("error occured");
  }
};
