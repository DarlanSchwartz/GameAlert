import axios from "axios";
import { EpicResponse, EpicCatalogElement, PromotionalOffer2 } from "./types.js";

module EpicClient {
    export async function fetchOffers(endpoint: string): Promise<EpicResponse> {
        const response = await axios.get(endpoint);
        const data = response.data as EpicResponse;
        return data;
    }

    export function getTodaysOffers(elements: EpicCatalogElement[]): EpicCatalogElement[] {
        const today = new Date();
        return getOffersForDate(today, elements);
    }

    export function getOffersForDate(date: Date, elements: EpicCatalogElement[]): EpicCatalogElement[] {
        const offersForDate: EpicCatalogElement[] = [];

        for (const item of elements) {
            const offers = flattenPromotions(item);

            for (const offer of offers) {
                if (isValidOfferForDate(offer, date)) {
                    offersForDate.push(item);
                    break;
                }
            }
        }

        return offersForDate;
    }

    export function isValidOfferForDate(offer: PromotionalOffer2, date: Date): boolean {
        const startDate = new Date(offer.startDate);
        const endDate = new Date(offer.endDate);

        return isDateBetween(date, startDate, endDate);
    }

    export function flattenPromotions(element: EpicCatalogElement): PromotionalOffer2[] {
        if (!element.promotions)
            return [];

        const currentOffers = element.promotions.promotionalOffers.flatMap(x => x.promotionalOffers);
        const upcomingOffers = element.promotions.upcomingPromotionalOffers.flatMap(x => x.promotionalOffers);

        return [...currentOffers, ...upcomingOffers];
    }

    export function isDateBetween(checkDate: Date, startDate: Date, endDate: Date): boolean {
        return checkDate >= startDate && checkDate <= endDate;
    }

    export function getSlug(element: EpicCatalogElement) : string | null {
        if (!element.catalogNs.mappings || element.catalogNs.mappings.length === 0)
            return null;
        
        return element.catalogNs.mappings[0].pageSlug;
    }
}

export default EpicClient;