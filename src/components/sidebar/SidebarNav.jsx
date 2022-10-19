import "./sidebar.css";

export default function SidebarNav({solutions, activeSolution, setActiveSolution}) {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <nav className="sidebarMenu">
          <h3 className="sidebarTitle">Solutions</h3>
          <ul className="sidebarList">
            {
              solutions.map( (solution, index) => {
                const className = activeSolution === index ? 'sidebarListItem active' : 'sidebarListItem';
                return (
                  <li key={`link ${solution.id}`} className={className}>
                    <button onClick={() => setActiveSolution(index)}>{solution.name}</button>
                  </li>
                )
              })
            }
          </ul>
        </nav>
      </div>
    </div>
  );
}
