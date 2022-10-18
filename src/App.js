import {useState} from 'react';
import './App.css';
import Topbar from "./components/topbar/Topbar";
import SidebarNav from './components/sidebar/SidebarNav';
import SidebarStats from './components/sidebar/SidebarStats';
import Worksurface from './components/worksurface/Worksurface';

import data from './data/DataProvider';

const defaultOptions = {
  mode: 'union'
};

function App() {
  const [solutions, setSolutions] = useState(data);
  const [activeSolution, setActiveSolution] = useState();
  const [options, setOptions] = useState(defaultOptions);

  const modifySolution = (id, values) => {
    const newSolutions = solutions.map( (solution) => {
      if (solution.id === String(id)) {
        return {...solution, ...values}
      }
      return solution;
    })
    setSolutions(solutions => [...newSolutions]);
  }

  return (
    [
      <Topbar key="top bar"/>,
      <div key="main" className="main">
        <SidebarNav solutions={solutions} activeSolution={activeSolution} setActiveSolution={setActiveSolution} />
        <Worksurface solutions={solutions} activeSolution={activeSolution} modifySolution={modifySolution} options={options} />
        {activeSolution > -1 &&
          (<SidebarStats solutions={solutions} activeSolution={activeSolution} modifySolution={modifySolution} setOptions={setOptions} options={options} />)
        }
      </div>
    ]
  );
}

export default App;
