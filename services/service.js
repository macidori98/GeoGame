import axios from 'axios';

const API_URL = 'https://restcountries.eu/rest/v2';

//get region details
export const getRegionDetails = async (region) => {
    const resp = await axios.get(
        `${API_URL}/region/${region}`
    );
    return resp.data;
};

export const getCountryDetailsWithBorders = async (countryCode) => {
    const details = await getCountryDetails(countryCode);
    const borders = await getBorders(details.borders);

    return {
        details: details,
        borderCountries: borders,
    };
};

//get country details
export const getCountryDetails = async (countryCode) => {
    const details = await axios.get(
        `${API_URL}/alpha/${countryCode}`
    );

    return details.data;
};

export const getBorders = async (borders) => {
    const borderCountries = [];

    for (const border of borders) {
        const country = await getCountryDetails(border);
        borderCountries.push(country);
    }

    return borderCountries;
};
