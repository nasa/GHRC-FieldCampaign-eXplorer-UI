import { newFieldCampaignsBaseUrl } from "../../../../../config"

export default function npol (date, index) {
    /** 
    * returns structured npol meta item.
    * @param {date} string - YYYY-MM-DD format. Date of the campaign when the flight took off that collected npol data.
    * @param {index} number - Index of the instrument in the list of instruments that are visualization wanted
    * @return {Object} structured npol meta item.
    */

    return {
        layerId: `${date}-${index}-npol`,
        fieldCampaignName: "Olympex",
        shortName: "olympexnpol",
        addOnTickEventListener: true, // helps to update viz on temporal change.
        displayName: "NASA S-Band Dual Polarimetric Doppler Radar (NPOL)",
        variableName: "ZZ Radar Reflectivity in RHI-A mode",
        unit: "dBZ",
        czmlLocation: `${newFieldCampaignsBaseUrl}/Olympex/instrument-processed-data/npol/${date.replace(/-/g,'')}/knit.czml`,
        date,
        type: "tiles",
        platform: "ground",
        displayMechanism: "czml"
      };
}