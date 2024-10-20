import React, { useEffect, useState } from 'react';
import AirportSelector from './components/airportselector/AirportSelector';
import Result from './components/result/Result';
import './App.css';
import { fetchAirports, localSearchAirport } from './repository/airportRepo';
import { calculateFootprint } from './repository/flightFootprintRepo';
import Airport from './models/Airport';
import PassengerSelector from './components/passengerselector/PassengerSelector';

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
    <div className="container">
      <h1>Flight Carbon Footprint Calculation</h1>
      <AirportSelector
        label="Departure Airport"
        airports={departureAirports}
        onSelect={setSelectedDeparture}
        onInputChange={onDepartureChange}
      />
      <AirportSelector
        label="Arrival Airport"
        airports={arrivalAirports}
        onSelect={setSelectedArrival}
        onInputChange={onArrivalChange}
      />
      <PassengerSelector
        passengerCount={passengerCount}
        setPassengerCount={setPassengerCount}
      />
      <Result co2PerPassenger={co2PerPassenger} co2Total={co2Total} />
    </div>
  );
};

export default App;
