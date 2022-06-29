import { getKeyValue } from './storage.service.js';
import { LANG, METRIC, TOKEN } from '../constants/app.constants.js';
import { URL_CONSTANTS } from '../constants/api.constants.js';
import * as https from 'https';

async function getWeather(city) {
  const token = await getKeyValue(TOKEN);

  if (!token) {
    throw new Error('API_KEY was not provided, use command -t [API_KEY].');
  }

  const url = new URL('https://api.openweathermap.org/data/2.5/weather');

  url.searchParams.append(URL_CONSTANTS.CITY, city);
  url.searchParams.append(URL_CONSTANTS.API_KEY, token);
  url.searchParams.append(URL_CONSTANTS.LANG, LANG);
  url.searchParams.append(URL_CONSTANTS.UNITS, METRIC);

  https.get(url, (res) => {
    let tempRes = '';

    res.on('data', (chunk) => {
      tempRes += chunk;
    });

    res.on('end', () => {
      console.log(tempRes);
    });
  });
}

export { getWeather };