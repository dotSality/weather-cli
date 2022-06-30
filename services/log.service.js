import chalk from 'chalk';
import dedent from 'dedent-js';

function logError(error) {
  console.log(chalk.bgRed(' ERROR ') + ': ' + error);
}

function logSuccess(message) {
  console.log(chalk.bgGreen(' SUCCESS ') + ': ' + message);
}

function logHelp() {
  console.log(dedent`${chalk.bgGray(' HELP ')}: 
    No parameters - weather output
    -s [CITY]      - for setting city
    -h             - for help output
    -t [API_KEY]   - for token saving`);
}

function logForecast(data) {
  console.log(dedent`${chalk.black.bgYellowBright('FORECAST')}:
    ${data.totalDate},
    ${data.location},
    ${data.weatherType},
    temperature - ${data.temperature} °C,
    wind - ${data.windSpeed} m/s.
  `);
}

export { logError, logSuccess, logHelp, logForecast };