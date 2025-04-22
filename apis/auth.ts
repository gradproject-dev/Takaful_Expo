import { LoginProps } from "@/types/auth.types";
import { Fetch } from ".";
const URL = process.env.BACKEND_URL;

export const fetchLogin = async <T>(body: LoginProps): Promise<T> => {
  const data = await Fetch<T>(`${URL}/login`, {
    body: JSON.stringify(body),
    method: "POST",
    headers: {
      "Content-Type": "application/json", // tell the server it's JSON
    },
  });
  return data;
};
