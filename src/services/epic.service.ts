import axios from "axios";
import { EpicResponse, EpicCatalogElement } from "./epic.types.js";

export default class EpicClient {
    private static instance: EpicClient;

    private constructor() {
        if (EpicClient.instance) {
            return EpicClient.instance;
        }
        EpicClient.instance = new EpicClient();
        return EpicClient.instance;
    }

    public static async fetchOffers(endpoint: string): Promise<EpicResponse> {
        const response = await axios.get(endpoint);
        const data = response.data as EpicResponse;
        return data;
    }

    public static getFreeGames(elements: EpicCatalogElement[]) {
        const freeGames: EpicCatalogElement[] = [];

        for (const element of elements) {
            if (element.price.totalPrice.discountPrice === 0)
                freeGames.push(element);
        }

        return freeGames;
    }

    public static getSlug(element: EpicCatalogElement): string | null {
        if (!element.catalogNs.mappings || element.catalogNs.mappings.length === 0)
            return null;

        return element.catalogNs.mappings[0].pageSlug;
    }
}