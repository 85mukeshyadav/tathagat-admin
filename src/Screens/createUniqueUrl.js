import { IconCopy } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-dropdown/style.css";

const CreateUniqueUrl = (params) => {
	const [students, setStudents] = useState([]);
	const [packages, setPackages] = useState([]);
	const [tests, setTests] = useState([]);
	const [selectedStudent, setSelectedStudent] = useState("");
	const [selectedPackage, setSelectedPackage] = useState("");
	const [selectedTest, setSelectedTest] = useState("");
	const [uniqueUrl, setUniqueUrl] = useState("");
	const [copied, setCopied] = useState(false);

	const options = {
		headers: {
			"Content-type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("token"),
		},
	};

	const getAllStudents = async () => {
		params.setLoader(true);
		const res = await axios.get(
			process.env.REACT_APP_API + "/alluser?userType=student",
			options
		);
		if (res.status === 200) {
			console.log(res.data);
			setStudents(res.data);
		} else {
			console.log(res.data);
		}
		params.setLoader(false);
	};

	const getPackagesForStudent = async (userId) => {
		params.setLoader(true);
		const res = await axios.post(
			process.env.REACT_APP_API + "/mypackages",
			{
				userId,
			},
			options
		);
		if (res.status === 200) {
			console.log(res.data);
			setPackages(res.data.data);
		} else {
			console.log(res.data);
		}
		params.setLoader(false);
	};

	const getTestForPackage = async (packageId) => {
		params.setLoader(true);
		const res = await axios.get(
			process.env.REACT_APP_API +
				`/getPackageDetails/${packageId}?userId=${selectedStudent}`,
			options
		);
		if (res.status === 200) {
			console.log(res.data);
			setTests(res.data.testDetails);
		} else {
			console.log(res.data);
		}
		params.setLoader(false);
	};

	const encrypt = (str) => {
		let bufferObj = Buffer.from(str, "utf8");
		let base64String = bufferObj.toString("base64");
		return base64String;
	};

	const generateUniqueUrl = () => {
		const host = process.env.REACT_APP_CLIENT_HOST;
		const pkgid = encrypt(selectedPackage);
		const testid = encrypt(selectedTest);
		const userid = encrypt(selectedStudent);
		const url = `${host}/test/${pkgid}/${testid}/${userid}`;
		setUniqueUrl(url);
		console.log(url);
	};

	useEffect(() => {
		getAllStudents();
	}, []);

	return (
		<div className="flex flex-col px-4 py-4">
			<label
				className="block uppercase tracking-wide mt-2 text-gray-700 text-sm font-bold mb-2"
				htmlFor="grid-state"
			>
				Select Student
			</label>
			<select
				onChange={(e) => {
					console.log(e.target.value);
					setSelectedStudent(e.target.value);
					getPackagesForStudent(e.target.value);
				}}
				className="block appearance-none w-full bg-gray-200 mb-2 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
			>
				<option value="">Select Student</option>
				{students.map((student) => (
					<option value={student.email_Id}>{student.username}</option>
				))}
			</select>
			<label
				className="block uppercase tracking-wide mt-2 text-gray-700 text-sm font-bold mb-2"
				htmlFor="grid-state"
			>
				Select Package
			</label>
			<select
				id="package"
				onChange={(e) => {
					console.log(e.target.value);
					setSelectedPackage(e.target.value);
					getTestForPackage(e.target.value);
				}}
				className="block appearance-none w-full bg-gray-200 mb-2 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
			>
				<option value="">Select Package</option>
				{packages.map((pac) => (
					<option value={pac.packageId}>{pac.PackageName}</option>
				))}
			</select>
			<label
				className="block uppercase tracking-wide mt-2 text-gray-700 text-sm font-bold mb-2"
				htmlFor="grid-state"
			>
				Select Test
			</label>
			<select
				id="test"
				onChange={(e) => {
					console.log(e.target.value);
					setSelectedTest(e.target.value);
				}}
				className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
			>
				<option value="">Select Test</option>
				{tests.map((test) => (
					<option value={test.Test_Id}>{test.TestTitle}</option>
				))}
			</select>
			<div>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
					onClick={generateUniqueUrl}
				>
					GENERATE URL
				</button>
				{uniqueUrl && (
					<div className="flex items-center mt-4">
						<input
							className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							type="text"
							value={uniqueUrl}
							readOnly
						/>
						{!copied ? (
							<IconCopy
								className="ml-2 cursor-pointer hover:text-blue-500 hover:scale-110 transition-all duration-300 ease-in-out transform"
								onClick={() => {
									navigator.clipboard.writeText(uniqueUrl);
									setCopied(true);
								}}
							/>
						) : (
							<p className="ml-2">Copied to clipboard!</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default CreateUniqueUrl;
