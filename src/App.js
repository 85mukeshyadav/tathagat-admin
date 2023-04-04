import React, { useEffect } from 'react';
import Overview from './components/Overview';
import Navbar from './components/Navbar';
import { useState } from 'react';
import "./App.css"
import SignIn from './components/Auth/Signin';
import AllprojectsContext from './context/AllprojectsContext';
import SelectedProjectContext from './context/selectdProjectContext';
import updatesContext from './context/UpdatesContext';
import CountContext from './context/CountContext';
import axios from 'axios';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import NotFound from './components/NotFound';
import Settings from './components/Settings';
import { useLocation } from 'react-router-dom';
import Admin from './Screens/addquestion';
import AddCourse from './Screens/addCourse';
import AddSubject from './Screens/addSubject';
import CreateTest from './Screens/createTest';

import AddChapter from './Screens/addChapter';
import AddTopic from './Screens/addTopic';
import CourseListContext from './context/AllprojectsContext';
import Createpackage from './Screens/Createpackage';
import AddVideos from './Screens/addVideo';
import AddUsers from './Screens/addUsers';
import AddBlog from './Screens/blog';



function App() {

  let [ updates, setUpdates ] = useState([]);
  let [ count, setCount ] = useState(0);
  let [isLoader, setLoader] = useState(false);
  const updatesContextt = { updates, setUpdates }
  const countContextt = { count, setCount }

  const [ courseList, setcourseList ] = useState([])
  const [ ProjectTasks, setProjectTasks ] = useState([])
  const [ SelectedProject, setSelectedProject ] = useState()
  let [ overview, showOverview ] = useState(true);
  let [ task, showTask ] = useState(false);
  let [ isAllTasks, showAllTask ] = useState(false);
  let [ isIssueexp, setissuesexp ] = useState(false);
  let [ Authorized, setAuthorized ] = useState(false);
  let [ docs, setDocs ] = useState(false);
  const [ isIssue, setIssue ] = useState(true)
  let user = localStorage.getItem('user')
  const Courses = { courseList, setcourseList }
  const TaskContext = { ProjectTasks, setProjectTasks }
  const SelectedProjects = { SelectedProject, setSelectedProject }
  const IssuesAndExepensesCxt = { isIssue, setIssue }
  let location = useLocation();

  useEffect(async () => {
    try {
      const res = localStorage.getItem('token')
      console.log("🚀 ~ file: App.js ~ line 51 ~ useEffect ~ res", res)
      if (res) {
        setAuthorized(true)
      }
      else {
        setAuthorized(false)
      }
      const userid = localStorage.getItem('userid')
      const options = {
        headers: {
          'Content-type': 'application/json',
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      };
      // const resdata = await axios.get(process.env.REACT_APP_DURL + 'getUserProject/' + userid, options)
      // setAllProjects(resdata.data.ProjectId)
      // setSelectedProject(resdata?.data?.ProjectId[ 0 ]?._id)
      // localStorage.setItem('pid', resdata?.data?.ProjectId[ 0 ]?._id)
     // const respcourse = await axios.get(process.env.REACT_APP_API + '/course')
     // console.log("🚀 ~ file: AddCourse.js ~ line 32 ~ useEffect ~ respcourse.data", respcourse.data)
     // if (respcourse.status == 200) {
        // alert('success')
        const respcourse = await axios.get(process.env.REACT_APP_API + '/course')
        console.log("🚀 ~ file: AddCourse.js ~ line 32 ~ useEffect ~ res.data", respcourse.data)
        if (respcourse.status == 200) {
          // alert('success')
          setcourseList(respcourse.data)
        }
     // }
    }
    catch (err) {
      console.log(err)
    }
  }, []);

  return <React.Fragment>

    <CountContext.Provider value={ countContextt } >
      <updatesContext.Provider value={ updatesContextt } >
        <CourseListContext.Provider value={ Courses }>
          <SelectedProjectContext.Provider value={ SelectedProjects }>
            <div>
              { Authorized ?
                <div style={ { display: 'flex' } }>
                  <Navbar user={ user } />
                  <div className='main-page'>
                    <Switch>
                      {/* <Route path='/editTask/:id' render={ (props) => <CreateTask { ...props } buttonName="Update Task" /> } /> */ }
                      {/* <Route path='/tasks/taskDetails' component={ Task } /> */ }
                      {/* <Route path='/analysisDetails' render={ (props) => <AnalysisDetails { ...props } /> } /> */ }
                      {/* <Route path='/documents/allFiles' component={ AllFiles } /> */ }
                      {/* <Route path='/documents/allMedia' component={ AllMedia } /> */ }
                      <Route path='/overview' render={ (props) => <Overview key='2' user={ user } { ...props } /> } />
                      <Route path='/CreateTest' render={ (props) => <CreateTest key='3' isLoader={isLoader} setLoader={setLoader} Data={ user } { ...props } /> } />
                      <Route path='/Createpackage' render={ (props) => <Createpackage key='4' isLoader={isLoader} setLoader={setLoader}  Data={ user } { ...props } /> } />
                      <Route path='/addsubject' render={ (props) => <AddSubject key='5' Data={ user } { ...props } /> } />
                      <Route path='/addCourse' render={ (props) => <AddCourse key='6'  Data={ user } { ...props } /> } />
                      <Route path='/addChapter' render={ (props) => <AddChapter key='7' Data={ user } { ...props } /> } />
                      <Route path='/addTopic' render={ (props) => <AddTopic key='8' Data={ user } { ...props } /> } />
                      {/* <Route path='/tasks' render={ (props) => <AllTasks { ...props } /> } /> */ }
                      {/* <Route path='/ratelist' render={ (props) => <Ratelist { ...props } /> } /> */ }
                      {/* <Route path='/rfi' render={ (props) => <RFI { ...props } /> } /> */ }
                      {/* <Route path='/rfidetails' render={ (props) => <RFIDetails { ...props } /> } /> */ }
                      {/* <Route path='/reports' render={ (props) => <Reports { ...props } /> } /> */ }
                      {/* <Route path='/train' render={(props)=> <Trainn {...props}/>} />   */ }
                      <Route path='/settings' render={ (props) => <Settings key='9' { ...props } /> } />
                      <Route path='/AddQuestion' render={ (props) => <Admin key='10' isLoader={isLoader} setLoader={setLoader} { ...props } /> } />
                      <Route path='/AddVideo' render={ (props) => <AddVideos key='11' { ...props } /> } />
                      <Route path='/addNewUser' render={ (props) => <AddUsers key='12' { ...props } /> } />
                      <Route path='/AddBlog' render={ (props) => <AddBlog key='13' { ...props } /> } />
                      {/* <Route path='/issuesAndExpenses' render={ (props) => <IssueAndExpense { ...props } /> } />
                          <Route path='/module' render={ (props) => <Module { ...props } /> } />
                          <Route path='/costSaved' render={ (props) => <CostSaved { ...props } /> } />
                          <Route path='/costLeakages' render={ (props) => <CostLeakages { ...props } /> } />
                          <Route path='/dpr' render={ (props) => <DailyProgressReport { ...props } /> } /> */}
                      {/* <Route path='/createProject' component={CreateProject}/> */ }
                      {/* <Route path='/createTask' render={ (props) => <CreateTask { ...props } buttonName="Create Task" /> } /> */ }
                      {/* <Route path='/calendar' component={CustomCalendar} /> */ }
                      {/* <Route path ='/taskchart' component={TaskChart} /> */ }
                      <Redirect from='/' exact to='/overview' />
                      <Route path='/*' component={ NotFound } />
                    </Switch>
                  </div>
                </div>
                : <SignIn />
              }
            </div>
          </SelectedProjectContext.Provider>
        </CourseListContext.Provider>
      </updatesContext.Provider>
    </CountContext.Provider>
    <div className={(isLoader) ? '': 'loaderDisplay'} id="loader"></div>
  </React.Fragment>
}

export default App;
