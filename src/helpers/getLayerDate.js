import {JulianDate} from "cesium";

export function extractLayerDate(layerObject){
    /**
     * For a active layer, returns the date when the instrument data was collected.
     * @param {Object} layerObject a layer that is loaded and active.
     * @returns {String} a string representation of date of that layer.
     */
    const {layer} = layerObject;
    return layer.date
}

export function extractLayerStartDatetime(layerObject, campaign){
  /**
   * For a active layer, returns the start date time of that layer.
   * Also applies special cases.
   * @param {Object} layerObject a layer that is loaded and active.
   * @param {Object} campaign a campaign meta object containing all the current campaign info.
   * @returns {String} a string representation of datetime of that layer.
   */
  const {layer} = layerObject;

  /** Special cases start */
  if (campaign.defaultCamera && campaign.defaultCamera[layer.date] && campaign.defaultCamera[layer.date].currentTime) {
    // when the campaign meta has a default camera time.
    return JulianDate.toIso8601(campaign.defaultCamera[layer.date].currentTime)
  }
  if (layer.start) {
    // when start time of the instrument is coded in the layer info. (say, GOES-R, IMPACTS)
    // Highest Prioritiy to the hardcoded inline layer style.
    return layer.start
  }
  /** Special cases end */

  switch (layer.displayMechanism) {
      case '3dtile':
          // get the start time of the 3d tile
          return startDateTime3dtile(layerObject);
      case 'czml':
          // get the start time of the czml
          return startDateTimeCZML(layerObject);
      case 'points':
          // get the start time of the points
            // return startDateTimePoints(layerObject);
            return undefined;
      case 'entities':
          // no time, return undefined, handle it in the caller
          return undefined;
      case 'wmts':
          // no time, return undefined, handle it in the caller
          return undefined;
      default:
          // no time, return undefined, handle it in the caller
          return undefined;
  }
}

// helpers:

function startDateTime3dtile(layerObject){
  const {cesiumLayerRef: tileset} = layerObject;
  return tileset.properties.epoch;
}

function startDateTimeCZML(layer){
    const {cesiumLayerRef: dataSource} = layer;
    let clock = dataSource.clock.getValue();
    let julianStartTime = clock.startTime;
    let isoStartTime = JulianDate.toIso8601(julianStartTime);
    return isoStartTime;
}