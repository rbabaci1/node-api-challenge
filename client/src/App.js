import React, { useState } from "react";
import Projects from "./Projects";

function App() {
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      const data = await fetch(
        "https://young-everglades-05589.herokuapp.com/api/projects"
      );
      const projects = await data.json();

      setProjects(projects);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='App'>
      <h1>*** Projects List API ***</h1>

      <button onClick={getProjects}>Show Projects</button>

      <Projects projects={projects} />
    </div>
  );
}

export default App;
