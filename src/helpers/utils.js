function getLayer(layerId, campaign) {
  for (const [, valueItem] of campaign.layers.entries()) {
    const layerItems = valueItem
    for (const [, valueLayer] of layerItems.items.entries()) {
      if (valueLayer.layerId === layerId) {
        return valueLayer
      }
    }
  }
}

function adjustHeightOfPanels() {
  let tabPanels = document.getElementById("root").querySelectorAll(".dock-tabpane")
  tabPanels.forEach((element) => {
    let parentDockPanel = element.closest(".dock-panel")
    element.style.height = `${parentDockPanel.offsetHeight - 30}px`
  })

  let docLayout = document.getElementById("root").querySelectorAll(".dock-layout")[0]
  if(docLayout) docLayout.style.height = `${window.innerHeight - (80 + 30)}px`

  if(!document?.getElementById("cesiumContainer")?.querySelectorAll("canvas")[0]) return
  let cesiumCanvas = document.getElementById("cesiumContainer").querySelectorAll("canvas")[0]
  let tabCesiumHeight = document.getElementById("tabCesium").offsetHeight

  if (cesiumCanvas) {
    if (cesiumCanvas.height > 0) {
      cesiumCanvas.height = tabCesiumHeight - 10
    }
  }
}

function getVideoCardInfo() {
  const gl = document.createElement("canvas").getContext("webgl")
  if (!gl) {
    return {
      error: "no webgl",
    }
  }

  const debugInfo = gl.getExtension("WEBGL_debug_renderer_info")
  if (debugInfo) {
    return {
      vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
      renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
    }
  }

  return {
    error: "no WEBGL_debug_renderer_info",
  }
}

function getGPUInfo() {
  let data = getVideoCardInfo()

  let discreteGPU = false
  let gpuName = ""
  if (data.hasOwnProperty("error")) {
    // Display error in the console
  } else {
    if (data.renderer.indexOf("ANGLE") >= 0) {
      let pos1 = data.renderer.indexOf("(")
      let pos2 = data.renderer.lastIndexOf(")")
      gpuName = data.renderer.substring(pos1 + 1, pos2)
    } else {
      gpuName = data.renderer
    }

    if (data.renderer.indexOf("NVIDIA GeForce") >= 0 || data.renderer.indexOf("AMD Radeon") >= 0) {
      discreteGPU = true
    }
  }

  return { discreteGPU: discreteGPU, gpuName: gpuName }
}

export { getLayer, adjustHeightOfPanels, getGPUInfo }
