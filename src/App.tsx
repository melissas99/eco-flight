import React, { useEffect, useState } from 'react';
import AirportSelector from './components/AirportSelector';
import Result from './components/Result';
import './App.css';
import { fetchAirport, fetchAirports, localSearchAirport } from './repository/airportRepo';
import { calculateFootprint } from './repository/flightFootprintRepo';
import Airport from './models/Airport';

const App: React.FC = () => {
  const [departureAirports, setDepartureAirports] = useState<Airport[]>([]);
  const [arrivalAirports, setArrivalAirports] = useState<Airport[]>([]);
  const [selectedDeparture, setSelectedDeparture] = useState<Airport>();
  const [selectedArrival, setSelectedArrival] = useState<Airport>();
  const [passengerCount, setPassengerCount] = useState(1);
  const [co2PerPassenger, setCo2PerPassenger] = useState(0);
  const [co2Total, setCo2Total] = useState(0);

  useEffect(() => {
    (async () => {
      const airports = await fetchAirports();
      // Filter out any undefined or null airports
      const validAirports = airports.filter(airport => airport != null);
      setDepartureAirports(validAirports);
      setArrivalAirports(validAirports);
    })();
  }, []);

  useEffect(() => {
    if (selectedDeparture && selectedArrival && passengerCount > 0) {
      (async () => {
        const result = await calculateFootprint(selectedDeparture.attributes.iata, selectedArrival.attributes.iata, passengerCount);
        if (result) {
          setCo2PerPassenger(result.co2PerPassenger);
          setCo2Total(result.co2Total);
        }
      })();
    }
  }, [selectedDeparture, selectedArrival, passengerCount]);

  const onDepartureChange = async (airport: string) => {
    if (airport.trim() === '') {
      const airports = await fetchAirports();
      setDepartureAirports(airports.filter(a => a != null));
    } else {
      const res = await localSearchAirport(airport);
      setDepartureAirports(res);
    }
  }

  const onArrivalChange = async (airport: string) => {
    if (airport.trim() === '') {
      const airports = await fetchAirports();
      setArrivalAirports(airports.filter(a => a != null));
    } else {
      const res = await localSearchAirport(airport);
      setArrivalAirports(res);
    }
  }

  return (
    <div className="container" style={{ position: 'relative', overflow: 'hidden' }}>
      <h1>Calcolo Impronta Ecologica del Volo</h1>
      <AirportSelector
        label="Aeroporto di Partenza"
        airports={departureAirports}
        onSelect={setSelectedDeparture}
        onInputChange={onDepartureChange}
      />
      <AirportSelector
        label="Aeroporto di Arrivo"
        airports={arrivalAirports}
        onSelect={setSelectedArrival}
        onInputChange={onArrivalChange}
      />
      <div className="passenger-selector">
        <label>Numero di Passeggeri</label>
        <select value={passengerCount} onChange={(e) => setPassengerCount(Number(e.target.value))}>
          {Array.from({ length: 10 }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
      <Result co2PerPassenger={co2PerPassenger} co2Total={co2Total} />
    </div>
  );
};

export default App;
