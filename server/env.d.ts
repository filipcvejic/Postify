declare namespace NodeJS {
  export interface ProcessEnv {
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    CLIENT_API_BASE_URL: string;
    PORT: string;
    MONGO_URI: string;
    ENVRIONMENT: "development" | "production";
  }
}
