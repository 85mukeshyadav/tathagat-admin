import React from "react";

const updatesContext = React.createContext({
    updates: [],
    setUpdates: () => { }
});

export default updatesContext;