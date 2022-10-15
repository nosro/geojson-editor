import { useState } from 'react';
import './App.css';
import Topbar from "./components/topbar/Topbar";
import Sidebar from './components/sidebar/Sidebar';
import Worksurface from './components/worksurface/Worksurface';

import data from './data/DataProvider';

function App() {
  const [solutions, setSolutions] = useState(data);
  const [activeSolution, setActiveSolution] = useState();

  const modifySolution = (id, values) => {
    const newSolutions = solutions.map( (solution) => {
      if (solution.id === String(id)) {
        return {...solution, ...values}
      }
      return solution;
    })

    setSolutions(solutions => newSolutions);
  }

  // useEffect(
  //   () => {
  //     modifySolution(1, {name: 'bar'} );
  //   }
  // )

  return (
    [
      <Topbar key="top bar"/>,
      <div key="app" className="app">
        <Sidebar solutions={solutions} setActiveSolution={setActiveSolution} />
        <Worksurface solution={activeSolution} />
      </div>
    ]
  );
}

export default App;
