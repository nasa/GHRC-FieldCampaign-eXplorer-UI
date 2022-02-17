import { useHistory, withRouter } from "react-router"

import Card from "./Card"
import '../../css/cards.css'
import { sortMissionsByKey } from "../../helpers/apiHelpers"
import { basePath } from '../../constants/enum'

const MissionsCards = ({ missions }) => {

  const history = useHistory()
  const sortedMissions = sortMissionsByKey(missions, "priority")

  return (
    <div className="mission-card-group">
      {
        sortedMissions.map(({ name, description, image, dates, landingPageURL, path, status }) => (
          <Card
            key={name}
            imageUrl={`missions-logos/${image}`}
            name={name}
            description={description}
            reference={landingPageURL}
            dates={dates}
            status={status}
            onClickHandler={history.push}
            args={[`${basePath}${path}`]}
          />

        ))
      }
    </div>)
}

export default withRouter(MissionsCards)