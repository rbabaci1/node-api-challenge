import React, { useState } from "react";

function App() {
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      const projects = await fetch(
        "https://young-everglades-05589.herokuapp.com/api/projects"
      );

      console.log(projects);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='App'>
      <h1>*** Projects List API ***</h1>

      <button onClick={getProjects}>Show Projects</button>
    </div>
  );
}

export default App;
