import React from "react"
import emitter from "../helpers/event"
import Typography from "@material-ui/core/Typography"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Slider from "@material-ui/core/Slider"

function Settings() {
  const trackairplaneChange = (event) => {
    emitter.emit("trackairplaneChange", event.target.checked)
  }

  function valuetext(value) {
    return `${value} seconds`
  }
  const marks = [
    {
      value: 60,
      label: "60s",
    },

    {
      value: 900,
      label: "900s",
    },
    {
      value: 1800,
      label: "1800s",
    },
  ]
  return (
    <div style={{ padding: 10 }}>
      <FormControlLabel control={<Checkbox onChange={trackairplaneChange} name="trackairplane" />} label="Follow Airplane" />
      <hr />
      <Typography id="discrete-slider" gutterBottom>
        Linger Time (seconds)
      </Typography>
      <Slider
        defaultValue={300}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        step={60}
        min={60}
        max={1800}
        marks={marks}
        track={false}
        valueLabelDisplay="on"
        onChange={(event, newValue) => {
          emitter.emit("lingerTimeChange", newValue)
        }}
      />
    </div>
  )
}

export default Settings
