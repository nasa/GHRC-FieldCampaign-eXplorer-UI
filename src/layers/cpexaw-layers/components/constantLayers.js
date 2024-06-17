import { dataBaseUrl } from "../../../config"

// CONSTANT VARIABLES (not changing) of a campaign

const campaign = "cpexaw";

const logo = `missions-logos/cpex-aw.png`;

const description = "The Convective Processes Experiment – Aerosols & Winds (CPEX-AW) campaign was a joint effort between the US National Aeronautics and Space Administration (NASA) and the European Space Agency (ESA) with the primary goal of conducting post-launch calibration and validation activities of the Atmospheric Dynamics Mission-Aeolus (ADM-AEOLUS) Earth observation wind Lidar satellite in St. Croix, US Virgin Islands."

// External link to Data over internet
const dois = [
    {
      shortName: "cpexawflightnav",
      longName: "DC-8 Meteorological and Flight Navigation Data CPEX-AW V1",
      doi: "https://cmr.earthdata.nasa.gov/search/concepts/C2287328798-GHRC_DAAC.html",
    },
    {
      shortName: "cpexawdropsonde",
      longName: "CPEX-AW Dropsonde Data CPEX-AW V1",
      doi: "https://cmr.earthdata.nasa.gov/search/concepts/C2299858387-LARC_ASDC.html",
    }
]

// External links to the campaign. 
// ref. used in Links
const links = [
    {
      url: "https://ghrc.nsstc.nasa.gov/home/field-campaigns/cpex-aw",
      title: "Landing Page",
    },
    {
      url: "https://asdc.larc.nasa.gov/project/CPEX-AW",
      title: "Data Access at NASA's Atmospheric Science Data Center",
    },
    {
      url: "https://ghrc.nsstc.nasa.gov/uso/ds_details/collections/cpexawC.html",
      title: "Collection DOI",
    },
    {
      url: "https://ghrc.nsstc.nasa.gov/home/field-campaigns/cpex-aw/instruments",
      title: "Instruments",
    },
    {
      url: "https://ghrc.nsstc.nasa.gov/home/about-ghrc/citing-ghrc-daac-data",
      title: "Citing the Data",
    }
]

// Used as a reference to various instruments legend pictures.
const legends = {
    cpexawdropsonde: { url: `${dataBaseUrl}/fieldcampaign/goesrplt/legend/skewT_legend.png`, color: "magenta" },
    olympexcpl: { url: `${dataBaseUrl}/fieldcampaign/goesrplt/legend/crs_legend.png`, color: "magenta" },
    olympexhiwrap: { url: `${dataBaseUrl}/fieldcampaign/goesrplt/legend/crs_legend.png`, color: "magenta" },
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