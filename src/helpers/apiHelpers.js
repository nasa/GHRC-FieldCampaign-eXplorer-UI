import { cloneDeep } from "lodash"

const missionExists = (missions, missionId) => {
  return missions.some(
    element => element['id'] === missionId)
}

const sortMissionsByKey = (missions, key="priority") => {
  const sortedMission = cloneDeep(missions)
  return sortedMission.sort((obj1, obj2) => (
    obj1[key] === obj2[key] ? 0 :
    obj1[key] > obj2[key]   ? 1 :
                             -1
  ))
}

export { missionExists, sortMissionsByKey }