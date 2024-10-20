import React from 'react';
import './Result.css';

interface ResultProps {
    co2PerPassenger: number;
    co2Total: number;
}

const Result: React.FC<ResultProps> = ({ co2PerPassenger, co2Total }) => {
    return (
        <div className="result">
            <p>
                <span className="label">CO2 per passenger:</span>
                <span>{co2PerPassenger.toFixed(2)} kg</span>
            </p>
            <p className="co2-total">
                <span className="label">Total CO2:</span>
                <span>{co2Total.toFixed(2)} kg</span>
            </p>
        </div>
    );
};

export default Result;
