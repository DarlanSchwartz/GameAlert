import { Command } from "#base";
import axios from "axios";
import { ApplicationCommandType } from "discord.js";

const channels = [{
    id: "1257508891978240090",
    name: "avisos-free-games-wip"
}];
const baseURL = "https://store.epicgames.com/pt-BR/p/";

new Command({
    name: "games",
    description: "Get a list of free games from Epic Games Store!",
    type: ApplicationCommandType.ChatInput,
    global: true,
    async run(interaction) {
        const channelId = interaction?.channel?.id;
        if (!interaction?.channel?.isTextBased()) return interaction?.reply({ fetchReply: true, ephemeral: true, content: " :no_entry_sign: This command can only be used in a text channel" });
        if (!channels.find((channel) => channelId === channel.id)) return interaction.reply({ fetchReply: true, ephemeral: true, content: " :no_entry_sign: This command cannot be run on this channel!" });
        const games = await axios.get("https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions?locale=pt-BR&country=BR&allowCountries=BR");
        const data = games.data.data.Catalog.searchStore.elements;
        const currentGame = data[data.length - 1];
        const soon = data[0];
        if (data.length === 0) return interaction.reply({ fetchReply: true, ephemeral: true, content: " :no_entry_sign: No games found!" });
        let currentGameSlug = currentGame.productSlug;
        let soonGameSlug = soon.productSlug;
        if (currentGameSlug === "null" || !currentGameSlug) {
            currentGameSlug = currentGame.catalogNs.mappings[0].pageSlug;
        }

        if (soonGameSlug === "null" || !soonGameSlug) {
            soonGameSlug = soon.catalogNs.mappings[0].pageSlug;
        }


        let content = ` ${baseURL}${currentGameSlug}\n`;
        if (soon) content += `${baseURL}${soonGameSlug}`;

        // Ensure the content length does not exceed Discord's limit (2000 characters)
        if (content.length > 2000) {
            content = content.substring(0, 1997) + "...";
        }

        return interaction.reply({ fetchReply: true, ephemeral: true, content });
    }
});