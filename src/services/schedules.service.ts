import { Client } from "discord.js";
import cron from "node-cron";

module Scheduler {
    export async function schedule<T>(task: (client: Client) => Promise<T>, client: Client, minutes: number, hours: number) {
        cron.schedule(`${minutes} ${hours} * * *`, async () => {
            await task(client);
        });
    }
}

export default Scheduler;