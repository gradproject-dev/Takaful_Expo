//Get data from API
export default async function fetchData(url, searchTerm = "") {
  if (searchTerm) url += `?search=${searchTerm}`;
  try {
    console.log(url);
    const response = await fetch(url);
    if (!response.ok) {
      console.log(response);
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    ``;
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
    formData.append(key, data[key]);
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
