import { Client as DiscordClient } from "discord.js";
import EpicClient from "../services/epic.service.js";

export default async function fetchAndSendFreeGames(client: DiscordClient) {
    try {
        const channelId = process.env.DISCORD_CHANNEL_ID;
        
        let content = await fetchOffersFormatted();

        if (!content)
            return;

        // Ensure the content length does not exceed Discord's limit
        if (content.length > 2000) {
            content = content.substring(0, 1997) + "...";
        }

        const channel = await client.channels.fetch(channelId);
        if (!channel) return;
        if (!channel.isTextBased()) return;
        await channel.send(content);
        console.log("✔️ Successfully executed fetchAndSendFreeGames ✔️");
    } catch (error) {
        console.error("❌ Error executing fetchAndSendFreeGames:", error + "❌");
    }
}

export async function fetchOffersFormatted(): Promise<string | null> {
    const baseURL = process.env.EPIC_GAME_BASE_URL;
    const endpoint = process.env.EPIC_OFFERS_ENDPOINT;

    try {

        const response = await EpicClient.fetchOffers(endpoint);
        const elements = response.data.Catalog.searchStore.elements;
        const offers = EpicClient.getFreeGames(elements);
        
        if (offers.length === 0) null;
        
        let content = "";
        
        for (const offer of offers) {
            const slug = EpicClient.getSlug(offer);
            
            if (slug)
                content += ` ${baseURL}${slug}\n`;
        }

        return content;
    } catch (error) {
        console.error("❌ Error executing fetchAndSendFreeGames:", error + "❌");
        return null;
    }
}