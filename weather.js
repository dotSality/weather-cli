#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { logError, logSuccess, logHelp, logForecast } from './services/log.service.js';
import { getKeyValue, saveKeyValue } from './services/storage.service.js';
import { getWeather } from './services/api.service.js';
import { DATA_KEYS } from './constants/app.constants.js';
import { handleForecastData } from './services/data.service.js';

async function saveToken(token) {
  try {
    if (!token.length) {
      logError('Token was not provided.');
      return;
    }
    await saveKeyValue(DATA_KEYS.TOKEN, token);
    logSuccess('Token has been saved.');
  } catch (e) {
    logError(e.message);
  }
}

async function saveCity(city) {
  try {
    if (!city) {
      logError('City was not provided.');
      return;
    }
    await saveKeyValue(DATA_KEYS.CITY, city);
  } catch (e) {
    logError(e.message);
  }
}

async function getForecast() {
  try {
    const city = await getKeyValue(DATA_KEYS.CITY);
    if (city) {
      const weather = await getWeather(city);

      const data = handleForecastData(weather);

      logForecast(data);
    } else {
      logError('City was not provided. Set city with -s [CITY]');
    }
  } catch (e) {
    if (e?.response?.status === 404) {
      logError('Wrong city name. Correct city with -s [CITY]');
    } else if (e?.response?.status === 401) {
      logError('Wrong token provided.');
    } else {
      logError(e.message);
    }
  }
}

function initCLIApp() {
  const args = getArgs(process.argv);

  if (args.h) {
    logHelp();
  }

  if (args.s) {
    logSuccess('City was successfully set.');
    return saveCity(args.s);
  }

  if (args.t) {
    return saveToken(args.t);
  }

  getForecast();
}

initCLIApp();