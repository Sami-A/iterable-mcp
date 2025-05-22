import {
  fetchIterableLists,
  getUserByEmail,
  getUsersEmailByListId,
} from "../services/index.js";
import { handleError } from "../util/handle-error.js";
import { emailSchema, lastNameSchema } from "../types/schema.js";
import { z } from "zod";

export function registerTools(server) {
  server.tool(
    "get_iterable_lists",
    "Fetches a list of all lists from the Iterable API",
    z.object({}), 
    async () => {
      try {
        const lists = await fetchIterableLists();
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(lists, null, 2),
            },
          ],
        };
      } catch (error) {
        console.error("Error fetching Iterable lists:", error);
        return handleError(error);
      }
    }
  );

  server.tool(
    "get_iterable_users_by_list_name",
    "Fetches users from a specific Iterable list using the list name",
    z.object({ listName: lastNameSchema }), 
    async (params) => {
      const { listName } = params;
      try {
        const result = await getUsersEmailByListId(listName);

        if (result.isError || !result.users) {
          return {
            content: [
              {
                type: "text",
                text:
                  result.content && result.content[0]
                    ? result.content[0].text
                    : `Could not retrieve users for list: ${listName}`,
              },
            ],
            isError: true,
          };
        }

        console.log("====================:response: trimmed: ", result.users);
        return {
          content: [
            {
              type: "text",
              text: `Users for list "${listName}" (ID: ${
                result.listId
              }) Showing max of 100 records:\n${JSON.stringify(
                result.users,
                null,
                2
              )}`,
            },
          ],
        };
      } catch (error) {
        console.error(`Error fetching users for list "${listName}":`, error);
        return handleError(error);
      }
    }
  );

  server.tool(
    "get_iterable_user_by_email",
    "Fetches a user from Iterable by email",
    z.object({ email: emailSchema }),
    async (params) => {
      const { email } = params;
      try {
        const user = await getUserByEmail(email);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(user, null, 2),
            },
          ],
        };
      } catch (error) {
        console.error(`Error fetching user with email "${email}":`, error);
        return handleError(error);
      }
    }
  );
}
