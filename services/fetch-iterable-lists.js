import axios from "axios";

export async function fetchIterableLists() {
  try {
    // Api-Key is now part of Axios defaults, so no need to pass in headers
    const response = await axios.get("lists");
    return response.data.lists;
  } catch (error) {
    throw new Error(
      `Failed to fetch lists: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
