/**
 * Sækir Myndir frá nasa API. Til þess að sjá dæmi um json svari sjá apod.json
 */

// API lykill til að fá aðgang að nasa gögnum.
const API_KEY = 'FeOaxmcdbuOGpIUDfXeQanCcBB5WmagZOIzvFEhU';
// Slóð að sækja myndir frá. Dæmi um heila slóð https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2019-11-10
const URL = 'https://api.nasa.gov/planetary/apod';
/**
 * Sækir mynd af handahófi frá APOD API hjá nasa
 * @param {string} date
 * @returns {Promise} sem mun innihalda upplýsingar um mynd/myndband hjá nasa.
 */
export default async function getRandomImage(date) {
  return fetch(`${URL}?api_key=${API_KEY}&date=${date}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw Error('Þú fékkst villu meistari.');
    });
}
