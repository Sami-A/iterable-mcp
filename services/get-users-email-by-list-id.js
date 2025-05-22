import axios from "axios";
import { fetchIterableLists } from "./fetch-iterable-lists.js";

export async function getUsersEmailByListId(listName) {
  try {
    const lists = await fetchIterableLists();
    const list = lists.find((l) => l.name.includes(listName));

    if (!list) {
      return {
        content: [
          {
            type: "text",
            text: `No list found with name "${listName}"`,
          },
        ],
        isError: true,
      };
    }
    const listId = list.id;

    // Api-Key is now part of Axios defaults
    const response = await axios.get(
      "lists/getUsers",
      {
        params: {
          listId,
          preferUserId: false,
        },
      }
    );

    const rawData = response.data;
    const users = rawData.trim().split("\n").slice(0, 100); 

    return { users, listId };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(
      `Failed to fetch users for list "${listName}":`,
      errorMessage,
      error
    );
    return {
      content: [
        {
          type: "text",
          text: `Failed to fetch users for list "${listName}": ${errorMessage}`,
        },
      ],
      isError: true,
    };
  }
}
