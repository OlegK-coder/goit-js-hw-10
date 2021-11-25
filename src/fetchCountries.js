const BASE_URL = 'https://restcountries.com/v3.1';

function fetchCountries(name, fields=['name', 'capital', 'population', 'flags', 'languages']) {
  return fetch(`${BASE_URL}/name/${name}?fields=${fields.join(',')}`)
    .then(response =>  {
      if (response.status === 404) {
        return Promise.reject(new Error());
      }
      return response.json();
    },);
}

export default { fetchCountries };

