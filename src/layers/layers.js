import goes_r_plt_campaign from './goes-r-plt-layers'

const campaigns = {
  "goes-r-plt": goes_r_plt_campaign,
}

const getCampaignInfo = (mission) => {
  return campaigns[mission]
}

export default campaigns
export { getCampaignInfo }