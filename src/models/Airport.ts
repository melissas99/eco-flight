type Airport = {
    "id": string,
    "type": string,
    "attributes": {
        "name": string,
        "city": string,
        "country": string,
        "iata": string,
        "icao": string,
        "latitude": string,
        "longitude": string,
        "altitude": number,
        "timezone": string
    }
};

export default Airport;