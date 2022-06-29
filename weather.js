#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { logError, logSuccess, logHelp } from './services/log.service.js';
import { getKeyValue, saveKeyValue } from './services/storage.service.js';
import { getWeather } from './services/api.service.js';

async function saveToken(token) {
  try {
    if (!token.length) {
      logError('Token was not provided');
      return;
    }
    await saveKeyValue('token', token);
    logSuccess('Token has been saved');
  } catch (e) {
    logError(e.message);
  }
}

function initCLIApp() {
  const args = getArgs(process.argv);

  if (args.h) {
    logHelp();
  }

  if (args.s) {
    // city weather
  }

  if (args.t) {
    return saveToken(args.t);
  }

  getWeather('Warsaw');
}

initCLIApp();