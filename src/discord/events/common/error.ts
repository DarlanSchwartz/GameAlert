import { Event } from "../../base/index.js";
import { log } from "../../../settings/index.js";

new Event({
    name: "Error handler",
    event: "error",
    async run(error) {
        log.error(error);
    },
});