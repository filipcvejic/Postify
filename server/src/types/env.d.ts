declare namespace NodeJS {
  export interface ProcessEnv {
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    CLIENT_API_BASE_URL: string;
    PORT: string;
    MONGO_URI: string;
    NODE_ENV: "development" | "production";
    AWS_S3_BUCKET: string;
    AWS_REGION: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
  }
}
