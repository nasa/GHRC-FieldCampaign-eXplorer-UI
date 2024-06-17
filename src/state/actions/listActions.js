const addDefaultSelectedLayers = (defaultSelectedLayers) => ({type: "ADD_DEFAULT_SELECTED_LAYERS", defaultSelectedLayers })
const handleToggle = (layerId) => ({ type: "HANDLE_TOGGLE", layerId: layerId })
const removeLayersByDate = (date) => ({ type: "REMOVE_LAYER_BY_DATE", date: date })

const markLoading = (layerId) => ({ type: "MARK_LOADING", layerId: layerId })
const markLoaded = (layerId) => ({ type: "MARK_LOADED", layerId: layerId })
const markUnLoaded = (layerId) => ({ type: "MARK_UNLOADED", layerId: layerId })
const resetStore = () => ({type: "RESET_STORE"})

const listActions = {
  addDefaultSelectedLayers,
  handleToggle,
  removeLayersByDate,
  markLoading,
  markLoaded,
  markUnLoaded,
  resetStore
}

export default listActions