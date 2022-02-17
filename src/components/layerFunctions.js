import {
  defined,
  Color as ColorCesium,
  ScreenSpaceEventHandler,
  HorizontalOrigin,
  VerticalOrigin,
  Cartesian2,
  Cartographic,
  Math as CesMath,
  ScreenSpaceEventType
} from "cesium"


let lead = 0
let reverse = true
let ascale = 4.346
let vmin = -10
let vmax = 30
let vrange = vmax - vmin
let hmin = 0.438
let hrange = 1


function getColorExpression() {
  let revScale = ""
  if (reverse) {
    revScale = " * -1.0 + 1.0"
  }
  return `hsla((((clamp(\${value}, ${vmin}, ${vmax}) + ${vmin}) / ${vrange}) ${revScale}) * ${hrange} + ${hmin}, 1.0, 0.5, pow((\${value} - ${vmin})/${vrange}, ${ascale}))`
}

function getShowExpression(viewerTime, linger) {
  return `\${time} <= ${viewerTime + lead} && \${time} >= ${viewerTime - linger}`
}

async function loadData(Url) {
  const resp = await fetch(Url);
  const data = await resp.json();
  return data;
}
/* Lightning data time array */
const getTimes = (data) => {
  let times = [];
  for (let index in data) {
    times.push(
      Number(data[index].id)
    );
  }
  return times;
}

/*--- Mouse over display  GLM/LIS  ---*/
function mousePosition(viewer) {

  let entity = viewer.entities.add({
    label: {
      show: false,
      showBackground: true,
      font: "11px monospace",
      fillColor: ColorCesium.BLUE.withAlpha(1.0),
      backgroundColor: ColorCesium.WHITE,
      horizontalOrigin: HorizontalOrigin.LEFT,
      verticalOrigin: VerticalOrigin.TOP,
      pixelOffset: new Cartesian2(15, 15),
    },
  });

  // Mouse over the globe to see the cartographic position
  let handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction(function (movement) {
    let picked = viewer.scene.pick(movement.endPosition);
    let cartesian = viewer.camera.pickEllipsoid(
      movement.endPosition,
      viewer.scene.globe.ellipsoid
    );
    if (cartesian) {
      if (defined(picked) && typeof picked.id === 'string') {
        let cartographic = Cartographic.fromCartesian(cartesian);
        let longitudeString = CesMath.toDegrees(cartographic.longitude).toFixed(3);
        let latitudeString = CesMath.toDegrees(cartographic.latitude).toFixed(3);
        let labelTextString =
          "Lon: " + ("   " + longitudeString).slice(-8) + "\u00B0" +
          "\nLat: " + ("   " + latitudeString).slice(-8) + "\u00B0";
        let LTN = "Intensity: ";
        let instr = "GLM";
        let intensity = (Math.pow(picked.primitive._pixelSize, 1 / 0.6) * 15 + 1).toFixed(0);
        entity.label.fillColor = new ColorCesium(0.6, 0.4, 0.0, 1);
        if (picked.id[0] === "A") {
          LTN = "Activity: ";
          intensity = (Math.pow(picked.primitive._pixelSize, 1 / 0.6) * 4 + 1).toFixed(0);
        }
        if (picked.id[0] === "L") {
          LTN = "Intensity: ";
          instr = 'LIS';
          intensity = (Math.pow(picked.primitive._pixelSize * 100, 1 / 0.5) + 1).toFixed(0);
          entity.label.fillColor = ColorCesium.GREEN.withAlpha(1.0)
        }
        labelTextString = instr + " lightning\n" + labelTextString + "\n" + LTN + intensity;     //+picked.id;
        entity.position = cartesian;
        entity.label.show = true;
        entity.label.text = labelTextString;
      } else { entity.label.show = false; }
    }
  }, ScreenSpaceEventType.MOUSE_MOVE);
}


export { getColorExpression, getShowExpression, loadData, getTimes, mousePosition }