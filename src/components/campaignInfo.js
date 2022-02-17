import React from "react"
import { FiExternalLink } from "react-icons/fi"

function CampaignInfoLinks({ campaign }) {
  const links = []

  for (const [itemIndex, itemValue] of campaign.links.entries()) {
    const url = itemValue.url
    const title = itemValue.title

    links.push(
      <div key={"campaignInfo-" + itemIndex}>
        <FiExternalLink />{" "}
        <a target="_blank" rel="noopener noreferrer" href={url}>
          {title}
        </a>
      </div>
    )
  }
  return links
}

export default CampaignInfoLinks
