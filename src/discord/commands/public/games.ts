import { Command } from "../../base/Command.js";
import { fetchOffersFormatted } from "../../../alerts/epic.alert.js";
import { ApplicationCommandType } from "discord.js";
new Command({
    name: "games",
    description: "Get a list of free games from Epic Games Store!",
    type: ApplicationCommandType.ChatInput,
    global: true,
    async run(interaction) {
        try {
            const offers = await fetchOffersFormatted();
            let reply = "No free games 😢";

            if (offers)
                reply = offers;

            await interaction.reply(reply);
        } catch (error) {
            console.error(error);
        }
    }
});