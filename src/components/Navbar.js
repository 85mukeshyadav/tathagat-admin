import React, { useContext, useEffect, useState } from "react";
import AllprojectsContext from "../context/AllprojectsContext";
import SelectedProjectContext from "../context/selectdProjectContext";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBox,
	faHome,
	faPlus,
	faPlusMinus,
	faQuestionCircle,
	faSignOut,
	faSuperscript,
	faUserAlt,
	faVideo,
} from "@fortawesome/free-solid-svg-icons";

function Navbar(props) {
	const [user, setuser] = useState({});
	const { AllProjects } = useContext(AllprojectsContext);
	const { SelectedProject, setSelectedProject } = useContext(
		SelectedProjectContext
	);
	const [navbar, setNavbar] = useState(false);
	const [projectName, setProjectName] = useState("");

	function _setuser() {
		let res = localStorage.getItem("user");
		res = JSON.parse(res);
		setuser(res);
	}
	function _Logout() {
		localStorage.removeItem("pid");
		localStorage.removeItem("tid");
		localStorage.removeItem("user");
		localStorage.removeItem("userid");
		localStorage.removeItem("token");
		window.location.reload();
		window.location.pathname = "";
	}
	useEffect(() => {
		_setuser();
		setSelectedProject(localStorage.getItem("pid"));
	}, []);

	return (
		<React.Fragment>
			{/* <nav className={ styles.topnav }>
            <div className={ styles.projectName }>
                <div className={ styles.box }>
                    <Dropdown arrowClassName={ styles.dropdownArrow } className={ styles.dropdownContainer } menuClassName={ styles.dropdownMenu } controlClassName={ styles.dropdown }
                        options={ getProjects() } onChange={ (e) => {
                            setSelectedProject(e.value);
                            localStorage.setItem('pid', e.value)
                        } } value={ getProjects().find(i => i.value == SelectedProject) } />
                    <div className={ styles.dropdownIcon }><i className="fas fa-angle-down"></i></div>
                </div>
            </div>

            <div className={ styles.user }>
                <div className={ styles.userName }>
                    <h3>{ user?.Name }</h3>
                    <div style={ { backgroundColor: navigator.onLine == true ? '#2AC371' : '#D53539' } }></div>
                </div>
                <div className={ styles.divider }></div>
                <li className={ styles.nav__items }>
                    <Link to='/settings'><img src={ settingsicon } /></Link>
                    <Link style={ { textDecoration: 'underline' } } to='/settings'>Settings</Link>
                </li>
            </div>

        </nav> */}

			<nav className={styles.sidebar}>
				<ul style={{ marginTop: "10px" }}>
					<li className={styles.nav__items}>
						<Link to="/overview">
							<FontAwesomeIcon
								icon={faHome}
								className="w-6 text-indigo-500 h-6 p-0"
							/>
						</Link>
						<Link to="/overview" className={styles.navLink}>
							Home
						</Link>
					</li>

					{/* <li className={ styles.nav__items }>
                    <Link to='/Admin'><img src={ docsicon } /></Link> 
                    <Link to='/Admin' className={ styles.navLink }>Add Course</Link>
                </li> */}

					<li className={styles.nav__items}>
						<Link to="/addCourse">
							<FontAwesomeIcon
								icon={faPlusMinus}
								className="w-6 text-indigo-500 h-6 p-0"
							/>
						</Link>
						<Link to="/addCourse" className={styles.navLink}>
							Add Course
						</Link>
					</li>
					<li className={styles.nav__items}>
						<Link to="/addsubject">
							<FontAwesomeIcon
								icon={faPlus}
								className="w-6 text-indigo-500 h-6 p-0"
							/>
						</Link>
						<Link to="/addsubject" className={styles.navLink}>
							Add Subject
						</Link>
					</li>
					<li className={styles.nav__items}>
						<Link to="/addChapter">
							<FontAwesomeIcon
								icon={faPlus}
								className="w-6 text-indigo-500 h-6 p-0"
							/>
						</Link>
						<Link to="/addChapter" className={styles.navLink}>
							Add Module
						</Link>
						{/* Module is Chapter */}
					</li>
					<li className={styles.nav__items}>
						<Link to="/addTopic">
							<FontAwesomeIcon
								icon={faPlus}
								className="w-6 text-indigo-500 h-6 p-0"
							/>
						</Link>
						<Link to="/addTopic" className={styles.navLink}>
							Add Topic
						</Link>
					</li>
					<li className={styles.nav__items}>
						<Link to="/AddQuestion">
							<FontAwesomeIcon
								icon={faQuestionCircle}
								className="w-6 text-indigo-500 h-6 p-0"
							/>
						</Link>
						<Link to="/AddQuestion" className={styles.navLink}>
							Add Questions
						</Link>
					</li>
					<li className={styles.nav__items}>
						<Link to="/AddVideo">
							<FontAwesomeIcon
								icon={faVideo}
								className="w-6 text-indigo-500 h-6 p-0"
							/>
						</Link>
						{/* <Link to='/AddVideo'><i class="fa-solid fa-video-plus"></i></Link> */}
						<Link to="/AddVideo" className={styles.navLink}>
							Add videos
						</Link>
					</li>
					<li className={styles.nav__items}>
						<Link to="/CreateTest">
							<FontAwesomeIcon
								icon={faSuperscript}
								className="w-6 text-indigo-500 h-6 p-0"
							/>
						</Link>
						<Link to="/CreateTest" className={styles.navLink}>
							Create Test
						</Link>
					</li>
					<li className={styles.nav__items}>
						<Link to="/CreatePackage">
							<FontAwesomeIcon
								icon={faBox}
								className="w-6 text-indigo-500 h-6 p-0"
							/>
						</Link>
						<Link to="/CreatePackage" className={styles.navLink}>
							Create Package
						</Link>
					</li>
					<li className={styles.nav__items}>
						<Link to="/AddBlog">
							<FontAwesomeIcon
								icon={faUserAlt}
								className="w-6 text-indigo-500 h-6 p-0"
							/>
						</Link>
						<Link to="/AddBlog" className={styles.navLink}>
							Publish Blog
						</Link>
					</li>
					<li className={styles.nav__items}>
						<Link to="/addNewUser">
							<FontAwesomeIcon
								icon={faUserAlt}
								className="w-6 text-indigo-500 h-6 p-0"
							/>
						</Link>
						<Link to="/addNewUser" className={styles.navLink}>
							Add New User
						</Link>
					</li>
					<li className={styles.nav__items}>
						<Link to="/createUniqueUrl">
							<FontAwesomeIcon
								icon={faBox}
								className="w-6 text-indigo-500 h-6 p-0"
							/>
						</Link>
						<Link to="/createUniqueUrl" className={styles.navLink}>
							Create Unique URL
						</Link>
					</li>
					{/* <li className={styles.nav__items}>
    <Link to='/analysis'><img src={analysisicon}/></Link>
    <Link to='/analysis' className={styles.navLink}>Analysis</Link>
    </li> */}

					{/* <li className={ styles.nav__items }>
                    <Link to='/ratelist'><img src={ ratelistlogo } /></Link>
                    <Link to='/ratelist' className={ styles.navLink }>Ratelist</Link>
                </li> */}

					{/* <li className={ styles.nav__items }>
                    <Link to='/rfi'><img src={ rfilogo } /></Link>
                    <Link to='/rfi' className={ styles.navLink }>RFI</Link>
                </li> */}

					{/* <li className={ styles.nav__items }>
                    <Link to='/createTask'><img src={ plusicon } /></Link>
                    <Link to='/createTask' className={ styles.navLink }>Create Task</Link>
                </li> */}
				</ul>
				<ul style={{ marginTop: "auto" }}>
					<li className={styles.nav__items}>
						<div>
							<FontAwesomeIcon
								icon={faSignOut}
								className="w-6 text-indigo-500 h-6 p-0"
							/>
						</div>
						<div onClickCapture={() => _Logout()} className={styles.navLink}>
							Logout
						</div>
					</li>
				</ul>
			</nav>
		</React.Fragment>
	);
}

export default Navbar;
