const BASE_URL = 'https://restcountries.com/v3.1';
const QUERY_PARAMS = 'fields=name,capital,population,flags,languages';

function fetchCountry(name) {
  return fetch(`${BASE_URL}/name/${name}?${QUERY_PARAMS}`).then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  });
}

export default { fetchCountry };

