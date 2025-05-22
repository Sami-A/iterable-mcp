# Iterable MCP Server

This project implements a Model Context Protocol (MCP) server that provides tools to interact with the Iterable API. It allows you to fetch lists, retrieve users by list name, and get user details by email from your Iterable account.

## Description

The server is built using the `@modelcontextprotocol/sdk` and provides a set of tools that can be called by an MCP client or the MCP Inspector. It uses `axios` to make HTTP requests to the Iterable API and `zod` for input validation. Environment variables are managed using `dotenv`.

## Prerequisites
*   An Iterable API Key

## Installation

1.  Clone the repository (if applicable) or ensure you have the project files.
2.  Navigate to the project directory:
    ```sh
    cd mcp-iterable
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```

## Configuration

1.  Create a `.env` file in the root of the project directory (`mcp-iterable/.env`).
2.  Add your Iterable API key to the `.env` file:
    ```env
    ITERABLE_API_KEY=your_iterable_api_key_here
    ```
    Replace `your_iterable_api_key_here` with your actual API key.

## Building the Project

To build the TypeScript code into JavaScript, run:
```sh
npm run build
```
This will compile the code into the `build` directory and make the server executable.

## Running the Server

After building the project, you can start the MCP server using:

```sh
npm start
```
You should see a message in your console indicating that the "Iterable MCP Server running on stdio".

## Available Tools

The server exposes the following tools:

1.  **`get_iterable_lists`**
    *   Description: Fetches a list of all lists from the Iterable API.
    *   Input: None
    *   Output: A JSON string containing the array of lists.

2.  **`get_iterable_users_by_list_name`**
    *   Description: Fetches users from a specific Iterable list using the list name.
    *   Input:
        *   `listName` (string, required): The name of the list to fetch users from.
    *   Output: A JSON string containing the users for the specified list.

3.  **`get_iterable_user_by_email`**
    *   Description: Fetches a user from Iterable by email.
    *   Input:
        *   `email` (string, required): The email address of the user to fetch.
    *   Output: A JSON string containing the user's details.

## Using with MCP Inspector

You can use the Model Context Protocol Inspector to interact with this server.

1.  Ensure the server is built (`npm run build`).
2.  Run the inspector:
    ```sh
    npm run inspector
    ```
    This will launch the MCP Inspector, and you can then connect to the `iterable-mcp-server` by providing the path to the built server executable (`build/index.js`). You can then call the available tools and see their responses.

## VS Code MCP Configuration

To use this server directly within VS Code (e.g., for features like `@iterable` in chat), you need to configure it in your VS Code `settings.json` file. You can open this file by running the "Preferences: Open User Settings (JSON)" command from the command palette.

Add or update the `mcp.servers` configuration as follows:

```json
{
  // ... other settings ...
  "mcp": {
    "servers": {
      // ... other server configurations ...
      "IterableCustom": {
        "type": "stdio",
        "command": "node", // Or the absolute path to node if not in PATH
        "args": [
          "path/to/your/mcp-iterable/index.js" // Ensure this path is correct for your system
        ],
        "env": {
          // It's recommended to set ITERABLE_API_KEY in your shell environment or .env file
          // rather than directly in settings.json for security reasons.
          // If you must set it here, ensure your settings.json is not committed to version control.
          // "ITERABLE_API_KEY": "your_iterable_api_key_here"
        }
      }
    }
  }
}
```

**Important Notes:**
*   Replace `"path/to/your/mcp-iterable/index.js"` with the actual absolute path to the `index.js` file in your built project (usually in the `build` or `dist` folder after running `npm run build`).
*   It is **highly recommended** to manage your `ITERABLE_API_KEY` using the `.env` file as described in the "Configuration" section, or by setting it as an environment variable in your shell. The server is designed to pick it up from `process.env.ITERABLE_API_KEY`. Avoid hardcoding sensitive keys directly in `settings.json` if possible.
*   After updating `settings.json`, you might need to restart VS Code for the changes to take effect.

## Project Structure

```
.
├── index.js                # Main entry point for the server (e.g., run via `npm start`)
├── package.json            # Project metadata and dependencies
├── README.md               # This file
├── tsconfig.json           # TypeScript configuration (if using TypeScript)
├── .env                    # Environment variables (needs to be created by user)
├── config/
│   ├── api-configs.js      # Axios default configurations and API key setup
│   └── intialize-env.js    # Environment variable initialization (dotenv)
├── mcp/
│   ├── mcp-server.js       # MCP server setup and initialization
│   └── tools.js            # Definitions of the tools exposed by the server
├── services/
│   ├── fetch-iterable-lists.js # Service function to fetch lists from Iterable
│   ├── get-user-by-email.js    # Service function to get user by email
│   ├── get-users-email-by-list-id.js # Service function to get users by list ID/name
│   └── index.js              # Exports service functions
├── types/
│   └── schema.js           # Zod schemas for tool input validation
└── util/
    └── handel-error.js     # Utility for error handling (Note: 'handel' might be a typo for 'handle')
```

This `README.md` provides a good overview of your project.
