import { newFieldCampaignsBaseUrl } from "../../../../../config"

export default function hiwrap (date, index) {
    /** 
    * returns structured Hiwrap meta item.
    * @param {date} string - YYYY-MM-DD format. Date of the campaign when the flight took off that collected crs data.
    * @param {index} number (Optional) - Index of the instrument in the list of instruments that are visualization wanted
    * @return {Object} structured CRS meta item.
    */
    return {
        layerId: `${date}-${index}-hiwrap`,
        fieldCampaignName: "Olympex",
        shortName: "olympexhiwrap",
        addOnTickEventListener: true, // helps to update viz on temporal change.
        displayName: "High Altitude Imaging Wind and Rain Airborne Profiler (HIWRAP)",
        variableName: "zku (ka/ku Radar Reflectivity)",
        unit: "dBZ",
        tileLocation: `${newFieldCampaignsBaseUrl}/Olympex/instrument-processed-data/hiwrap/${date.replace(/-/g,'')}/tileset.json`,
        date,
        type: "instrument",
        platform: "air",
        displayMechanism: "3dtile"
      };
}