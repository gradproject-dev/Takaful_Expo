//Get data from API
export default async function fetchData(url,  { donorId ,  id } = {}) {
  if (id) url += `?id=${id}`;
   if (donorId) url += `?donorId=${donorId}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching data: " + error.message);
  }
}

// Post data to API
export async function postData(url, data) {
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
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("Error posting data: " + error.message);
  }
}

export async function createDonor(url, data) {
  const formData = new FormData();
  for (const key in data) {
    const value = data[key];
    formData.append(key, value);
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Error posting data: " + error.message);
  }
}
export async function createDonation(url, data) {
  Object.entries(data).forEach(([key, value]) => {
    if (key !== 'files') {
      formData.append(key, String(value));
    }
  });
  
  // Correctly append multiple files
  data.files.forEach((file, index) => {
    formData.append('files', {
      uri: file.uri,
      name: file.fileName ?? `image_${index}.jpg`,
      type: file.type ?? 'image/jpeg',
    });
  });
  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      console.log(await response.text());
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    console.log(result) 
    return result;
  } catch (error) {
    console.log(error)
    throw new Error("Error posting data: " + error.message);
  }
}
// type FileLike = {
//   uri: string;
//   name: string;
//   type: string;
// };

function isFile(value) {
  return (
    value &&
    typeof value === 'object' &&
    typeof value.uri === 'string' &&
    typeof value.name === 'string' &&
    typeof value.type === 'string'
  );
}
