import { z } from "zod";

export const lastNameSchema = z
  .string()
  .min(1)
  .describe("The name of the list to fetch users from");

export const emailSchema = z
  .string()
  .email("Invalid email format")
  .describe("The email address of the user to fetch");
