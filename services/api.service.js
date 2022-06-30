import { getKeyValue } from './storage.service.js';
import { LANG, METRIC, TOKEN } from '../constants/app.constants.js';
import axios from 'axios';

async function getWeather(city) {
  const token = await getKeyValue(TOKEN);

  if (!token) {
    throw new Error('API_KEY was not provided, use command -t [API_KEY].');
  }

  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,
      appid: token,
      lang: LANG,
      units: METRIC,
    }
  });

  return data;
}

export { getWeather };