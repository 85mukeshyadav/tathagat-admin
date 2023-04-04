import React from "react";

const IssuesAndExpensesContext = React.createContext({
    isIssue: true,
    setIssue: () => { }
});

export default IssuesAndExpensesContext;