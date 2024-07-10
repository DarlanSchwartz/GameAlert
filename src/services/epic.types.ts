export interface EpicResponse {
    data: EpicData
}

export interface EpicData {
    Catalog: EpicCatalog
}

export interface EpicCatalog {
    searchStore: EpicSearchStore
}

export interface EpicSearchStore {
    elements: EpicCatalogElement[]
}

export interface EpicCatalogElement {
    title: string
    id: string
    namespace: string
    description: string
    effectiveDate: string
    offerType: string
    expiryDate: any
    viewableDate: any
    status: string
    isCodeRedemptionOnly: boolean
    keyImages: KeyImage[]
    seller: Seller
    productSlug: string
    urlSlug: string
    url: any
    items: Item[]
    customAttributes: CustomAttribute[]
    categories: Category[]
    tags: Tag[]
    catalogNs: CatalogNs
    offerMappings: any[]
    price: Price
    promotions: Promotions | null
}

export interface KeyImage {
    type: string
    url: string
}

export interface Seller {
    id: string
    name: string
}

export interface Item {
    id: string
    namespace: string
}

export interface CustomAttribute {
    key: string
    value: string
}

export interface Category {
    path: string
}

export interface Tag {
    id: string
}

export interface CatalogNs {
    mappings: Mapping[]
}

export interface Mapping {
    pageSlug: string
    pageType: string
}

export interface Price {
    totalPrice: TotalPrice
    lineOffers: LineOffer[]
}

export interface TotalPrice {
    discountPrice: number
    originalPrice: number
    voucherDiscount: number
    discount: number
    currencyCode: string
    currencyInfo: CurrencyInfo
    fmtPrice: FmtPrice
}

export interface CurrencyInfo {
    decimals: number
}

export interface FmtPrice {
    originalPrice: string
    discountPrice: string
    intermediatePrice: string
}

export interface LineOffer {
    appliedRules: AppliedRule[]
}

export interface AppliedRule {
    id: string
    endDate: string
    discountSetting: DiscountSetting
}

export interface DiscountSetting {
    discountType: string
}

export interface Promotions {
    promotionalOffers: PromotionalOffer[]
    upcomingPromotionalOffers: PromotionalOffer[]
}

export interface PromotionalOffer {
    promotionalOffers: PromotionalOffer2[]
}

export interface PromotionalOffer2 {
    startDate: string
    endDate: string
    discountSetting: DiscountSetting2
}

export interface DiscountSetting2 {
    discountType: string
    discountPercentage: number
}
