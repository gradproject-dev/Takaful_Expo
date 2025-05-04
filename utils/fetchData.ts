import { Donation } from "@/types/allTypes";

// types.ts (optional, or place at the top of your file)
export type FileLike = {
  uri: string;
  name: string;
  type: string;
};

export interface FetchOptions {
  donorId?: string | number;
  id?: string | number;
}

// helpers.ts or same file
function isFile(value: any): value is FileLike {
  return (
    value &&
    typeof value === "object" &&
    typeof value.uri === "string" &&
    typeof value.name === "string" &&
    typeof value.type === "string"
  );
}

// --- API functions ---
export default async function fetchData<T = any>(
  url: string,
  { donorId, id }: FetchOptions = {}
): Promise<T> {
  if (id) url += `?id=${id}`;
  else if (donorId) url += `?donorId=${donorId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const data: T = await response.json();
    return data;
  } catch (error: any) {
    throw new Error("Error fetching data: " + error.message);
  }
}

export async function postData<T = any>(
  url: string,
  data: Record<string, any>
): Promise<T> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result: T = await response.json();
    return result;
  } catch (error: any) {
    throw new Error("Error posting data: " + error.message);
  }
}

export async function createDonor<T = any>(
  url: string,
  data: Record<string, string | FileLike>
): Promise<T> {
  const formData = new FormData();
  console.log(data);
  console.log("sadad");
  for (const key in data) {
    const value = data[key];
    formData.append(key, value as string);
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.log(await response.json());
      console.log(response);
      throw new Error("Network response was not ok");
    }

    const result: T = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    throw new Error("Error posting data: " + error.message);
  }
}

export async function createDonation(
  url: string,
  data: {
    [key: string]: any;
    files: { uri: string; name: string; type: string }[];
  }
) {
  console.log("data", data);
  const formData = new FormData();

  try {
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "files") {
        formData.append(key, String(value));
      }
    });

    data.files.forEach((file, index) => {
      const fileToUpload = {
        uri: file.uri,
        name: file.name ?? `image_${index}.jpg`,
        type: file.type ?? "image/jpeg",
      };

      formData.append("files", fileToUpload as any);
    });

    console.log(formData.getAll("files"));

    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Response", response);

    if (!response.ok) {
      const text = await response.text();
      console.error(text);
      throw new Error("Network response was not ok");
    }

    const result: Donation = await response.json();
    console.log("Result", result);
    return result;
  } catch (error: any) {
    console.log("Error", error);
    throw new Error("Error posting data: " + error.message);
  }
}
