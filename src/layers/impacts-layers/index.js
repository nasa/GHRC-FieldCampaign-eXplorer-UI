import { dataBaseUrl } from "../../config"
import {
  cpl_er2,
  crs_er2,
  exrad_er2,
  lip_er2,
  hiwrap_er2,
  flight_p3b,
  flight_er2,
  defaultCamera,
  legends,
  links,
  dois,
  campaign,
  description,
} from "./data"
import LayerGenerator from '../utils/LayerGenerator'

const generator = new LayerGenerator(campaign)

generator.addLayer({
  instrument: 'crs',
  platform: 'air'
}, crs_er2)

generator.addLayer({
  instrument: 'exrad',
  platform: 'air'
}, exrad_er2)

generator.addLayer({
  instrument: 'lip',
  platform: 'air'
}, lip_er2)

generator.addLayer({
  instrument: 'cpl',
  platform: 'air'
}, cpl_er2)

generator.addLayer({
  instrument: 'hiwrap-Ku',
  platform: 'air',
  HiWRAPVar: 'Ku'
}, hiwrap_er2)

generator.addLayer({
  instrument: 'hiwrap-Ka',
  platform: 'air',
  HiWRAPVar: 'Ka'
}, hiwrap_er2)

generator.addLayer({
  instrument: 'flightTrack-er2',
  platform: 'air',
  flight: 'ER2'
}, flight_er2)

generator.addLayer({
  instrument: 'flightTrack-p3',
  platform: 'air',
  flight: 'P3'
}, flight_p3b)

const layers = generator.generateLayers()

const impacts_campaign = {
  title: `${campaign} Field Campaign`,
  // logo: `${dataBaseUrl}/fieldcampaign/${campaign.toLowerCase()}/logo/${campaign.toLowerCase()}_logo_small.png`,
  logo: `missions-logos/impacts.png`,
  description,
  links,
  dois,
  layers,
  legends,
  defaultCamera,
}

export default impacts_campaign