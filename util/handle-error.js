export const handleError = (error) => ({
  content: [
    {
      type: "text",
      text: `Error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    },
  ],
  isError: true,
});
