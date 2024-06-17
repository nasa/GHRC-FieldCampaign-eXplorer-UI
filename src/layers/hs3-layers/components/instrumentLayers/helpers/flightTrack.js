import { newFieldCampaignsBaseUrl } from "../../../../../config"

export default function flighttrack (date, index) {
    /** 
    * returns structured flight meta item.
    * @param {date} string - YYYY-MM-DD format. Date of the campaign when the flight took off.
    * @param {aircraft} string - Type of aircraft used in the field campaign.
    * @param {index} number (Optional) - Index of the instrument in the list of instruments that are visualization wanted
    * @return {Object} structured flight meta item.
    */
    return {
        layerId: `${date}-track-hs3-${index}-global_hawk`,
        shortName: "flightGlobalHawk",
        displayName: "Flight Track Global Hawk",
        czmlLocation: `${newFieldCampaignsBaseUrl}/Hs3/instrument-processed-data/nav/hs3_navgh_IWG1_${date.replace(/-/g,'')}.czml`,
        date,
        type: "track",
        platform: "air",
        displayMechanism: "czml",
    }
}