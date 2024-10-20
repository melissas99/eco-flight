import React from 'react';

interface ResultProps {
    co2PerPassenger: number;
    co2Total: number;
}

const Result: React.FC<ResultProps> = ({ co2PerPassenger, co2Total }) => {
    return (
        <div className="result">
        <p>CO2 per passeggero: <span>{co2PerPassenger.toFixed(2)}</span> kg</p>
        <p>CO2 totale: <span>{co2Total.toFixed(2)}</span> kg</p>
    </div>
);
};

export default Result;
