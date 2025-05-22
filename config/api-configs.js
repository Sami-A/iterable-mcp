import axios from "axios";
import { env } from "./intialize-env.js";

const BASE_URL = "https://api.iterable.com/api/";

export function initializeAxiosDefaults() {
  axios.defaults.headers.common["Api-Key"] = env.ITERABLE_API_KEY;
  axios.defaults.baseURL = BASE_URL;
  console.log("[Axios defaults initialized]");
}
