import { Client } from "discord.js";
import cron from "node-cron";

export default class Scheduler {
    public static instance: Scheduler;
    private constructor() {
        if (Scheduler.instance) {
            return Scheduler.instance;
        }
        Scheduler.instance = new Scheduler();
        return Scheduler.instance;
    }
    public static async schedule<T>(task: (client: Client) => Promise<T>, client: Client, minutes: number, hours: number) {
        cron.schedule(`${minutes} ${hours} * * *`, async () => {
            await task(client);
        });
    }
}