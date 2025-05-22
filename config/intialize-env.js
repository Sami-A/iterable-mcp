import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  ITERABLE_API_KEY: z.string().min(1, "Iterable API key is required"),
});

export const env = envSchema.parse(process.env);
