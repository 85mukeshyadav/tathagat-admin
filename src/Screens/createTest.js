//import liraries
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
// import ReactDragListView from "react-drag-listview";
import { toast, ToastContainer } from "react-toastify";
import CourseListContext from "../context/AllprojectsContext";
// import dragicon from "../resources/drag.svg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// create a component

var selectedQuestionList = [];
const CreateTest = (params) => {
	const options = {
		headers: {
			"Content-type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("token"),
		},
	};

	const [isPara, setPara] = useState(false);
	const [TestName, setTestName] = useState(null);
	const [SubjectList, setSubjectList] = useState([
		{ id: 0, name: "Subject 1" },
		{ id: 1, name: "Subject 2" },
		{ id: 2, name: "Subject 3" },
	]);
	const [CourseList, setCourseList] = useState([]);
	const [Options, setOptions] = useState([]);
	let option1,
		option2,
		option3,
		option4 = null;
	const { courseList, setcourseList } = useContext(CourseListContext);
	const [isvideo, setVideo] = useState(false);
	const [Subjectid, setSubjectid] = useState("");
	const [courseId, setcourseId] = useState("");
	const [chapterId, setchapterId] = useState("");
	const [totalTime, settotalTime] = useState(null);
	const [rule, setrule] = useState(null);
	const [topicId, settopicId] = useState("");
	const [ChapterList, setChapterList] = useState([]);
	const [topicList, settopicList] = useState([]);
	const [TestNamePara, setTestNamePara] = useState();
	const [QuestionList, setQuestionList] = useState([]);
	const [data, setdata] = useState([]);
	const [CreateSection, setCreateSection] = useState([
		{
			sectionId: Date.now(),
			sectionName: "",
			SectionTime: 0,
			positiveMarks: 0,
			negativeMarks: 0,
			QuestionList: [],
			disable: false,
			questionAttempt: 0,
		},
	]);
	const [selectedSection, setselectedSection] = useState(0);
	const [examTypeList, setExamTypeList] = useState([]);
	const [examTypeFlag, setExamTypeFlag] = useState(null);
	const [examLevelFlag, setExamLevelFlag] = useState(null);

	const [addMoreSectionFlag, setAddMoreSectionFlag] = useState(false);
	const [testInstructions, setTestInstructions] = useState(null);

	async function _SubmitTest() {
		const datas = {
			TestTitle: TestName,
			instructions: testInstructions,
			subjectId: Subjectid,
			topicId: topicId,
			chapterId: chapterId,
			totaltime: totalTime,
			rule: rule,
			courseId: courseId,
			exam_type: TestNamePara,
			examLevel: examLevelFlag,
			Section: CreateSection,
		};

		if (examLevelFlag == 1 || examLevelFlag == 2) {
			datas["chapterId"] = undefined;
			datas["topicId"] = undefined;
		}
		if (examLevelFlag == 3) {
			datas["topicId"] = undefined;
		}

		console.log(
			"🚀 ~ file: createTest.js ~ line 63 ~ _SubmitTest ~ data",
			datas
		);

		try {
			const res = await axios.post(
				process.env.REACT_APP_API + "/createtest",
				datas,
				options
			);
			console.log(
				"🚀 ~ file: addSubject.js ~ line 35 ~ _SubmitQuestion ~ res",
				res.data
			);
			if (res.status == 200) {
				toast.success("Test created successfully", {
					position: "top-right",
					autoClose: 1000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
		} catch (err) {
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

	const _getQues = async () => {
		setQuestionList([]);
		if (Subjectid || chapterId || topicId) {
			params.setLoader(true);
			let reqParam = {};
			reqParam["subjectid"] = Subjectid || undefined;
			reqParam["chapterid"] = chapterId || undefined;
			reqParam["topicid"] = topicId || undefined;
			const res = await axios.get(process.env.REACT_APP_API + "/question", {
				params: reqParam,
			});

			if (res.status == 200) {
				let finalRes = res.data.map((data, index) => {
					CreateSection[selectedSection].QuestionList.map((res, i) => {
						if (res.questionId == data.questionId) {
							data["checked"] = true;
						}
					});
					if (typeof data["explantation"] == "object") {
						data["solution"] = data["explantation"]?.q;
					} else {
						data["solution"] = data["explantation"];
					}
					return data;
				});
				console.log(
					"🚀 ~ file: Admin.js ~ line 32 ~ useEffect ~ res.data",
					finalRes
				);
				setQuestionList(finalRes);
			}

			params.setLoader(false);
		}
	};

	const _getExamType = async (courseId) => {
		params.setLoader(true);
		const res = await axios.get(
			process.env.REACT_APP_API + "/test-type",
			options
		);
		if (res.status == 200) {
			setExamTypeList(res.data);
			console.log("zzzzzzz", res.data);
		}
		params.setLoader(false);
	};

	const _getSubject = async (courseId) => {
		params.setLoader(true);
		const res = await axios.get(
			process.env.REACT_APP_API + "/subject/" + courseId,
			options
		);
		if (res.status == 200) {
			setSubjectList(res.data);
		}
		params.setLoader(false);
	};

	const _getchapter = async (Subjectid) => {
		params.setLoader(true);
		const res = await axios.get(
			process.env.REACT_APP_API + "/chapter/" + Subjectid,
			options
		);
		if (res.status == 200) {
			setChapterList(res.data);
		}
		params.setLoader(false);
	};

	const _gettopic = async (chapterId) => {
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
	};

	useEffect(() => {
		_getExamType();
	}, []);

	useEffect(async () => {
		_getQues();
	}, [courseId, topicId, Subjectid, chapterId, selectedSection]);

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

	const _UpdateTestSection = () => {};

	const _radioSection = (ind) => {
		console.log("this test", CreateSection, ind);
		setselectedSection(ind);
		let CreateNewSection = CreateSection.map((res, i) => {
			if (i == ind) {
				res.disable = false;
			} else {
				res.disable = true;
			}
			return res;
		});
		setCreateSection(CreateNewSection);
		selectedQuestionList = [];

		selectedQuestionList = CreateSection[ind].QuestionList.filter((qes) => {
			return qes;
		});

		// let newQues = CreateSection[selectedSection].QuestionList.filter((qes) => {
		//     if(res.questionId != qes.questionId){
		//         return qes;
		//     }
		// })

		// selectedQuestionList = selectedQuestionList.filter((qes) => {
		//     if(res.questionId != qes.questionId){
		//         return qes;
		//     }
		// })

		// CreateSection[selectedSection].QuestionList = newQues;
		// setCreateSection(CreateSection)
	};

	const addMoreSection = () => {
		if (CreateSection.length < 5) {
			selectedQuestionList = [];
			let CreateNewSection = CreateSection.map((res, i) => {
				res.disable = true;
				return res;
			});
			setCreateSection(CreateNewSection);

			const newSec = {
				sectionId: Date.now(),
				sectionName: "",
				SectionTime: 0,
				positiveMarks: 0,
				negativeMarks: 0,
				QuestionList: [],
				questionAttempt: 0,
				disable: false,
			};
			setCreateSection([...CreateNewSection, ...[newSec]]);
			setselectedSection(CreateSection.length);
		} else {
			return;
		}
	};

	// useEffect(()=>{
	//     setselectedSection(CreateSection.length - 1);
	//     console.log("",selectedSection);
	// },[selectedSection])

	const checkIfSeected = (ques, allCheckedQues) => {
		let flag = true;
		CreateSection[selectedSection].QuestionList.map((res, i) => {
			if (res.questionId == ques.questionId && res.checked) {
				flag = true;
			}
		});
		return flag;
	};

	useEffect(() => {
		if (examTypeFlag != null) {
			if (examTypeFlag == "1") {
				setAddMoreSectionFlag(true);
			} else {
				setAddMoreSectionFlag(false);
				let sec = [CreateSection[0]];
				setCreateSection(sec);
			}
		}
	}, [examTypeFlag]);

	return (
		<div className="m-10">
			<ToastContainer />

			<div className="mb-4">
				<label
					className="block text-gray-700 text-sm font-bold mb-2"
					htmlFor="name"
				>
					Name
				</label>
				<input
					onChange={(e) => setTestName(e.target.value)}
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="name"
					type="text"
					placeholder="Test Name"
				/>
			</div>
			<div className="mb-4">
				<label
					className="block text-gray-700 text-sm font-bold mb-2"
					htmlFor="name"
				>
					Exam Type
				</label>
				<select
					onChange={(e) => {
						setTestNamePara(e.target.value);
						examTypeList.map((res) => {
							if (res.id == e.target.value) {
								setExamTypeFlag(res.isMultiSection);
								setExamLevelFlag(res.level);
							}
						});
					}}
					className="block appearance-none w-full bg-gray-200 mt-2 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
				>
					<option value={""}>Select dropdown</option>
					{examTypeList[0] &&
						examTypeList.map((res) => (
							<option value={res.id}>{res.type_name}</option>
						))}
				</select>
			</div>

			{/* <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Details
                    <textarea className="shadow form-textarea mt-1 block w-full border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="5" placeholder="Test Details"></textarea>
                </label>
            </div> */}

			<div className="mb-4">
				<label
					className="block text-gray-700 text-sm font-bold mb-2"
					htmlFor="name"
				>
					Name
				</label>
				<div className="flex flex-row justify-between flex-wrap items-center">
					{CreateSection.map((res, index) => (
						<div className="flex mb-2">
							<input
								onClick={() => _radioSection(index)}
								type="radio"
								name="section"
								className={`mr-2 sec-${index}`}
							/>
							<input
								onChange={(e) => {
									CreateSection[index].sectionName = e.target.value;
									setCreateSection(CreateSection);
								}}
								disabled={CreateSection[index].disable}
								className={`sec-${index} shadow appearance-none border mr-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
								id="name"
								type="text"
								placeholder={res.sectionName ? res.sectionName : "Section Name"}
							/>
							<input
								onChange={(e) => {
									CreateSection[index].SectionTime = parseInt(e.target.value);
									setCreateSection(CreateSection);
								}}
								disabled={CreateSection[index].disable}
								className={`sec-${index} shadow appearance-none border mr-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
								id="name"
								type="text"
								placeholder={res.SectionTime ? res.SectionTime : "0 Min"}
							/>
							<input
								onChange={(e) => {
									CreateSection[index].negativeMarks = e.target.value;
									setCreateSection(CreateSection);
								}}
								disabled={CreateSection[index].disable}
								className={`sec-${index} shadow appearance-none border mr-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
								id="name"
								type="text"
								placeholder={
									res.negativeMarks ? res.negativeMarks : "-ve Marks -1"
								}
							/>
							<input
								onChange={(e) => {
									CreateSection[index].positiveMarks = e.target.value;
									setCreateSection(CreateSection);
								}}
								disabled={CreateSection[index].disable}
								className={`sec-${index} shadow appearance-none border mr-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
								id="name"
								type="text"
								placeholder={
									res.positiveMarks ? res.positiveMarks : "+ve Marks 3"
								}
							/>
							<input
								onChange={(e) => {
									CreateSection[index].questionAttempt = parseInt(
										e.target.value
									);
									setCreateSection(CreateSection);
								}}
								disabled={CreateSection[index].disable}
								className={`sec-${index} shadow appearance-none border mr-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
								id="name"
								type="text"
								placeholder={
									res.questionAttempt
										? res.questionAttempt
										: "Ques need to attempt"
								}
							/>
						</div>
					))}
					<button
						onClick={() => addMoreSection()}
						style={{ display: addMoreSectionFlag ? "block" : "none" }}
						className="rounded-lg"
					>
						+ Add More Section
					</button>
				</div>
			</div>

			{/* {CreateSection.map((secVal, Secindex) => (
            <>
            { ((secVal.disable) ? null:
            <div  > */}
			<div className="mb-4">
				<label
					className="block uppercase tracking-wide mt-2 text-gray-700 text-sm font-bold mb-2"
					htmlFor="grid-state"
				>
					Allow Switching Section
				</label>
				<label className="inline-flex items-center mr-4">
					<input
						type="radio"
						name="sectionSwitch"
						onChange={() => setrule(true)}
					/>
					<span className="ml-2">True</span>
				</label>
				<label className="inline-flex items-center">
					<input
						type="radio"
						name="sectionSwitch"
						onChange={() => setrule(false)}
					/>
					<span className="ml-2">false</span>
				</label>
				<br />
				<label
					className="block uppercase tracking-wide mt-2 text-gray-700 text-sm font-bold mb-2 mt-4"
					htmlFor="grid-state"
				>
					Add Test Instructions
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
								// { indent: "-1" },
								// { indent: "+1" },
							],
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
							// "link",
							// "image",
							// "video",
						],
					}}
					style={{ height: "200px" }}
					onChange={(e) => setTestInstructions(e)}
				/>
				<br />
				<br />
				<label
					className="block uppercase tracking-wide mt-2 text-gray-700 text-sm font-bold mb-2"
					htmlFor="grid-state"
				>
					Select Course
				</label>
				<div className="relative">
					<select
						onChange={onSelectCourse}
						className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					>
						<option value={""}>Select dropdown</option>
						{courseList[0] &&
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
						defaultValue={""}
						className="block appearance-none w-full bg-gray-200 mt-2 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					>
						<option value={""}>Select dropdown</option>
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
						<option value={""}>Select dropdown</option>
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
						className="block appearance-none w-full bg-gray-200 mt-2 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					>
						<option value={""}>Select dropdown</option>
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
						<h2 className="text-xl font-semibold leading-tight">
							Add Question in Test
						</h2>
					</div>
					<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
						<div className="inline-block min-w-full shadow-md rounded-lg overflow-x-auto selectTestHeight">
							<table className="min-w-full leading-normal">
								<thead>
									<tr>
										<th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase"></th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
											Question and options
										</th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
											correctOption
										</th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
											type
										</th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
											Level
										</th>
									</tr>
								</thead>
								<tbody>
									{QuestionList.map((res, i) =>
										//  console.log("🚀 ~ file: createTest.js ~ line 267 ~ CreateTest ~ res", res),
										res.courseCourseId == courseId ||
										res.chapterChapterId == chapterId ||
										res.subjectId == Subjectid ||
										res.topicId == topicId ? (
											<tr>
												<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
													<input
														onClick={() => {
															console.log("1", res);
															if (
																res["checked"] == undefined ||
																res["checked"] == null
															) {
																console.log("2", res);
																res["checked"] = true;
															} else {
																console.log("3", res);
																res["checked"] = !res["checked"];
															}
															if (res["checked"]) {
																selectedQuestionList.push(res);
																console.log("4", selectedQuestionList);
																console.log("5", selectedSection);
																CreateSection[selectedSection].QuestionList =
																	selectedQuestionList;
																setCreateSection(CreateSection);
															} else {
																let newQues = CreateSection[
																	selectedSection
																].QuestionList.filter((qes) => {
																	if (res.questionId != qes.questionId) {
																		return qes;
																	}
																});

																selectedQuestionList =
																	selectedQuestionList.filter((qes) => {
																		if (res.questionId != qes.questionId) {
																			return qes;
																		}
																	});

																CreateSection[selectedSection].QuestionList =
																	newQues;
																setCreateSection(CreateSection);
															}
														}}
														type="checkbox"
														defaultChecked={res["checked"]}
													/>
												</td>
												<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
													<div className="ml-3">
														<h4
															dangerouslySetInnerHTML={{
																__html: res.question,
															}}
															className="font-bold text-gray-600 whitespace-no-wrap"
														></h4>
														{/* { res.questionoption.map((ans) => (
                                                                <li dangerouslySetInnerHTML={{__html:ans.option}} className="text-gray-600 whitespace-no-wrap"></li>
                                                            )) } */}
													</div>
												</td>
												<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
													<p
														dangerouslySetInnerHTML={{ __html: res.TestName }}
														className="text-gray-900 font-semibold whitespace-no-wrap"
													></p>
													<p
														dangerouslySetInnerHTML={{
															__html: res.correctOption,
														}}
														className="text-gray-600 whitespace-no-wrap"
													></p>
												</td>
												<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
													<p
														dangerouslySetInnerHTML={{
															__html: res.questionType,
														}}
														className="text-gray-900 whitespace-no-wrap"
													></p>
													<p className="text-gray-600 whitespace-no-wrap"></p>
												</td>
												<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
													<span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
														<span
															aria-hidden
															className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
														></span>
														<span className="relative">
															{res.questionLevel}
														</span>
													</span>
												</td>
											</tr>
										) : null
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			{/* </div>
            )}
            </>
            ))} */}
			<div className="flex items-center justify-between">
				<button
					onClick={() => _SubmitTest()}
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

export default CreateTest;
