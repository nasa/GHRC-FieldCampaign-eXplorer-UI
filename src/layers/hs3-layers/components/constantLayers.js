import { dataBaseUrl } from "../../../config"

// CONSTANT VARIABLES (not changing) of a campaign

const campaign = "hs3";

const logo = `missions-logos/hs3.png`;

const description = "The Hurricane and Severe Storm Sentinel (HS3) was a five-year NASA mission specifically targeted to investigate the processes that underlie hurricane formation and intensity change in the Atlantic Ocean basin.  The goals for HS3 included assessing the relative roles of large-scale environment and storm-scale internal Data User Guide processes and addressing the controversial role of the Saharan Air Layer (SAL) in tropical storm formation and intensification as well as the role of deep convection in the inner-core region of storms.";

// External link to Data over internet
const dois = [
    {
      shortName: "hs3pltflightnav",
      longName: "HURRICANE AND SEVERE STORM SENTINEL (HS3) GLOBAL HAWK NAVIGATION V1",
      doi: "https://cmr.earthdata.nasa.gov/search/concepts/C1979869982-GHRC_DAAC.html",
    },
    {
      shortName: "hs3pltcpl",
      longName: "HURRICANE AND SEVERE STORM SENTINEL (HS3) GLOBAL HAWK CLOUD PHYSICS LIDAR (CPL) V1",
      doi: "https://cmr.earthdata.nasa.gov/search/concepts/C1979862427-GHRC_DAAC.html",
    },
    {
      shortName: "hs3plthiwrap",
      longName: "HURRICANE AND SEVERE STORM SENTINEL (HS3) HIGH-ALTITUDE IMAGING WIND AND RAIN AIRBORNE PROFILER (HIWRAP) V1",
      doi: "https://cmr.earthdata.nasa.gov/search/concepts/C1979869732-GHRC_DAAC.html",
    }
]

// External links to the campaign. 
// ref. used in Links
const links = [
    {
      url: "https://ghrc.nsstc.nasa.gov/home/projects/HS3",
      title: "Landing Page",
    },
    {
      url: "https://search.earthdata.nasa.gov/search?portal=ghrc&q=HS3",
      title: "Data Access",
    },
    {
      url: "https://ghrc.nsstc.nasa.gov/uso/ds_details/collections/hs3C.html",
      title: "Collection DOI",
    },
    {
      url: "https://ghrc.nsstc.nasa.gov/home/micro-articles/field-campaign-hurricane-and-severe-storm-sentinel-hs3",
      title: "Micro Article",
    },
    {
      url: "https://ghrc.nsstc.nasa.gov/home/about-ghrc/citing-ghrc-daac-data",
      title: "Citing Data",
    }
]

// Used as a reference to various instruments legend pictures.
const legends = {
    olympexcrs: { url: `${dataBaseUrl}/fieldcampaign/goesrplt/legend/crs_legend.png`, color: "magenta" },
    hs3cpl: { url: `${dataBaseUrl}/fieldcampaign/goesrplt/legend/crs_legend.png`, color: "magenta" },
    hs3hiwrap: { url: `${dataBaseUrl}/fieldcampaign/goesrplt/legend/crs_legend.png`, color: "magenta" },
    olympexnexrad: { url: `${dataBaseUrl}/fieldcampaign/goesrplt/legend/lma_stations_legend.png`, color: "lightred" },
    olympexnpol: { url: `${dataBaseUrl}/fieldcampaign/goesrplt/legend/lma_stations_legend.png`, color: "lightred" },
    track: { url: `${dataBaseUrl}/fieldcampaign/goesrplt/legend/flighttrack_legend.png`, color: "darkgreen" },
    abi_c13: { url: `${dataBaseUrl}/fieldcampaign/goesrplt/legend/abi_c13_legend.png`, color: "lightgray" },
    lma_stations: { url: `${dataBaseUrl}/fieldcampaign/goesrplt/legend/lma_stations_legend.png`, color: "lightred" },
    goesrpltwtlma: { url: `${dataBaseUrl}/fieldcampaign/goesrplt/legend/lma_legend.png`, color: "lightblue" },
    goesrpltksclma: { url: `${dataBaseUrl}/fieldcampaign/goesrplt/legend/lma_legend.png`, color: "lightblue" },
    goesrpltsolma: { url: `${dataBaseUrl}/fieldcampaign/goesrplt/legend/lma_legend.png`, color: "lightblue" },
    goesrpltcolma: { url: `${dataBaseUrl}/fieldcampaign/goesrplt/legend/lma_legend.png`, color: "lightblue" },
    goesrpltnalma:  { url: `${dataBaseUrl}/fieldcampaign/goesrplt/legend/lma_legend.png`, color: "lightblue" },
    glm:            { url: `${dataBaseUrl}/fieldcampaign/goesrplt/legend/glm_legend.png`, color: "lightgreen" },
    goesrpltfegs:   { url: `${dataBaseUrl}/fieldcampaign/goesrplt/legend/fegs_legend.png`, color: "lightgreen" },
    goesrpltlip:    { url: `${dataBaseUrl}/fieldcampaign/goesrplt/legend/lip_legend.png`, color: "red" },
    glm_intensity:  { url: `${dataBaseUrl}/fieldcampaign/goesrplt/legend/glm_legend.png`, color: "yellow" },
    isslis:         { url: `${dataBaseUrl}/fieldcampaign/goesrplt/legend/isslis_legend.png`, color: "cyan" },
    goesrpltoklma:   { url: `${dataBaseUrl}/fieldcampaign/goesrplt/legend/lma_legend.png`, color: "lightred" },
}

// Camera position in cesium world
const defaultCamera = {}

export { campaign, logo, description, dois, links, legends, defaultCamera }