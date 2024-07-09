import { Client } from "discord.js";
import EpicClient from "epic/client.js";

export default async function fetchAndSendFreeGames(client: Client) {
    // TODO: don't hard code this
    const channelId = "1257508891978240090"; // Replace with your channel ID
    // TODO: don't hard code this
    const baseURL = "https://store.epicgames.com/pt-BR/p/";
    // TODO: don't hard code this
    const endpoint = "https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions?locale=pt-BR&country=BR&allowCountries=BR";

    const response = await EpicClient.fetchOffers(endpoint);
    const elements = response.data.Catalog.searchStore.elements;
    const offers = EpicClient.getTodaysOffers(elements);

    if (offers.length === 0) return;

    let content = "";

    for (const offer of offers) {
        const slug = EpicClient.getSlug(offer);

        if (slug)
            content += ` ${baseURL}${offer.productSlug}\n`;
    }

    // Ensure the content length does not exceed Discord's limit
    if (content.length > 2000) {
        content = content.substring(0, 1997) + "...";
    }

    const channel = await client.channels.fetch(channelId);
    if (!channel) return;
    if (!channel.isTextBased()) return;
    channel.send(content);
}