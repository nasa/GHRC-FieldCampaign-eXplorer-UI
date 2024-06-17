import { cloneDeep } from "lodash"

export const getCameraAngles = viewer => (
  cloneDeep({
    position: viewer.camera.position,
    direction: viewer.camera.direction,
    up: viewer.camera.up,
    right: viewer.camera.right,
    currentTime: viewer.clock.currentTime,
  })
)

export const printCameraAnglesInterval =  viewer => setInterval(() => console.log(JSON.stringify(getCameraAngles(viewer))), 1000)