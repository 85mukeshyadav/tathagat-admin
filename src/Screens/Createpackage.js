//import liraries
import axios from "axios";
import React, { Component, useContext, useEffect, useState } from "react";
import ReactDragListView from "react-drag-listview";
import { toast, ToastContainer } from "react-toastify";
import ReactTooltip from "react-tooltip";
import { ToastInfo, ToastUpdate, uploadToCloud } from "../api/Client";
import CourseListContext from "../context/AllprojectsContext";
import dragicon from "../resources/drag.svg";
import Modal from "react-modal";
import ReactQuill from "react-quill";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

// create a component
const Createpackage = (params) => {
	const options = {
		headers: {
			"Content-type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("token"),
		},
	};

	const [isPara, setPara] = useState(false);
	const [PackageName, setPackageName] = useState(null);
	const [SubjectList, setSubjectList] = useState([
		{ id: 0, name: "Subject 1" },
		{ id: 1, name: "Subject 2" },
		{ id: 2, name: "Subject 3" },
	]);
	const [Options, setOptions] = useState([]);
	const [FreeCourseVideo, setFreeCourseVideo] = useState([]);
	const { courseList, setcourseList } = useContext(CourseListContext);
	const [Subjectid, setSubjectid] = useState("");
	const [courseId, setcourseId] = useState("");
	const [chapterId, setchapterId] = useState("");
	const [topicId, settopicId] = useState("");
	const [ChapterList, setChapterList] = useState([]);
	const [topicList, settopicList] = useState([]);
	const [TetsList, setTetsList] = useState([]);
	const [VideoList, setVideoList] = useState([]);
	const [allStudentList, setAllStudentList] = useState([]);
	const [PackageDesc, setPackageDesc] = useState();
	const [Packagethumb, setPackagethumb] = useState();
	const [PackageofficialDesc, setPackageofficialDesc] = useState();
	const [PackagePrice, setPackagePrice] = useState(null);
	const [data, setdata] = useState([]);
	const [viewPackage, setViewPackage] = useState(false);
	const [allPackage, setAllPackage] = useState([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [selectedPackage, setSelectedPackage] = useState(null);
	const [selectedStudent, setSelectedStudent] = useState({
		packageid: "",
		studentList: [],
	});
	const [searchTerm, setSearchTerm] = React.useState("");

	const selectedStudentList = {
		packageid: "",
		studentList: [],
	};
	const [allSearchStudent, setAllSearchStudent] = useState([]);
	const [getEditMode, setEditMode] = useState(false);
	const [getEditModePacDetail, setEditModePacDetail] = useState({});

	const dragProps = {
		onDragEnd(fromIndex, toIndex) {
			console.log(
				"🚀 ~ file: CReatepackage.js ~ line 28 ~ onDragEnd ~ fromIndex, toIndex",
				fromIndex,
				toIndex
			);
			const item = data.splice(fromIndex, 1)[0];
			data.splice(toIndex, 0, item);
			setdata([...data]);
		},
		nodeSelector: "tr",
		handleSelector: "a",
	};

	async function _SubmitPackage() {
		let testId = [];

		data.map((e, i) => {
			testId.push({ TestId: e.TestId, TestTitle: e.TestTitle });
		});

		const dataObj = {
			PackageName: PackageName,
			Options: Options,
			PackageDesc: PackageDesc,
			officialDesc: PackageofficialDesc,
			PackagePrice: PackagePrice ? parseInt(PackagePrice) : 0,
			subjectId: Subjectid,
			topicId: topicId,
			chapterId: chapterId,
			courseId: courseId,
			FreeCourseVideo: FreeCourseVideo,
			TestList: testId,
			thumbnail: Packagethumb,
		};
		if (getEditMode) {
			dataObj["packageId"] = getEditModePacDetail.packageId;
		}

		// console.log(dataObj, testId);
		//return;

		try {
			params.setLoader(true);
			const res = await axios.post(
				process.env.REACT_APP_API + "/createpackage",
				dataObj,
				options
			);
			console.log(
				"🚀 ~ file: CReatepackage.js ~ line 70 ~ _SubmitPackage ~ res",
				res.data
			);
			if (res.status == 200) {
				let msg = "Package created successfully";
				if (getEditMode) {
					msg = "Package updated successfully";
				}

				toast.success(msg, {
					position: "top-right",
					autoClose: 1000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});

				setTimeout(() => {
					window.location.reload();
				}, 2000);
			}
			params.setLoader(false);
		} catch (err) {
			params.setLoader(false);
			toast.error("Error :" + err, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	}

	const onSelectCourse = (e) => {
		e.preventDefault();
		setSubjectid("");
		setSubjectList([]);
		setchapterId("");
		setChapterList([]);
		settopicId("");
		settopicList([]);
		params.setLoader(true);
		setcourseId(e.target.value);
		_getSubject(e.target.value);
		_getVideoByCourse(e.target.value);
	};

	const onSelectSubject = (e) => {
		e.preventDefault();
		setchapterId("");
		setChapterList([]);
		settopicId("");
		settopicList([]);
		params.setLoader(true);
		setSubjectid(e.target.value);
		_getchapter(e.target.value);
	};

	const onSelectChapter = (e) => {
		e.preventDefault();
		settopicId("");
		settopicList([]);
		params.setLoader(true);
		setchapterId(e.target.value);
		_gettopic(e.target.value);
	};

	const _getTestList = async () => {
		if (courseId) {
			try {
				params.setLoader(true);

				let reqParam = { courseId };
				reqParam["subjectId"] = Subjectid || undefined;
				reqParam["chapterId"] = chapterId || undefined;
				reqParam["topicId"] = topicId || undefined;

				// const res = await axios.get(process.env.REACT_APP_API + '/alltest', options );
				const res = await axios.get(process.env.REACT_APP_API + "/alltest", {
					params: reqParam,
				});
				if (res.status == 200) {
					if (getEditMode) {
						let da = res.data.map((d, i) => {
							getEditModePacDetail?.testList.map((m, e) => {
								if (d.TestId == m.TestId) {
									d["isEditExist"] = true;
								}
							});
							return d;
						});
						setTetsList(da);
					} else {
						setTetsList(res.data);
					}
					console.log(
						"🚀 ~ file: Createpackage.js ~ line 108 ~ axios.get ~ res.data",
						res.data
					);
				}
				params.setLoader(false);
			} catch (err) {
				params.setLoader(false);
			}
		}
	};

	const _getVideoByCourse = async (courseId) => {
		try {
			params.setLoader(true);
			const res = await axios.get(
				process.env.REACT_APP_API + "/getvideobycourse/" + courseId,
				options
			);

			if (res.status == 200) {
				setVideoList(res.data);

				console.log(
					"🚀 ~ file: Createpackage.js ~ line 111 ~ axios.get ~ res.data",
					res.data
				);
			}
			params.setLoader(false);
		} catch (err) {
			params.setLoader(false);
		}
	};

	const _getSubject = async (courseId) => {
		if (courseId) {
			//params.setLoader(true);
			try {
				const res = await axios.get(
					process.env.REACT_APP_API + "/subject/" + courseId,
					options
				);
				if (res.status == 200) {
					setSubjectList(res.data);
				}
				params.setLoader(false);
			} catch (err) {
				params.setLoader(false);
			}
		}
	};

	const _getchapter = async (Subjectid) => {
		try {
			params.setLoader(true);
			const res = await axios.get(
				process.env.REACT_APP_API + "/chapter/" + Subjectid,
				options
			);
			if (res.status == 200) {
				setChapterList(res.data);
			}
			params.setLoader(false);
		} catch (err) {
			params.setLoader(false);
		}
	};

	const _gettopic = async (chapterId) => {
		try {
			params.setLoader(true);
			const res = await axios.get(
				process.env.REACT_APP_API + "/topic/" + chapterId,
				options
			);
			console.log(
				"🚀 ~ file: addquestion.js ~ line 79 ~ const_gettopic= ~ res",
				res.data
			);
			if (res.status == 200) {
				settopicList(res.data);
			}
			params.setLoader(false);
		} catch (err) {
			params.setLoader(false);
		}
	};

	const _uploadmedia = async (file) => {
		let toastid = ToastInfo("Uploading Image");
		if (
			file.type == "image/jpg" ||
			file.type == "image/jpeg" ||
			file.type == "image/png" ||
			file.type == "image/gif"
		) {
			const resp = await uploadToCloud(file);
			let data = resp.data;
			setPackagethumb(data.secure_url);
			ToastUpdate(toastid, "Image Uploaded Successfully");
		} else {
			toast.error("Please choose image with JPG,JPEG,PNG,GIF format only ");
			setPackagethumb();
		}
	};

	useEffect(() => {
		_getTestList();
	}, [courseId, Subjectid, chapterId, topicId]);

	const _getAllPackages = async () => {
		try {
			setAllPackage([]);
			params.setLoader(true);
			const res = await axios.get(
				process.env.REACT_APP_API + "/getallpackages",
				options
			);
			console.log("getallpackages", res.data, res.status);
			if (res.status == 200) {
				setAllPackage(res.data);
			}
			params.setLoader(false);
		} catch (err) {
			params.setLoader(false);
		}
	};

	const setModalIsOpenToTrue = (packageId) => {
		setSelectedPackage(packageId);
		selectedStudentList["packageid"] = packageId;
		_getAllStudent();
		setModalIsOpen(true);
	};

	const setModalIsOpenToFalse = () => {
		selectedStudentList.packageid = "";
		selectedStudentList.studentList = [];
		setModalIsOpen(false);
	};

	const handleChange = (event) => {
		setSearchTerm(event.target.value);
		if (event.target.value) {
			let seaStu = allStudentList.filter((data) => {
				if (
					data.username
						.toLowerCase()
						.indexOf(event.target.value.toLowerCase()) != -1
				) {
					return data;
				}
			});
			setAllSearchStudent(seaStu);
		} else {
			setAllSearchStudent(allStudentList);
		}
	};

	const _getAllStudent = async () => {
		try {
			setAllStudentList([]);
			setAllSearchStudent([]);
			params.setLoader(true);
			const res = await axios.get(process.env.REACT_APP_API + "/alluser", {
				params: { userType: "student" },
			});
			console.log("getallstudents", res.data, res.status);
			if (res.status == 200) {
				setAllStudentList(res.data);
				setAllSearchStudent(res.data);
			}
			params.setLoader(false);
		} catch (err) {
			params.setLoader(false);
		}
	};

	const assignStudentToPackage = async () => {
		const dataObj = {
			packageId: selectedStudentList["packageid"],
			studentList: selectedStudentList["studentList"],
		};

		try {
			params.setLoader(true);
			const res = await axios.post(
				process.env.REACT_APP_API + "/assignStudentToPackage",
				dataObj,
				options
			);
			if (res.status == 200) {
			}
			params.setLoader(false);
			setModalIsOpenToFalse();
		} catch (err) {
			params.setLoader(false);
			setModalIsOpenToFalse();
		}
	};

	const getPackageById = (pac) => {
		console.log(pac);
		setEditMode(true);
		setEditModePacDetail(pac);
		_getSubject(pac.courseId);
		setcourseId(pac.courseId);
		let da = [...data, ...pac.testList];
		console.log(da);
		setdata(da);
	};

	return (
		<div className="m-10">
			<ToastContainer />
			<div className="mb-2">
				{getEditMode ? (
					<button
						type="button"
						onClick={() => window.location.reload()}
						className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						cancel Edit Mode
					</button>
				) : (
					<button
						type="button"
						onClick={() => {
							setViewPackage((viewPackage) => !viewPackage);
							if (!viewPackage) {
								_getAllPackages();
							}
						}}
						className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						View Packages
					</button>
				)}
			</div>

			<div className={viewPackage ? "" : "loaderDisplay"}>
				<div className="w-full mx-auto">
					<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
						<div className="inline-block min-w-full shadow-md rounded-lg overflow-x-auto selectTestHeight">
							<table className="min-w-full leading-normal mb-4">
								<thead>
									<tr>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
											S.No
										</th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
											Package Name
										</th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
											Package Details
										</th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
											Price
										</th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
											Total Question
										</th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
											Assignment
										</th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{allPackage.map((pac, index) => (
										<tr>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-[140px]">
												{index + 1}
											</td>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-[140px]">
												{pac.name}
											</td>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-[140px]">
												{pac.packageDetails}
											</td>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-[140px]">
												{pac.price}
											</td>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-[140px]">
												{pac.questionCount}
											</td>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-[140px]">
												<button
													type="button"
													onClick={() => setModalIsOpenToTrue(pac.packageId)}
													className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
												>
													Assign Students
												</button>
											</td>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-[140px]">
												<button
													type="button"
													onClick={() => {
														setViewPackage((viewPackage) => !viewPackage);
														getPackageById(pac);
													}}
													className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
												>
													Edit
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<Modal isOpen={modalIsOpen} style={customStyles} ariaHideApp={false}>
				<button onClick={setModalIsOpenToFalse}>x</button>
				<div>
					<input
						className="searchbx"
						type="text"
						placeholder="Search"
						value={searchTerm}
						onChange={handleChange}
					/>
				</div>
				<div className="w-full mx-auto">
					<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
						<div className="inline-block min-w-full shadow-md rounded-lg overflow-x-auto selectTestHeight">
							<table className="min-w-full leading-normal mb-4">
								<thead>
									<tr>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
											S.No
										</th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
											Student Name
										</th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
											Email Id.
										</th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
											Phone No.
										</th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{allSearchStudent.map((stu, index) => (
										<tr>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-[140px]">
												{index + 1}
											</td>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-[140px]">
												{stu.username}
											</td>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-[140px]">
												{stu.email_Id}
											</td>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-[140px]">
												{stu.mobileNumber}
											</td>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-[140px]">
												<input
													type="checkbox"
													onClick={() => {
														if (stu["checked"]) {
															let student = selectedStudentList[
																"studentList"
															].filter((selStu) => {
																if (selStu.email_Id != stu.email_Id) {
																	return selStu;
																}
															});
															stu["checked"] = false;
															selectedStudentList["studentList"] = student;
														} else {
															stu["checked"] = true;
															selectedStudentList["studentList"] = [
																...selectedStudentList["studentList"],
																...[stu],
															];
														}
														selectedStudentList["packageid"] = selectedPackage;
														console.log("nnnnnnnnnn", selectedStudentList);
													}}
													defaultChecked={stu["checked"]}
												/>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<button
								type="button"
								onClick={() => assignStudentToPackage()}
								className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							>
								Submit
							</button>
						</div>
					</div>
				</div>
			</Modal>

			<div className="mb-4">
				<label
					className="block text-gray-700 text-sm font-bold mb-2"
					htmlFor="name"
				>
					Name
				</label>
				<input
					required
					onChange={(e) => setPackageName(e.target.value)}
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="name"
					type="text"
					value={getEditModePacDetail.name}
					placeholder="Package Name"
					disabled={getEditMode}
				/>
			</div>

			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2">
					Short Description
					<textarea
						required
						value={getEditModePacDetail.packageDetails}
						disabled={getEditMode}
						onChange={(e) => {
							console.log(
								"🚀 ~ file: Createpackage.js ~ line 186 ~ Createpackage ~ e.target.value",
								e.target.value
							);
							setPackageDesc(e.target.value);
						}}
						className="shadow form-textarea mt-1 block w-full border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						rows="5"
						placeholder="Package Details"
					></textarea>
				</label>
			</div>
			<div className="mb-8">
				<label className="block text-gray-700 text-sm font-bold mb-2">
					Package Details
					{/* <textarea required value={getEditModePacDetail.officialDesc} disabled={getEditMode} onChange={ (e) => {
                        setPackageofficialDesc(e.target.value)
                    } } className="shadow form-textarea mt-1 block w-full border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="5" placeholder="Package Details"></textarea> */}
				</label>
				<ReactQuill
					modules={{
						toolbar: [
							[{ header: [1, 2, 3, 4, 5, 6, true] }, { font: [] }],
							[
								"bold",
								"italic",
								"underline",
								"strike",
								"code-block",
								// "blockquote",
							],
							[
								{ list: "ordered" },
								{ list: "bullet" },
								{ indent: "-1" },
								{ indent: "+1" },
							],
							["link", "image"],
							// ["link", "image", "video"],
							// ["clean"],
							[{ color: [] }, { background: [] }],
							[{ script: "sub" }, { script: "super" }],
							["formula", true],
						],
					}}
					formats={{
						toolbar: [
							"header",
							"font",
							"size",
							"bold",
							"italic",
							"underline",
							"strike",
							"blockquote",
							"list",
							"bullet",
							"indent",
							"link",
							"image",
							// "video",
						],
					}}
					style={{ height: "200px", marginBottom: "5%" }}
					// value={getEditModePacDetail?.officialDesc}
					onChange={(e) => {
						console.log("🚀 ~ Createpackage.js ~ line 730 ~ packagedesc", e);
						setPackageofficialDesc(e);
					}}
				/>
			</div>
			<div className="mb-4 bg-gray-100 p-4 rounded-md mt-7">
				<label
					className="block text-gray-500 text-sm font-bold mb-2"
					htmlFor="name"
				>
					Package Thumbnail
				</label>
				<div className="m-4">
					<div className="flex items-center justify-center w-full">
						<label className="flex  cursor-pointer flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-white hover:border-gray-300">
							<div className="flex flex-col items-center justify-center pt-7">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
									/>
								</svg>
								<p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
									Attach a file
								</p>
							</div>
							<input
								required
								onChange={(e) => _uploadmedia(e.target.files[0])}
								accept="image/*"
								type="file"
								className="opacity-0"
							/>
						</label>
					</div>
					{Packagethumb == null ||
					Packagethumb == "" ||
					Packagethumb == undefined ? null : (
						<img
							className="w-20 hover:w-full duration-300 shadow-sm "
							src={Packagethumb}
						/>
					)}
				</div>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2">
					Number of free videos
					<input
						value={getEditModePacDetail.noOfFreeVideo}
						disabled={getEditMode}
						maxLength={6}
						max={6}
						min={0}
						onChange={(e) => {
							setFreeCourseVideo(e.target.value);
						}}
						type="number"
						className="shadow mt-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="price"
						placeholder="free videos"
					/>
				</label>
			</div>
			{/* <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Thumbnail
                </label>
                <input type='file' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Photo" placeholder='Package Thumbnail' />
            </div> */}

			<div className="mb-4">
				<label
					className="block text-gray-700 text-sm font-bold mb-2"
					htmlFor="name"
				>
					Price of package
				</label>
				<input
					value={getEditModePacDetail.price}
					disabled={getEditMode}
					onChange={(e) => {
						setPackagePrice(e.target.value);
					}}
					type="number"
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="price"
					placeholder="Package Price"
				/>
			</div>
			<div className="mb-4">
				<label
					className="block uppercase tracking-wide mt-2 text-gray-700 text-sm font-bold mb-2"
					htmlFor="grid-state"
				>
					Select Course
				</label>
				<div className="relative">
					<select
						onChange={onSelectCourse}
						value={getEditModePacDetail.courseId}
						disabled={getEditMode}
						className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					>
						<option value={""}>Please Select</option>
						{courseList.length &&
							courseList.map((res) => (
								<option value={res.courseId}>{res.courseName}</option>
							))}
					</select>
					<label
						className="block uppercase tracking-wide mt-2 text-gray-700 text-sm font-bold mb-2"
						htmlFor="grid-state"
					>
						Select Subject
					</label>
					<select
						onChange={onSelectSubject}
						className="block appearance-none w-full bg-gray-200 mt-2 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					>
						<option value={""}>Please Select</option>
						{SubjectList[0] &&
							SubjectList.map((res) => (
								<option value={res.Id}>{res.subjectName}</option>
							))}
					</select>
					<label
						className="block uppercase tracking-wide mt-2 text-gray-700 text-sm font-bold mb-2"
						htmlFor="grid-state"
					>
						Select Chapter
					</label>
					<select
						onChange={onSelectChapter}
						defaultValue={""}
						className="block appearance-none w-full bg-gray-200 mt-2 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					>
						<option value={""}>Please Select</option>
						{ChapterList[0] &&
							ChapterList.map((res) => (
								<option value={res.chapterId}>{res.chapterName}</option>
							))}
					</select>

					<label
						className="block uppercase tracking-wide mt-2 text-gray-700 text-sm font-bold mb-2"
						htmlFor="grid-state"
					>
						Select Topic
					</label>
					<select
						onChange={(e) => settopicId(e.target.value)}
						defaultValue={""}
						className="block appearance-none w-full bg-gray-200 mt-2 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					>
						<option value={""}>Please Select</option>
						{topicList[0] &&
							topicList.map((res) => (
								<option value={res.Id}>{res.topicName}</option>
							))}
					</select>
					<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
				</div>
			</div>
			<div className="w-full mx-auto">
				<div className="py-8">
					<div>
						<h2 className="text-2xl font-semibold leading-tight">
							Select Test
						</h2>
					</div>
					<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
						<div className="inline-block min-w-full shadow-md rounded-lg overflow-x-auto selectTestHeight">
							<table className="min-w-full leading-normal">
								<thead>
									<tr>
										<th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase"></th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
											Test Title
										</th>

										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-10">
											sectionName{" "}
										</th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-10">
											SectionTime{" "}
										</th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-10">
											positiveMarks{" "}
										</th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-10">
											negativeMarks{" "}
										</th>
										{/* <th className=" w-[900px] px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Questions
                                        </th> */}
									</tr>
								</thead>
								<tbody>
									{TetsList.map((res, i) =>
										res.courseCourseId == courseId ||
										res.chapterChapterId == chapterId ||
										res.subjectId == Subjectid ||
										res.topicId == topicId ? (
											<tr>
												<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
													<input
														onClick={() => {
															let da = [...data];
															let flag = false;
															da.map((e, v) => {
																if (e.TestId == res.TestId) {
																	flag = true;
																}
															});
															if (!flag) {
																setdata(data.concat(res));
															} else {
																let newData = da.filter((e, v) => {
																	if (e.TestId != res.TestId) {
																		return e;
																	}
																});
																setdata(newData);
															}
														}}
														checked={res?.isEditExist}
														type="checkbox"
													/>
												</td>
												<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
													<div className="flex">
														<div className="ml-3">
															<p className="text-gray-600 whitespace-no-wrap">
																{res.TestTitle}
															</p>
														</div>
													</div>
												</td>
												{/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        
                                                    </td> */}

												<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-[140px]">
													<>
														<table>
															<tbody>
																{res.Section &&
																	res.Section.length &&
																	res.Section.map((sec, secindex) => (
																		<tr>
																			<td>{sec.sectionName}</td>
																		</tr>
																	))}
															</tbody>
														</table>
													</>
												</td>
												<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-[140px]">
													<>
														<table>
															<tbody>
																{res.Section &&
																	res.Section.length &&
																	res.Section.map((sec, secindex) => (
																		<tr>
																			<td>{sec.SectionTime}</td>
																		</tr>
																	))}
															</tbody>
														</table>
													</>
												</td>
												<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-[140px]">
													<>
														<table>
															<tbody>
																{res.Section &&
																	res.Section.length &&
																	res.Section.map((sec, secindex) => (
																		<tr>
																			<td>{sec.positiveMarks}</td>
																		</tr>
																	))}
															</tbody>
														</table>
													</>
												</td>

												<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-[140px]">
													<>
														<table>
															<tbody>
																{res.Section &&
																	res.Section.length &&
																	res.Section.map((sec, secindex) => (
																		<tr>
																			<td>{sec.negativeMarks}</td>
																		</tr>
																	))}
															</tbody>
														</table>
													</>
												</td>
												{/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-[900px]">
                                                                { res.Section && res.Section.length && res.Section.map((sec, secindex) => (
                                                                sec.QuestionList[ 0 ] && sec.QuestionList.map((question, qindex) => (
                                                                    <>
                                                                        <li data-tip={ question.questionoption[ 0 ] &&
                                                                            question.questionoption.map(option => "<br>" + option.option + "</br>")
                                                                        } className="text-gray-700 list-decimal p-2 font-semibold whitespace-no-wrap">
                                                                            <p dangerouslySetInnerHTML={ { __html: question.question } }></p>
                                                                            <ReactTooltip data-type='info' arrowColor='#f9f9f9f' border={ true } backgroundColor='#f5f5f5'
                                                                                data-multiline={ true } place="top" type="light" html={ true } />
                                                                        </li>
                                                                    </>
                                                                )) 
                                                                ))
                                                                }
                                                            </td> */}
											</tr>
										) : null
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full mx-auto">
				<div className="py-8">
					<div>
						<h2 className="text-2xl font-semibold leading-tight">
							Select Video Test
						</h2>
					</div>
					<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
						<div className="inline-block min-w-full shadow-md rounded-lg overflow-x-auto selectTestHeight">
							<table className="min-w-full leading-normal">
								<thead>
									<tr>
										<th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase"></th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
											Video Title
										</th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-10">
											Video Description{" "}
										</th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-[300px]">
											Video
										</th>
									</tr>
								</thead>
								<tbody>
									{VideoList.map((res, i) => (
										<tr>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
												<input
													onClick={() => setdata(data.concat(res))}
													type="checkbox"
												/>
											</td>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
												<div className="flex">
													<div className="ml-3">
														<p className="text-gray-600 whitespace-no-wrap">
															{res.videoname}
														</p>
													</div>
												</div>
											</td>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
												<div className="flex">
													<div className="ml-3">
														<p className="text-gray-600 whitespace-no-wrap">
															{res.videodescription}
														</p>
													</div>
												</div>
											</td>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
												<div className="flex">
													<div className="ml-3">
														<video controls src={res.videoPath} />
													</div>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<ReactDragListView {...dragProps}>
				<ol>
					<div className="mx-auto">
						<div className="py-8">
							<div>
								<h2 className="text-2xl font-semibold leading-tight">
									Order Package and Submit
								</h2>
							</div>
							<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
								<div className="inline-block min-w-full shadow-md rounded-lg overflow-x-auto selectTestHeight">
									<table className="min-w-full leading-normal">
										<thead>
											<tr>
												<th className="pl-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
													S.no
												</th>
												<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
													drag
												</th>
												<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
													Test Title / Video Name
												</th>
												<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
													Course type / Video Descriptio
												</th>
												<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
												<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
											</tr>
										</thead>
										<tbody>
											{data.map(
												(item, index) => (
													console.log(
														"🚀 ~ file: Createpackage.js ~ line 366 ~ Createpackage ~ item",
														item
													),
													(
														<tr>
															<td className="pl-5 py-5 border-b border-gray-200 bg-white text-sm">
																<span>{index + 1}</span>
															</td>
															<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
																<a className="cursor-move" href="#">
																	<img width={20} height={20} src={dragicon} />
																</a>
															</td>
															<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
																<div className="flex">
																	<div className="ml-3">
																		<p className="text-gray-900 whitespace-no-wrap">
																			{item?.TestTitle
																				? item?.TestTitle
																				: item.videoname
																				? item.videoname
																				: item?.name}
																		</p>
																	</div>
																</div>
															</td>
															<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
																<p className="text-gray-900 font-semibold whitespace-no-wrap">
																	{item?.exam_type != undefined
																		? item.exam_type
																		: item.videodescription}
																</p>
																<p className="text-gray-600 whitespace-no-wrap">
																	{" "}
																</p>
															</td>
															<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
																{item.videoPath != undefined ? (
																	<video
																		className="text-gray-900 whitespace-no-wrap w-[300px]"
																		controls
																		src={item.videoPath}
																	/>
																) : null}
															</td>
															{/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <span
                                                            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                                        >
                                                            <span
                                                                aria-hidden
                                                                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                                            ></span>
                                                            <span className="relative">status</span>
                                                        </span>
                                                    </td> */}
															{/* <td
                                                        className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
                                                    >
                                                        <button
                                                            type="button"
                                                            className="inline-block text-gray-500 hover:text-gray-700"
                                                        >
                                                            <svg
                                                                className="inline-block h-6 w-6 fill-current"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </td> */}
														</tr>
													)
													// </li>
												)
											)}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</ol>
			</ReactDragListView>

			<div className="flex items-center justify-between">
				<button
					onClick={() => _SubmitPackage()}
					className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="button"
				>
					Submit
				</button>
			</div>

			<div></div>
		</div>
	);
};

export default Createpackage;
