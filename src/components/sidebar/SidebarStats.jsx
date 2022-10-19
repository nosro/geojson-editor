import {useEffect, useState} from 'react';
import * as turf from "@turf/turf";
import transferFeature from '../../helper/transferFeature';
import data from '../../data/DataProvider';
import "./sidebar.css";

export default function SidebarStats({solutions, activeSolution, modifySolution, setOptions, options}) {
  const [area, setArea] = useState(null);
  const {mode} = options;

  const solution = solutions[activeSolution];
  const {reference, edit} = solution;

  const displayArea = (area) => area ? (<span>Area: {area} m<sup>2</sup></span>) : '(No Shape Selected)';

  useEffect(
    () => {
      if (edit.features.length) {
        setArea(Math.round(turf.area(edit.features[0])));
      } else {
        setArea(null);
      }
    },
    [edit.features]
  )

  const onClickReset = () => {
    modifySolution(solution.id, data[activeSolution]);
  }

  const onClickDeselect = () => {
    const editFeatures = edit.features;

    const editingFeature = editFeatures.length > 0 ? editFeatures[0] : null;

    if ( ! editingFeature ) {
      return;
    }

    const [
      newEdit,
      newReference,
     ] = transferFeature(editingFeature.id, edit, reference);

    modifySolution(solution.id, {reference: newReference, edit: newEdit});
  }

  const onChangeMode = (e) => {
    const newOptions = {...options, mode: e.target.value};
    setOptions(newOptions);
  }

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <h3 className="sidebarTitle">Statistics</h3>
        <div className="sidebarControl">
          { displayArea(area)}
        </div>
        <hr />
        <h3 className="sidebarTitle">Controls</h3>
        <div className="sidebarControl">
          <label htmlFor="mode">Edit Mode:</label>
          <select name="mode" value={ mode } onChange={ onChangeMode }>
            <option value="union">Union</option>
            <option value="intersect">Intersect</option>
          </select>
        </div>
        <div className="sidebarControl">
          <button onClick={onClickDeselect} >Deselect</button>
        </div>
        <div className="sidebarControl">
          <button onClick={onClickReset} >Reset Solution</button>
        </div>
      </div>
    </div>
  );
}
