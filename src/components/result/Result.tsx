import './Result.css';

interface ResultProps {
    co2PerPassenger: number;
    co2Total: number;
}

const Result = ({ co2PerPassenger, co2Total }: ResultProps) => {
    if (co2PerPassenger === 0 && co2Total === 0) {
        return <div className="info">Select the airports and passengers to see the results</div>;
    }
    return (
        <div className="result">
            <div className="result-item co2-per-passenger">
                <p className="label">CO2 per passenger</p>
                <p className="value">{co2PerPassenger.toFixed(2)} kg</p>
            </div>
            <div className="result-item co2-total">
                <p className="label">Total CO2</p>
                <p className="value">{co2Total.toFixed(2)} kg</p>
            </div>
        </div>
    );
};

export default Result;
