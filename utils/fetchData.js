//Get data from API
export default async function fetchData(url,  { donorId ,  id } = {}) {
  if (id) url += `?id=${id}`;
   if (donorId) url += `?donorId=${donorId}`;
  try {
    console.log(url);
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
    if (Array.isArray(value)) {
      value.forEach((v) => formData.append(`${key}[]`, v)); // use key[] for arrays
    } else if (value !== null && value !== undefined) {
      formData.append(key, value.toString());
    }
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
