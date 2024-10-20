import React from 'react';
import './PassengerSelector.css';

interface PassengerSelectorProps {
    passengerCount: number;
    setPassengerCount: (count: number) => void;
}

const PassengerSelector: React.FC<PassengerSelectorProps> = ({ passengerCount, setPassengerCount }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassengerCount(Math.max(1, parseInt(e.target.value) || 1));
    };

    return (
        <div className="passenger-selector">
            <label htmlFor="passengerCount">Number of Passengers</label>
            <input
                type="number"
                id="passengerCount"
                value={passengerCount}
                onChange={handleChange}
                min="1"
                step="1"
            />
        </div>
    );
};

export default PassengerSelector;
