import { Command } from "#base";
import fetchAndSendFreeGames from "functions/alerts/epic.alert.js";
import { ApplicationCommandType } from "discord.js";
new Command({
    name: "games",
    description: "Get a list of free games from Epic Games Store!",
    type: ApplicationCommandType.ChatInput,
    global: true,
    async run(interaction) {
        try {
            await fetchAndSendFreeGames(interaction.client);
        } catch (error) {
            console.error(error);
        }
    }
});