import {useRef} from 'react';
import Map, {Source, Layer} from 'react-map-gl';
import editLayer from "./editLayer.js";
import referenceLayer from "./referenceLayer.js";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "./worksurface.css";
import transferFeature from '../../helper/transferFeature';
import doOperation from '../../helper/doOperation';

export default function Worksurface({solutions, activeSolution, modifySolution, options}) {
  const mapRef = useRef();
  let hoveredReferenceId = null;
  let hoveredEditId = null;

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
  const {reference, edit} = solution;

  const bbox = (e) => [
    [e.point.x - 5, e.point.y - 5],
    [e.point.x + 5, e.point.y + 5]
  ];

  const onClick = (e) => {
    const referenceFeatures = mapRef.current.queryRenderedFeatures(bbox(e), {
      layers: ['referenceLayer']
    });
    const editFeatures = mapRef.current.queryRenderedFeatures(bbox(e), {
      layers: ['editLayer']
    });

    let newReference, newEdit;

    if (referenceFeatures.length > 0) {
      // Add to edit layer.
      ({
        newOrigin: newReference,
        newDestination: newEdit,
      } = transferFeature(referenceFeatures[0].id, reference, edit));

      if (edit.features.length === 0) {
        modifySolution(solution.id, {reference: newReference, edit: newEdit});
        mapRef.current.getCanvas().style.cursor = 'not-allowed';
      } else {
        // Do operations if multiple edit features.
        const feature = doOperation(options.mode, edit.features[0], referenceFeatures[0]);
        feature.id = edit.features[0].id;
        newEdit.features = [feature];
        modifySolution(solution.id, {reference: newReference, edit: newEdit});
        mapRef.current.getCanvas().style.cursor = 'copy';
      }

    } else if (editFeatures.length > 0) {
      // Remove from edit layer.
      ({
        newOrigin: newEdit,
        newDestination: newReference,
      } = transferFeature(editFeatures[0].id, edit, reference));
      modifySolution(solution.id, {reference: newReference, edit: newEdit});
      mapRef.current.getCanvas().style.cursor = 'copy';
    }
  }

  const onMouseMove = (e) => {
    const referenceFeatures = mapRef.current.queryRenderedFeatures(bbox(e), {
      layers: ['referenceLayer']
    });
    const editFeatures = mapRef.current.queryRenderedFeatures(bbox(e), {
      layers: ['editLayer']
    });

    if (hoveredReferenceId !== null) {
      mapRef.current.removeFeatureState(
      { source: 'reference', id: hoveredReferenceId}
      );
    }

    if (hoveredEditId !== null) {
      mapRef.current.removeFeatureState(
      { source: 'edit', id: hoveredEditId}
      );
    }

    if (referenceFeatures.length > 0) {
      console.log('ref features',referenceFeatures[0]);
      hoveredReferenceId = referenceFeatures[0].id;
      mapRef.current.setFeatureState(
        { source: 'reference', id: hoveredReferenceId },
        { hover: true }
      );
      mapRef.current.getCanvas().style.cursor = 'copy';
    } else if (editFeatures.length > 0) {
      console.log('edit features', editFeatures[0]);
      hoveredEditId = editFeatures[0].id;
      mapRef.current.setFeatureState(
        { source: 'edit', id: hoveredEditId },
        { hover: true }
      );
      mapRef.current.getCanvas().style.cursor = 'not-allowed';
    } else {
      mapRef.current.getCanvas().style.cursor = 'grab';
    }
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
          onMouseMove={onMouseMove}
          interactiveLayerIds={['referenceLayer', 'editLayer']}
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