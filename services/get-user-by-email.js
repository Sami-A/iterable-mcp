import axios from "axios";

export async function getUserByEmail(email) {
  try {
    // Api-Key is now part of Axios defaults
    const response = await axios.get("users/getByEmail", {
      params: {
        email,
      },
    });
    return response.data.user;
  } catch (error) {
    throw new Error(
      `Failed to fetch user(${email}): ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
