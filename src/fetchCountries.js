function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1';

  return fetch(
    `${BASE_URL}/name/${name}?fields=name,capital,population,languages,flags`
  ).then(response => {
    if (!response.ok) {
      throw 'Oops, there is no country with that name';
    }
    return response.json();
  });
}

export { fetchCountries };
