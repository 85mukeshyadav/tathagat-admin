import React from "react";

const CourseListContext = React.createContext({
    CourseList: [],
    setCourseList: () => { }
});

export default CourseListContext;