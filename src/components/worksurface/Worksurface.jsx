import "./worksurface.css";

export default function Worksurface({solution, modifySolution}) {
  return (
    <div className="worksurface">
      <div className="worksurfaceContainer" >
        { ! solution && (
             <h1 className="worksurfaceTitle">Please select a solution</h1>
        )}

        { solution && (
        <h1 className="worksurfaceTitle">{solution.name}</h1>

        )}
      </div>
    </div>
  );
}