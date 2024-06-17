import { newFieldCampaignsBaseUrl } from "../../../../../config"

export default function dropsonde (date, index) {
    /** 
    * returns structured Dropsonde meta item.
    * @param {date} string - YYYY-MM-DD format. Date of the campaign when the flight took off that collected Dropsonde data.
    * @param {index} number (Optional) - Index of the instrument in the list of instruments that are visualization wanted
    * @return {Object} structured Dropsonde meta item.
    */
    return {
      layerId: `${date}-${index}-dropsonde`,
      fieldCampaignName: "CPEX-AW",
      shortName: "cpexawdropsonde",
      addOnTickEventListener: true, // helps to update viz on temporal change.
      displayName: "DROPSONDE",
      variableName: "skewT graph",
      unit: "temperature (degree celsius) vs pressure (mb)",
      tileLocation: `${newFieldCampaignsBaseUrl}/CPEX-AW/instrument-processed-data/dropsonde/3dtiles/${date.replace(/-/g,'')}/tileset.json`,
      date,
      type: "instrument",
      platform: "air",
      displayMechanism: "3dtile"
    };
}