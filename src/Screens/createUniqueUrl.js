import { IconCopy } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

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
		if (!selectedStudent || !selectedPackage || !selectedTest) {
			toast.error("Please select all fields", {
				position: "bottom-center",
				autoClose: 1000,
			});
			return;
		}
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
			<Select
				placeholder="Select Student"
				options={students.map((student) => ({
					value: student.email_Id,
					label: student.username,
				}))}
				onChange={(e) => {
					console.log(e.value);
					setSelectedStudent(e.value);
					getPackagesForStudent(e.value);
				}}
			/>
			<label
				className="block uppercase tracking-wide mt-2 text-gray-700 text-sm font-bold mb-2"
				htmlFor="grid-state"
			>
				Select Package
			</label>
			<Select
				placeholder="Select Package"
				options={packages.map((pac) => ({
					value: pac.packageId,
					label: pac.PackageName,
				}))}
				onChange={(e) => {
					console.log(e.value);
					setSelectedPackage(e.value);
					getTestForPackage(e.value);
				}}
			/>
			<label
				className="block uppercase tracking-wide mt-2 text-gray-700 text-sm font-bold mb-2"
				htmlFor="grid-state"
			>
				Select Test
			</label>
			<Select
				placeholder="Select Test"
				options={tests.map((test) => ({
					value: test.Test_Id,
					label: test.TestTitle,
				}))}
				onChange={(e) => {
					console.log(e.value);
					setSelectedTest(e.value);
				}}
			/>
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
