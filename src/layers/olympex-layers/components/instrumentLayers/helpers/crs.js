import { newFieldCampaignsBaseUrl } from "../../../../../config"

export default function crs (date, index) {
    /** 
    * returns structured CRS meta item.
    * @param {date} string - YYYY-MM-DD format. Date of the campaign when the flight took off that collected crs data.
    * @param {index} number (Optional) - Index of the instrument in the list of instruments that are visualization wanted
    * @return {Object} structured CRS meta item.
    */
    return {
        layerId: `${date}-${index}-crs`,
        fieldCampaignName: "Olympex",
        shortName: "olympexcrs",
        addOnTickEventListener: true, // helps to update viz on temporal change.
        displayName: "Cloud Radar System",
        variableName: "Radar Reflectivity",
        unit: "dBZ",
        tileLocation: `${newFieldCampaignsBaseUrl}/Olympex/instrument-processed-data/crs/${date.replace(/-/g,'')}/tileset.json`,
        date,
        type: "instrument",
        platform: "air",
        displayMechanism: "3dtile"
      };
}