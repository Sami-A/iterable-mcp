#!/usr/bin/env node
import { initializeAxiosDefaults } from "./config/api-configs.js";
import initializeMcpServer from "./mcp/mcp-server.js";

async function main() {
  initializeAxiosDefaults();
  await initializeMcpServer();
  console.error("Iterable MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
