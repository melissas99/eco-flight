import React, { useState } from 'react';
import Select from 'react-select';
import Airport from '../models/Airport';

interface AirportSelectorProps {
    label: string;
    airports: Airport[];
    defaultAirport?: Airport;
    onSelect: (airport?: Airport) => void;
    onInputChange: (input: string) => void;
}

type AirportOption = {
    value: string,
    label: string
}

const AirportSelector: React.FC<AirportSelectorProps> = ({ label, airports, defaultAirport, onSelect, onInputChange }) => {
    // Mappa gli aeroporti in un formato che React Select può utilizzare
    const [selectedAirport, setSelectedAirport] = useState<AirportOption | undefined>(defaultAirport ? {
        value: defaultAirport.attributes.iata ?? "",
        label: `${defaultAirport.attributes.name} (${defaultAirport.attributes.iata}) - ${defaultAirport.attributes.city}, ${defaultAirport.attributes.country}`
    } : undefined);

    const airportOptions = airports.map((airport) => ({
        value: airport.attributes.iata ?? "",
        label: `${airport.attributes.name} (${airport.attributes.iata}) - ${airport.attributes.city}, ${airport.attributes.country}`
    }));

    // Trova l'aeroporto selezionato per visualizzarlo correttamente in React Select
    // const selectedOption = airportOptions.find(option => option.value === selectedAirport);

    return (
        <div className="airport-selector">
            <label>{label}</label>
            <Select
                value={selectedAirport}
                onChange={(option) => {
                    setSelectedAirport(airportOptions.find(o => o.value === option?.value))
                    onSelect(airports.find(airport => airport.id === option?.value))
                }}
                onInputChange={(option) => {
                    onInputChange(option);
                    return option;
                }}
                options={airportOptions}
                placeholder="Cerca aeroporto..."
                isClearable
                noOptionsMessage={() => "Nessun aeroporto trovato"}
            />
        </div>
    );
};

export default AirportSelector;
