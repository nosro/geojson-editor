import "./sidebar.css";

export default function Sidebar({solutions, setActiveSolution}) {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <nav className="sidebarMenu">
          <h3 className="sidebarTitle">Solutions</h3>
          <ul className="sidebarList">
            {
              solutions.map( solution => (<a key={`link ${solution.id}`} className="sidebarListItem" onClick={() => setActiveSolution(solution)}>{solution.name}</a>))
            }
          </ul>
        </nav>
      </div>
    </div>
  );
}
