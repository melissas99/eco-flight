import airportList from "../utils/airportList";
import Airport from "../models/Airport";

export const fetchAirports = async (): Promise<Airport[]> => {
    try {
        const response = await fetch('https://airportgap.com/api/airports/');
        const data = await response.json();
        return data.data; 
    } catch (error) {
        console.error("Error loading airports:", error);
        return [];
    }
};

export const fetchAirport = async (id?: string): Promise<Airport | null> => {
    try {
        const response = await fetch('https://airportgap.com/api/airports/' + id?.toUpperCase() ?? "");
        const data = await response.json();
        return data.data; 
    } catch (error) {
        console.error("Error loading airports:", error);
        return null;
    }
};

export const localSearchAirport = async (search: string): Promise<Airport[]> => {
    try {
        let airports = airportList.filter((e) =>
            e.code.toUpperCase().includes(search.toUpperCase()) ||
            e.name.toUpperCase().includes(search.toUpperCase()) ||
            e.city.toUpperCase().includes(search.toUpperCase()))
            .slice(0, 20);
        return airports.map((e) => ({
            id: e.code,
            type: "airports",
            attributes: {
                name: e.name,
                city: e.city,
                country: e.country,
                iata: e.code,
                icao: e.icao,
                latitude: e.lat,
                longitude: e.lon,
                altitude: 0,
                timezone: e.tz
            }
        }));
    } catch (error) {
        console.error("Error loading airports:", error);
        return [];
    }
};