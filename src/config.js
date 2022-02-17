/*
    Following are the settings for FCX that should be configured per deployment environment.
    
*/


const dataBaseUrl = process.env.bamboo_DATA_BASE_URL 

const abiBaseUrl = process.env.bamboo_ABI_BASE_URL 
const flightTrackBaseUrl = process.env.bamboo_FLIGHT_TRACK_BASE_URL 

const mapboxAccessToken = process.env.bamboo_MAPBOX_ACCESS_TOKEN 
const mapboxStyleId = process.env.bamboo_MAPBOX_STYLE 
const mapboxUsername = process.env.bamboo_MAPBOX_USERNAME 
const mapboxUrl = "https://api.mapbox.com/styles/v1/" + mapboxUsername + "/" + mapboxStyleId + "/tiles/256/{z}/{x}/{y}?access_token=" + mapboxAccessToken
const cesiumDefaultAccessToken = process.env.bamboo_CESIUM_DEFAULT_TOKEN 
const supportEmail = process.env.bamboo_GHRC_SUPPORT_EMAIL || "support-ghrc@earthdata.nasa.gov"

export { dataBaseUrl, abiBaseUrl, flightTrackBaseUrl, mapboxUrl, cesiumDefaultAccessToken, supportEmail }

/*
  dataBaseUrl -  (S3) URL root address where the data resides
  abiBaseUrl -  (API) URL for the terracota mapping server (deployed using FCX core)
  flightTrackBaseUrl -  (S3) URL root address where the Flight data resides
  mapboxAccessToken - Map box Access token. Generate from Map box website
  mapboxStyleId - Generate from Map box website
  mapboxUsername - Generate from Map box website
  cesiumDefaultAccessToken - Create an access Token from CesiumJS website.
*/