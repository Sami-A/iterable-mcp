import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerTools } from "./tools.js";

const serverOptions = {
  name: "iterable-mcp-server",
  version: "1.0.0",
  capabilities: {
    tools: {},
  },
};

const server = new McpServer(serverOptions);

registerTools(server);

export default async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
};
