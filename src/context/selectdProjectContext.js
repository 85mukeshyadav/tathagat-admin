import React from "react";

const SelectedProjectContext = React.createContext({
    SelectedProject: [],
    setSelectedProject: () => { }
});

export default SelectedProjectContext;