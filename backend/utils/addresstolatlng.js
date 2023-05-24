const axios = require("axios");

async function toLatLng(address) {
  const { data } = await axios.get(
    `https://geocode.search.hereapi.com/v1/geocode?q=${address}&apiKey=YiAzfpQWjxt7xRaIGImVv1JB4Ux2SwGSJN_7Yyo4AHU`
  );
  return data.items[0].position;
}

module.exports = toLatLng;
