const request = require("request");

const geoCode = (address, callback) => {
  const apiKey =
    "pk.eyJ1IjoiYWJkdWwtcmF1Zi1hbGhhc3NhbiIsImEiOiJja2c0bjl3Y2cwbTljMzFwNGQ4eXowM3I0In0.Y3e0-WnCjsVgUYyNWqydwg";
  const geoCodeRequestLimit = 1;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${apiKey}&limit=${geoCodeRequestLimit}`;

  request({ url, json: true }, (error, ressponse, body) => {
    if (error) return callback("Unable to connect to geocode api", undefined);

    if (!body.features.length)
      return callback(
        "Unable to find location, try another location",
        undefined
      );

    callback(undefined, {
      longitude: body.features[0].center[0],
      latitude: body.features[0].center[1],
      location: body.features[0].place_name,
    });
  });
};

module.exports = geoCode;
