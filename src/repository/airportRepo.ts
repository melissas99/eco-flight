import Airport from "../models/Airport";

// src/repository/airportRepo.ts
export const fetchAirports = async (): Promise<Airport[]> => {
    try {
        const response = await fetch('https://airportgap.com/api/airports/');
        const data = await response.json();
        return data.data; // Assumendo che gli aeroporti siano sotto la chiave 'data'
    } catch (error) {
        console.error("Errore durante il caricamento degli aeroporti:", error);
        return [];
    }
};

export const fetchAirport = async (id?: string): Promise<Airport | null> => {
    try {
        const response = await fetch('https://airportgap.com/api/airports/' + id?.toUpperCase() ?? "");
        const data = await response.json();
        return data.data; // Assumendo che gli aeroporti siano sotto la chiave 'data'
    } catch (error) {
        console.error("Errore durante il caricamento degli aeroporti:", error);
        return null;
    }
};