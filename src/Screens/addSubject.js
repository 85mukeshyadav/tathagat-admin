//import liraries
import axios from 'axios';
import React, { Component, useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastInfo, ToastUpdate, ToastUpdateErr } from '../api/Client';

// create a component
const AddSubject = () => {

    const [ isPara, setPara ] = useState(false)
    const [ subjectName, setsubjectName ] = useState()
    const [ subjectDesc, setsubjectDesc ] = useState()
    const [ SubjectList, setSubjectList ] = useState([])
    const [ CourseList, setCourseList ] = useState([])
    const toastid = useRef()

    const [ data, setdata ] = useState([])
    const courseiD = useRef(null)


    async function _SubmitQuestion() {

        const data = {
            subjectName: subjectName,
            subjectDesc: subjectDesc,
            courseId: courseiD.current
        }
        const options = {
            headers: {
                'Content-type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }
        };
        toastid.current = ToastInfo('Adding subject')
        try {
            const res = await axios.post(process.env.REACT_APP_API + '/subjectUpload', data, options)
            console.log("🚀 ~ file: addSubject.js ~ line 35 ~ _SubmitQuestion ~ res", res.data)
            if (res.status == 200) {
                _getSubjectList()
                ToastUpdate(toastid.current, "Subject added");
            }
        }
        catch (err) {
            ToastUpdateErr(toastid.current, "Error Something Went wrong" + err);
        }

    }

    const _getSubjectList = async () => {
        const ressubject = await axios.get(process.env.REACT_APP_API + '/subject')
        console.log("🚀 ~ file: AddCourse.js ~ line 32 ~ useEffect ~ res.data", ressubject.data)
        if (ressubject.status == 200) {
            // alert('success')
            setSubjectList(ressubject.data)
        }
    } 
    useEffect(async () => {
        const res = await axios.get(process.env.REACT_APP_API + '/course')
        console.log("🚀 ~ file: AddCourse.js ~ line 32 ~ useEffect ~ res.data", res.data)
        if (res.status == 200) {
            // alert('success')
            setCourseList(res.data)
        }

        try {
            _getSubjectList()           
        }
        catch (err) {
            toast.error(err)
        }
    }, [])

    return (

        <div className='m-10'>
            <div class="mb-4">
                <ToastContainer />
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                    Select Course
                </label>
                <select onChange={ (e) => courseiD.current = e.target.value }
                    class="block appearance-none mt-5 w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option>Course dropdown</option>
                    { CourseList[ 0 ] && CourseList.map((res) => (
                        <option key={ res?.courseId } value={ res?.courseId } >{ res.courseName }</option>
                    )) }
                </select>
            </div>


            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                    Subject Name
                </label>
                <input onChange={ (e) => setsubjectName(e.target.value) } class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="English / Hindi / Maths" />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                    Subject Details
                    <textarea onChange={ (e) => setsubjectDesc(e.target.value) }
                        class="shadow form-textarea mt-1 block w-full border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="5" placeholder="Textarea"></textarea>
                </label>
            </div>
            <div class="flex items-center justify-between">
                <button onClick={ () => _SubmitQuestion() } class="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Submit
                </button>
            </div>

            <div class="container mx-auto">
                <div class="py-8">
                    <div>
                        <h2 class="text-2xl font-semibold leading-tight">All Subjects</h2>
                    </div>
                    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div
                            class="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                        >
                            <table class="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >
                                            Subject Title
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >
                                            Subject Description
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >

                                        </th>

                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        SubjectList.map((res, i) => (
                                            <tr>
                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div class="flex">
                                                        {/* <div class="flex-shrink-0 w-10 h-10">
                                                <img
                                                    class="w-full h-full rounded-full"
                                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                    alt=""
                                                />
                                            </div> */}
                                                        <div class="ml-3">
                                                            <p class="text-gray-900 whitespace-no-wrap">
                                                                { res.subjectName }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p style={ { whiteSpace: 'pre-line' } } class="text-gray-900 font-semibold whitespace-no-wrap">{ res.subjectDesc }</p>
                                                </td>
                                                <td
                                                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
                                                >
                                                    <button
                                                        type="button"
                                                        class="inline-block text-gray-500 hover:text-gray-700"
                                                    >
                                                        <svg
                                                            class="inline-block h-6 w-6 fill-current"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                                                            />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        )) }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};



export default AddSubject;
