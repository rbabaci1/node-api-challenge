import React, { useState, useEffect } from "react";

export default function Projects({ projects }) {
  const [actions, setActions] = useState([]);

  return (
    <div className='projects'>
      {projects.map(project => (
        <div className='project'>
          <h1>
            Name: <span>{project.name}</span>
          </h1>
          <h1>
            Description: <span>{project.description}</span>
          </h1>
        </div>
      ))}
    </div>
  );
}
