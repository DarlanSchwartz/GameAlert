import axios from "axios";
import { EpicResponse, EpicCatalogElement, PromotionalOffer2 } from "./epic.types.js";

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

    public static getTodaysOffers(elements: EpicCatalogElement[]): EpicCatalogElement[] {
        const today = new Date();
        return this.getOffersForDate(today, elements);
    }

    public static getOffersForDate(date: Date, elements: EpicCatalogElement[]): EpicCatalogElement[] {
        const offersForDate: EpicCatalogElement[] = [];

        for (const item of elements) {
            const offers = this.flattenPromotions(item);

            for (const offer of offers) {
                if (this.isValidOfferForDate(offer, date)) {
                    offersForDate.push(item);
                    break;
                }
            }
        }

        return offersForDate;
    }

    public static isValidOfferForDate(offer: PromotionalOffer2, date: Date): boolean {
        const startDate = new Date(offer.startDate);
        const endDate = new Date(offer.endDate);

        return this.isDateBetween(date, startDate, endDate);
    }

    public static flattenPromotions(element: EpicCatalogElement): PromotionalOffer2[] {
        if (!element.promotions)
            return [];

        const currentOffers = element.promotions.promotionalOffers.flatMap(x => x.promotionalOffers);
        const upcomingOffers = element.promotions.upcomingPromotionalOffers.flatMap(x => x.promotionalOffers);

        return [...currentOffers, ...upcomingOffers];
    }

    private static isDateBetween(checkDate: Date, startDate: Date, endDate: Date): boolean {
        return checkDate >= startDate && checkDate <= endDate;
    }

    public static getSlug(element: EpicCatalogElement): string | null {
        if (!element.catalogNs.mappings || element.catalogNs.mappings.length === 0)
            return null;

        return element.catalogNs.mappings[0].pageSlug;
    }
}