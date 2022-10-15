import "./worksurface.css";
import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";
import * as turf from "@turf/turf";
import geojsonStyles from "./geojsonStyles.js";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g"
});

export default function Worksurface({solution, modifySolution}) {
  const centerPoint = [-73.975547, 40.691785];

  const radius = 0.1;

  const options = {
      steps: 50,
      units: "miles",
      properties: {
      text: "test"
      }
  };

  const firstCircle = turf.circle(centerPoint, radius, options);

  const secondCircle = turf.circle(centerPoint, radius * 2, options);

  const thirdCircle = turf.circle(centerPoint, radius * 4, options);
  return (
    <div className="worksurface">
      <div className="worksurfaceContainer" >
        { ! solution && (
             <h1 className="worksurfaceTitle">Please select a solution</h1>
        )}

        { solution && (
          <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "calc(100vh - 4rem)",
              width: "100%"
            }}
            zoom={[14]}
            center={[-73.975547, 40.691785]}
          >
            <GeoJSONLayer {...geojsonStyles} data={firstCircle} />
            <GeoJSONLayer {...geojsonStyles} data={secondCircle} />
            <GeoJSONLayer {...geojsonStyles} data={thirdCircle} />
          </Map>
        )}
    </div>
  </div>
  );
}