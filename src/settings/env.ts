import { z } from "zod";

const envSchema = z.object({
    BOT_TOKEN: z.string({ description: "Discord Bot Token is required" }).min(1),
    WEBHOOK_LOGS_URL: z.string().url().optional(),
    MONGO_URI: z.string({ description: "MongoDb URI is required" }).min(1),
    SEND_GAME_ALERT_MESSAGE_DAY_OF_THE_WEEK: z.string().min(0).max(6).optional(),
    SEND_GAME_ALERT_MESSAGE_TIME_HOURS: z.string({ description: "Hours is required" }).min(0).max(23),
    SEND_GAME_ALERT_MESSAGE_TIME_MINUTES: z.string({ description: "Minutes is required" }).min(0).max(59),

    // Env vars...
});

type EnvSchema = z.infer<typeof envSchema>;

export { envSchema, type EnvSchema };