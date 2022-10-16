import {useRef} from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import * as turf from "@turf/turf";
import editLayer from "./editLayer.js";
import referenceLayer from "./referenceLayer.js";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "./worksurface.css";
import transferFeature from './helper/transferFeature';

export default function Worksurface({solutions, activeSolution, modifySolution}) {
  const mapRef = useRef();

  if (!activeSolution && activeSolution !== 0) {
    return (
      <div className="worksurface">
        <div className="worksurfaceContainer" >
          <h1 className="worksurfaceTitle">Please select a solution</h1>
        </div>
      </div>
    )
  }
  const solution = solutions[activeSolution];
  const { reference, edit } = solution;

  const onClick = (e) => {
    const bbox = [
        [e.point.x - 5, e.point.y - 5],
        [e.point.x + 5, e.point.y + 5]
      ];

    const selectedFeatures = mapRef.current.queryRenderedFeatures(bbox, {
      layers: ['referenceLayer']
    });

    // For now select the top feature
    if (selectedFeatures.length === 0) {
      // @todo - how to deselect?
      return;
    }

    const selectedFeature = selectedFeatures[0];

    const referenceFeatures = reference.features;
    const editFeatures = edit.features;

    let {
      newOriginFeatures,
      newDestinationFeatures,
    } = transferFeature(selectedFeature.id, referenceFeatures, editFeatures);

    if (newDestinationFeatures.length > 1) {
      const union = turf.union(newDestinationFeatures[0], newDestinationFeatures[1]);
      newDestinationFeatures = [union];
    }

    const newReference = { ...reference, features: newOriginFeatures};
    const newEdit = { ...edit, features: newDestinationFeatures};

    modifySolution(solution.id, {reference: newReference, edit: newEdit});
  }

  return (
    <div className="worksurface">
      <div className="worksurfaceContainer" >
        <Map
          ref={mapRef}
          initialViewState={{
            longitude: 2.29914,
            latitude: 48.85539,
            zoom: 15
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          style={{
            height: "calc(100vh - 4rem)",
            width: "100%"
          }}
          onClick={onClick}
          interactiveLayerIds={['referenceLayer']}
          mapboxAccessToken= "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g"
        >
          <Source type="geojson" id="edit" data={edit} >
            <Layer {...editLayer} />
          </Source>
          <Source type="geojson" id="reference" data={reference} >
            <Layer {...referenceLayer} />
          </Source>
        </Map>
    </div>
  </div>
  );
}