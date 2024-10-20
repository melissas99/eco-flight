export const calculateFootprint = async (departure: string, arrival: string, passengerCount: number) => {
    try {
        const response = await fetch('https://api.goclimate.com/v1/flight_footprint?'
            + new URLSearchParams({
                "segments[0][origin]": departure,
                "segments[0][destination]": arrival,
                "cabin_class": 'economy',
                "currencies[]": 'EUR' // TODO: add currencie support
            }).toString(),
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ODA4MDFlMTJkYTc0N2QxN2UxZjZkZTM5Og==' // Base64(username:passw)
                },
            });

        if (response.ok) {
            const data = await response.json();
            const totalFootprint = data.footprint * passengerCount; // Calcola l'impronta totale basata sul numero di passeggeri
            return {
                co2PerPassenger: data.footprint,
                co2Total: totalFootprint
            };
        } else {
            console.error("Errore durante il calcolo dell'impronta ecologica:", response.statusText);
            return null;
        }
    } catch (error) {
        console.error("Errore durante il calcolo dell'impronta ecologica:", error);
        return null;
    }
};