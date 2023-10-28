import z from "zod";

const configSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]),
	PORT: z.string(),
	DB_URI: z.string(),
	DB_AUTH_TOKEN: z.string(),
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_TOKEN: z.string(),
	HOST_URL: z.string(),
});

const envObj = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,
	DB_URI: process.env.DB_URI,
	DB_AUTH_TOKEN: process.env.DB_AUTH_TOKEN,
	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
	GOOGLE_TOKEN: process.env.GOOGLE_TOKEN,
	HOST_URL: process.env.HOST_URL,
};

export const env = configSchema.parse(envObj);
