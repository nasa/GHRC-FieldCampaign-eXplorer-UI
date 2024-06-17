import { newFieldCampaignsBaseUrl } from "../../../../../config"

export default function flighttrack (date, aircraft, index) {
    /** 
    * returns structured flight meta item.
    * @param {date} string - YYYY-MM-DD format. Date of the campaign when the flight took off.
    * @param {aircraft} string - Type of aircraft used in the field campaign.
    * @param {index} number (Optional) - Index of the instrument in the list of instruments that are visualization wanted
    * @return {Object} structured flight meta item.
    */
    
    if (aircraft == "er2") {
        return {
            layerId: `${date}-track${index}-er2`,
            shortName: "flight14",
            displayName: "Flight Track ER2",
            czmlLocation: `${newFieldCampaignsBaseUrl}/Olympex/instrument-processed-data/nav_er2/olympex_naver2_IWG1_${date.replace(/-/g,'')}.czml`,
            date,
            type: "track",
            platform: "air",
            displayMechanism: "czml",
        }
    } else if (aircraft == "dc8") {
        return {
            layerId: `${date}-track${index}-dc8`,
            shortName: "flight14",
            displayName: "Flight Track DC8",
            czmlLocation: `${newFieldCampaignsBaseUrl}/Olympex/instrument-processed-data/nav_dc8/olympex_navdc8_IWG1_${date.replace(/-/g,'')}.czml`,
            date,
            type: "track",
            platform: "air",
            displayMechanism: "czml",
        }
    } else {
        return null
    }
}