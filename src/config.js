/*
    Following are the settings for FCX that should be configured per deployment environment.
    
*/
import dotenv from 'dotenv'
dotenv.config()

const dataBaseUrl = process.env.REACT_APP_BAMBOO_DATA_BASE_URL 

const abiBaseUrl = process.env.REACT_APP_BAMBOO_ABI_BASE_URL 
const flightTrackBaseUrl = process.env.REACT_APP_BAMBOO_FLIGHT_TRACK_BASE_URL 
const newFieldCampaignsBaseUrl = process.env.REACT_APP_NEW_FIELD_CAMPAIGNS_BASE_URL

const mapboxAccessToken = process.env.REACT_APP_BAMBOO_MAPBOX_ACCESS_TOKEN 
const mapboxStyleId = process.env.REACT_APP_BAMBOO_MAPBOX_STYLE 
const mapboxUsername = process.env.REACT_APP_BAMBOO_MAPBOX_USERNAME 
const mapboxUrl = "https://api.mapbox.com/styles/v1/" + mapboxUsername + "/" + mapboxStyleId + "/tiles/256/{z}/{x}/{y}?access_token=" + mapboxAccessToken
const cesiumDefaultAccessToken = process.env.REACT_APP_BAMBOO_CESIUM_DEFAULT_TOKEN 
const supportEmail = process.env.REACT_APP_BAMBOO_GHRC_SUPPORT_EMAIL || "support-ghrc@earthdata.nasa.gov"

// SUBSETTING TOOL ENVS
const subsettingEndpoint = process.env.REACT_APP_SUBSET_TRIGGER_API
const subsettingApiKey = process.env.REACT_APP_SUBSETTING_TOOL_API_KEY
const outputSubsetsBucket = process.env.REACT_APP_SUBSET_OUTPUT_BUCKET
const outputSubsetsBucketRegion = process.env.REACT_APP_SUBSET_OUTPUT_BUCKET_REGION
const subsetCloudfrontUrl = process.env.REACT_APP_SUBSET_CLOUDFRONT_URL
const subsetFilenamesListEndpoint = process.env.REACT_APP_SUBSET_FILENAMES_LIST_API
const WSEndpoint = process.env.REACT_APP_WS_ENDPOINT

// HISTOGRAM TOOL ENVS
const histogramToolApiUrl = process.env.REACT_APP_HISTOGRAM_TOOL_API
const histogramToolApikey = process.env.REACT_APP_HISTOGRAM_TOOL_API_KEY

export { dataBaseUrl, abiBaseUrl, flightTrackBaseUrl, mapboxUrl, cesiumDefaultAccessToken, supportEmail, newFieldCampaignsBaseUrl,
  subsettingEndpoint, subsettingApiKey, outputSubsetsBucket, outputSubsetsBucketRegion, subsetCloudfrontUrl, subsetFilenamesListEndpoint, WSEndpoint,
  histogramToolApiUrl, histogramToolApikey }

/*
  dataBaseUrl -  (S3) URL root address where the data resides
  abiBaseUrl -  (API) URL for the terracota mapping server (deployed using FCX core)
  flightTrackBaseUrl -  (S3) URL root address where the Flight data resides
  mapboxAccessToken - Map box Access token. Generate from Map box website
  mapboxStyleId - Generate from Map box website
  mapboxUsername - Generate from Map box website
  cesiumDefaultAccessToken - Create an access Token from CesiumJS website.

  subsettingEndpoint - Base Gateway API endpoint to trigger subsetting tool.
  subsettingApiKey - Key to invoke the subetting endpoint.
  outputSubsetsBucket - bucket to hold the subsets data.
  outputSubsetsBucketRegion- region of the output subsets bucket.
  subsetCloudfrontUrl- cloudfront url that opens get access to private subsets data.
  subsetFilenamesListEndpoint- API GATEWAY endpoint to get the list of available subset files.
  WSEndpoint - API GATEWAY to support websocket connection in serverless architecture.
*/