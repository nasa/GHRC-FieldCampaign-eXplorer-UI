import { newFieldCampaignsBaseUrl } from "../../../../../config";

export default { "katx": (date, index) => ({
                        layerId: `${date}-nexrad-katx-${index}`,
                        shortName: "olympexnexrad",
                        displayName: "KATX NEXRAD",
                        czmlLocation: `${newFieldCampaignsBaseUrl}/Olympex/instrument-processed-data/nexrad/katx/olympex_Level2_${date.replace(/-/g,'')}.czml`,
                        date,
                        type: "imagery",
                        platform: "ground",
                        displayMechanism: "czml",
                    }),
                 "klgx": (date, index) => ({
                        layerId: `${date}-nexrad-klgx-${index}`,
                        shortName: "olympexnexrad",
                        displayName: "KLGX NEXRAD",
                        czmlLocation: `${newFieldCampaignsBaseUrl}/Olympex/instrument-processed-data/nexrad/klgx/olympex_Level2_${date.replace(/-/g,'')}.czml`,
                        date,
                        type: "imagery",
                        platform: "ground",
                        displayMechanism: "czml",
                    }),
                 "krtx": (date, index) => ({
                        layerId: `${date}-nexrad-krtx-${index}`,
                        shortName: "olympexnexrad",
                        displayName: "KRTX NEXRAD",
                        czmlLocation: `${newFieldCampaignsBaseUrl}/Olympex/instrument-processed-data/nexrad/krtx/olympex_Level2_${date.replace(/-/g,'')}.czml`,
                        date,
                        type: "imagery",
                        platform: "ground",
                        displayMechanism: "czml",
                    })
                }