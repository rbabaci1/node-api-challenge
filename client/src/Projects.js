import React, { useState } from "react";

export default function Projects({ projects }) {
  const [actions, setActions] = useState([]);

  const getActions = async () => {
    try {
      const data = await fetch(
        "https://young-everglades-05589.herokuapp.com/api/actions"
      );

      const actions = await data.json();
      setActions(actions);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='projects'>
      {projects.map(project => (
        <div className='project' key={project.id}>
          <h1>
            Name: <span>{project.name}</span>
          </h1>

          <h1>
            Description: <span>{project.description}</span>
          </h1>
        </div>
      ))}

      <button onClick={getActions}>Show Actions</button>

      {actions.length && <h2>Actions List</h2>}

      <div className='actions'>
        {actions.map(action => (
          <div className='action' key={action.id}>
            <h1>
              Description: <span>{action.description}</span>
            </h1>

            <h1>
              Name: <span>{action.notes}</span>
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}
