import { newFieldCampaignsBaseUrl } from "../../../../../config"

export default function cpl (date, index) {
    /** 
    * returns structured CPL meta item.
    * @param {date} string - YYYY-MM-DD format. Date of the campaign when the flight took off that collected crs data.
    * @param {index} number (Optional) - Index of the instrument in the list of instruments that are visualization wanted
    * @return {Object} structured CRS meta item.
    */
    return {
        layerId: `${date}-${index}-cpl`,
        addOnTickEventListener: true,
        fieldCampaignName: "Olympex",
        shortName: "olympexcpl",
        addOnTickEventListener: true, // helps to update viz on temporal change.
        displayName: "Cloud Physics LiDAR",
        variableName: "Attenuated total backscatter profile",
        unit: "km⁻¹ sr⁻¹",
        tileLocation: `${newFieldCampaignsBaseUrl}/Olympex/instrument-processed-data/cpl/${date.replace(/-/g,'')}/tileset.json`,
        date,
        type: "instrument",
        platform: "air",
        displayMechanism: "3dtile"
      };
}