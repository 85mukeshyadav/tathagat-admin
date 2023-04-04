import React from "react";

const CountContext = React.createContext({
    count: 0,
    setCount: () => {}
});

export default CountContext;