import React from "react";

const ProjectTaskContext = React.createContext({
    ProjectTask: [],
    setProjectTask: () => { }
});

export default ProjectTaskContext;