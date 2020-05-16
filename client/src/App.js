import React, { useState } from "react";
import Projects from "./Projects";

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProjects = async () => {
    setLoading(true);

    try {
      const data = await fetch(
        "https://young-everglades-05589.herokuapp.com/api/projects"
      );
      const projects = await data.json();

      setProjects(projects);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className='App'>
      <h1>*** Projects List API ***</h1>

      <button onClick={getProjects}>Show Projects</button>

      {loading && <p>Loading...</p>}

      {projects.length && <Projects projects={projects} />}
    </div>
  );
}

export default App;
