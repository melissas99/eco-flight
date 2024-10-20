export const calculateFootprint = async (departure: string, arrival: string, passengerCount: number) => {
    try {
        const response = await fetch('https://api.goclimate.com/v1/flight_footprint?'
            + new URLSearchParams({
                "segments[0][origin]": departure,
                "segments[0][destination]": arrival,
                "cabin_class": 'economy',
                "currencies[]": 'EUR'
            }).toString(),
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ODA4MDFlMTJkYTc0N2QxN2UxZjZkZTM5Og==' 
                },
            });

        if (response.ok) {
            const data = await response.json();
            const totalFootprint = data.footprint * passengerCount; 
            return {
                co2PerPassenger: data.footprint,
                co2Total: totalFootprint
            };
        } else {
            console.error("Error calculating the carbon footprint:", response.statusText);
            return null;
        }
    } catch (error) {
        console.error("Error calculating the carbon footprint:", error);
        return null;
    }
};