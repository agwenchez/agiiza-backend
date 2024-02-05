export type GeospatialCoordinates = {
    lat: number,
    lng: number,
}

export type MerchantProps = {
    firstName: string;
    lastName: string;
    storeName: string;
    storeAddress: string;
    nearbyLandmark: GeospatialCoordinates;
    location: GeospatialCoordinates;
    email: string;
    phoneNumber: string;
    description: string;
    categories: string[];
    tags: string[];
}