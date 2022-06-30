import dayjs from 'dayjs';

function getIcon(icon) {
  switch (icon.slice(0, 2)) {
    case '01':
      return '☀';
    case '02':
      return '⛅';
    case'03':
      return '🌤';
    case '04':
      return '☁';
    case '09':
      return '🌧';
    case '10':
      return '🌦';
    case '11':
      return '🌩';
    case '13':
      return '❄';
    case '50':
      return '🌫';
  }
}

function handleForecastData(data) {
  const { weather, main, wind, sys, name } = data;

  const totalDate = dayjs().locale('en').format('HH:mm, MMMM, DD');

  const weatherType = weather.reduce((acc, { description, icon }, index) => {
    if (index === 0) {
      return `${getIcon(icon)} ${description}`;
    }
    return `${acc}, ${getIcon(icon)}  ${description}`;
  }, '');

  const location = `${name}, ${sys.country}`;

  const temperature = main.temp;

  const feelsTemperature = main.feels_like;

  const windSpeed = wind.speed;

  return {
    totalDate,
    weatherType,
    location,
    temperature,
    feelsTemperature,
    windSpeed,
  };
}

export { handleForecastData };