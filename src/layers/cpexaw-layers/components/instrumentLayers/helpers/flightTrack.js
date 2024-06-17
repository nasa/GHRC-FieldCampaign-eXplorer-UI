import { newFieldCampaignsBaseUrl } from "../../../../../config"

export default function flighttrack (date, index) {
    /** 
    * returns structured flight meta item.
    * @param {date} string - YYYY-MM-DD format. Date of the campaign when the flight took off.
    * @param {index} number (Optional) - Index of the instrument in the list of instruments that are visualization wanted
    * @return {Object} structured flight meta item.
    */    
    return {
        layerId: `${date}-track${index}-dc8`,
        shortName: "cpexawflightnavdc8",
        displayName: "Flight Track DC8",
        // czmlLocation: `${newFieldCampaignsBaseUrl}/CPEX-AW/instrument-processed-data/nav_dc8/olympex_navdc8_IWG1_${date.replace(/-/g,'')}.czml`,
        czmlLocation: `${newFieldCampaignsBaseUrl}/CPEX-AW/instrument-processed-data/nav_dc8/CPEXAW_MetNav_DC8_${date.replace(/-/g,'')}_R0.czml`,
        date,
        type: "track",
        platform: "air",
        displayMechanism: "czml",
    }
}