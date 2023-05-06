import urlJoin from "url-join";

export const BaseURL = urlJoin(import.meta.env["VITE_API_BASE_URL"]);
