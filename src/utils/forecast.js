const request = require("request");

const weather = (geoCode, callback) => {
  const { latitude, longitude, location } = geoCode;

  const apiKey = "d5b01758fe5265cb04c98db54763dc20";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  request({ url, json: true }, (error, response, body) => {
    if (error) return callback("unable to connect to weather api", undefined);

    if (body.cod !== 200)
      return callback("the was an error try again", undefined);

    const { temp: temperature } = body.main;
    const { main: condition } = body.weather[0];

    callback(undefined, {
      forecast: `it's currently ${temperature} degrees out in ${location}.Current condition is ${condition}`,
      location,
      temperature,
      condition,
    });
  });
};

module.exports = weather;
