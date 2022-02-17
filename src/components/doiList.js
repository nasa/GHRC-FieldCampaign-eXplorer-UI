import React from "react"
import { FiExternalLink } from "react-icons/fi"

function DOIList({ campaign }) {
  const links = []
  for (const [itemIndex, {...itemValue}] of campaign.dois.entries()) {
    links.push(
      <div key={"doi-" + itemIndex}>
        <FiExternalLink />{" "}
        <a target="_blank" rel="noopener noreferrer" href={itemValue.doi}>
          {itemValue.longName}
        </a>
      </div>
    )
  }
  return links
}

export default DOIList
