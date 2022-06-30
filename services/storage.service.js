import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filepath = join(homedir(), 'weather-cli-data.json');

async function isExist(path) {
  try {
    await promises.stat(path);
    return true;
  } catch {
    return false;
  }
}

async function getKeyValue(key) {
  if (await isExist(filepath)) {
    const file = await promises.readFile(filepath);
    const data = JSON.parse(file);
    return data[key];
  }
}

async function saveKeyValue(key, value) {
  let data = {};

  if (await isExist(filepath)) {
    const file = await promises.readFile(filepath);
    data = JSON.parse(file);
  }

  data[key] = value;

  await promises.writeFile(filepath, JSON.stringify(data));
}

export { saveKeyValue, getKeyValue };