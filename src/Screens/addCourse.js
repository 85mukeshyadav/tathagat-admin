//import liraries
import axios from 'axios';
import moment from 'moment';
import React, { Component, useContext, useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { options, ToastInfo, ToastUpdate, uploadToCloud } from '../api/Client';
import CourseListContext from '../context/AllprojectsContext';

// create a component
const AddCourse = () => {

    // const [ CourseList, setCourseList ] = useState([])
    const { courseList, setcourseList } = useContext(CourseListContext)
    const [ CourseName, setCourseName ] = useState()
    const [ CourseDesc, setCourseDesc ] = useState()
    const [ CourseThumb, setCourseThumb ] = useState()
    console.log("🚀 ~ file: addCourse.js ~ line 17 ~ AddCourse ~ CourseThumb", CourseThumb)
    const toastid = useRef()

    async function _SubmitQuestion() {

        const data = {
            courseName: CourseName,
            courseDesc: CourseDesc,
            thumbnail: CourseThumb
        }

        toastid.current = ToastInfo('Adding course')
        try {

            const res = await axios.post(process.env.REACT_APP_API + '/courseUpload', data, options)
            console.log("🚀 ~ file: addCourse.js ~ line 22 ~ _SubmitQuestion ~ res", res.data)
            if (res.status == 200) {
                ToastUpdate(toastid.current, 'Course added Successfully')
                setCourseDesc()
                setCourseName()
                setCourseThumb()
                _getCourse()

            }
        }
        catch (err) {
            ToastUpdate(toastid.current, 'Something went wrong' + err, 'ERROR')
        }
        finally {

        }

    }
    const _getCourse = async () => {
        const res = await axios.get(process.env.REACT_APP_API + '/course', options)
        console.log("🚀 ~ file: AddCourse.js ~ line 32 ~ useEffect ~ res.data", res.data)
        if (res.status == 200) {
            // alert('success')
            setcourseList(res.data)
        }
    }
    useEffect(() => {
        _getCourse()
    }, [])

    const _uploadmedia = async (file) => {

        let toastid = ToastInfo('Uploading Image')
        if (file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif') {
            const resp = await uploadToCloud(file);
            let data = resp.data
            setCourseThumb(data.secure_url)
            ToastUpdate(toastid, 'Image Uploaded Successfully')
        }
        else {
            toast.error('Please choose image with JPG,JPEG,PNG,GIF format only ')
            setCourseThumb()
        }
    }
    return (

        <div className='m-10'>
            <ToastContainer />
            <div class="mb-4 bg-gray-100 p-4 rounded-md">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                    Course Name
                </label>
                <input defaultValue={ CourseName } onChange={ (e) => setCourseName(e.target.value) }
                    class="appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline" id="name" type="text" placeholder="Text input" />
            </div>

            <div class="mb-4 bg-gray-100 p-4 rounded-md">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                    Course Details
                    <textarea onChange={ (e) => setCourseDesc(e.target.value) }
                        class="form-textarea mt-1 block w-full  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="5" placeholder="Textarea">{ CourseDesc }</textarea>
                </label>
            </div>
            <div class="mb-4 bg-gray-100 p-4 rounded-md">
                <label class="block text-gray-500 text-sm font-bold mb-2" for="name">
                    Course Thumbnail
                </label>
                <div class="m-4">
                    <div class="flex items-center justify-center w-full">
                        <label
                            class="flex  cursor-pointer flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-white hover:border-gray-300">
                            <div class="flex flex-col items-center justify-center pt-7">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                    Attach a file</p>
                            </div>
                            <input onChange={ (e) => _uploadmedia(e.target.files[ 0 ]) } accept="image/*" type="file" class="opacity-0" />
                        </label>
                    </div>
                    { CourseThumb == null || CourseThumb == "" || CourseThumb == undefined ? null :
                        <img src={ CourseThumb } />
                    }
                </div>
            </div>



            <div class="flex items-center justify-between">
                <button onClick={ () => _SubmitQuestion() } class="bg-indigo-500 w-full hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Submit course
                </button>
            </div>

            <div>

                <div class="container mx-auto">
                    <div class="py-8">
                        <div>
                            <h2 class="text-2xl font-semibold leading-tight">All Courses</h2>
                        </div>
                        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div
                                class="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                            >
                                <table class="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                Thumbnail and Course Title
                                            </th>
                                            <th style={ { maxWidth: '40vw' } } class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                Course Description
                                            </th>
                                            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                More
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            courseList.map((res, i) => (
                                                <tr key={ i }>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div class="flex items-center">
                                                            <div class="flex-shrink-0 w-20 h-20">
                                                                <img class="w-full h-full rounded-lg"
                                                                    src={ res.thumbnail } alt="thumbnail" />
                                                            </div>
                                                            <div class="ml-3">
                                                                <p class="text-gray-900 whitespace-no-wrap">
                                                                    { res.courseName }
                                                                </p>
                                                                {/* <p class="text-gray-600 whitespace-no-wrap">{ 'Course' + i }</p> */ }
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style={ { maxWidth: '40vw' } } class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p style={ { whiteSpace: 'pre-line' } } class="text-gray-900 break-words font-semibold whitespace-no-wrap">{ res.courseDesc }</p>
                                                    </td>
                                                    <td class="px-2 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                                        <button type="button" class="inline-block text-gray-500 hover:text-gray-700">
                                                            <svg class="inline-block h-6 w-6 fill-current" viewBox="0 0 24 24"     >
                                                                <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
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

        </div >

    );
};



export default AddCourse;
