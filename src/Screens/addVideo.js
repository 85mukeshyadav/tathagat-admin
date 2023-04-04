//import liraries
import axios from 'axios';
import moment from 'moment';
import React, { Component, useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { ToastInfo, ToastUpdate, uploadToCloud, uploadVideoToCloud } from '../api/Client';
import CourseListContext from '../context/AllprojectsContext';

// create a component
let option1, option2, option3, option4 = null
let optionMedia1, optionMedia2, optionMedia3, optionMedia4, paragraphmedia = null
const AddVideos = () => {

    const [ isPara, setPara ] = useState('single')
    const { courseList, setcourseList } = useContext(CourseListContext)
    const [ video, setVideo ] = useState()
    const [ QuestionText, setQuestionText ] = useState(null)
    const [ Subjectid, setSubjectid ] = useState(null)
    const [ correctOption, setcorrectOption ] = useState(null)
    const [ courseId, setcourseId ] = useState(null)
    const [ chapterId, setchapterId ] = useState(null)
    const [ topicId, settopicId ] = useState(null)
    const [ VideoName, setVideoName ] = useState(null)
    const [ Videodesc, setVideodesc ] = useState(null)
    const [ SubjectList, setSubjectList ] = useState([])
    const [ ChapterList, setChapterList ] = useState([])
    const [ topicList, settopicList ] = useState([])
    const [ QuestionTextPara, setQuestionTextPara ] = useState()
    const [ Level, setLevel ] = useState(null)
    const [ data, setdata ] = useState([])


    const options = {
        headers: {
            'Content-type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
    };

    async function _SubmitVideo() {


        const data = {
            videodescription: Videodesc,
            videoname: VideoName,
            courseId: courseId,
            videoPath: video
        }
        let toastid = ToastInfo('adding Video in course ...')
        const res = await axios.post(process.env.REACT_APP_API + '/coursevideoupload', data, options)
        // console.log("🚀 ~ file: addquestion.js ~ line 52 ~ _SubmitQuestion ~ res", res.data)
        _getQues()
        if (res.status == 200) {
            ToastUpdate(toastid, 'addedd successfully');
            // window.location.reload(false);
            setVideo()
        }

    }

    const _getQues = async () => {
        const res = await axios.get(process.env.REACT_APP_API + '/getvideobycourse/' + courseId, options)
        console.log("🚀 ~ file: AddVideos.js ~ line 3278 ~ useEffect ~ res.data", res.data)
        if (res.status == 200) {
            setdata(res.data)
        }
    }

    const _getSubject = async () => {
        const res = await axios.get(process.env.REACT_APP_API + '/subject/' + courseId, options)
        if (res.status == 200) {
            setSubjectList(res.data)
        }
    }

    const _getchapter = async () => {
        const res = await axios.get(process.env.REACT_APP_API + '/chapter/' + Subjectid, options)
        if (res.status == 200) {
            setChapterList(res.data)
        }
    }

    const _gettopic = async () => {
        const res = await axios.get(process.env.REACT_APP_API + '/topic/' + chapterId, options)
        // console.log("🚀 ~ file: addquestion.js ~ line 79 ~ const_gettopic= ~ res", res.data)
        if (res.status == 200) {
            settopicList(res.data)
        }
    }



    useEffect(async () => {
        _getQues()

        // if (courseId != null) {
        //     _getSubject()
        // }
        // if (Subjectid != null) {
        //     _getchapter()
        // }
        // if (chapterId != null) {
        //     _gettopic()
        // }

    }, [ courseId ])



    const _uploadmedia = async (file, state) => {

        let toastId = ToastInfo('Uploading Video Please wait...')
        const resp = await uploadVideoToCloud(file, toastId);

        let data = resp.data
        let media = {
            mediaID: data.asset_id,
            MediaUrl: data.secure_url,
            mediaType: data?.format == undefined ? 'xlsx' : data?.format,
            MediaSize: data.bytes,
            Date: moment().format('DD-MM-YYYY')
        }
        setVideo(data.secure_url)
        ToastUpdate(toastId, 'Video uploaded Successfully, Submit the video now')
        console.log("🚀 ~ file: addVideo.js ~ line 146 ~ const_uploadmedia= ~ data.secure_url", data.secure_url)


    }

    return (

        <div className='m-10'>
            <ToastContainer />
            <div class="mb-4">
                <label class="block uppercase tracking-wide mt-2 text-gray-700 text-sm font-bold mb-2" for="grid-state">
                    Select Course
                </label>
                <div class="relative">
                    <select onChange={ (e) => setcourseId(e.target.value) } class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option>Course dropdown</option>
                        { courseList[ 0 ] && courseList.map((res) => (
                            <option value={ res.courseId }>{ res.courseName }</option>
                        )) }
                    </select>
                    {/* <label class="block uppercase tracking-wide mt-2 text-gray-700 text-sm font-bold mb-2" for="grid-state">
                        Select Subject
                    </label>
                    <select onChange={ (e) => setSubjectid(e.target.value) }
                        class="block appearance-none w-full bg-gray-200 mt-2 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option>Select dropdown</option>
                        { SubjectList[ 0 ] && SubjectList.map((res) => (
                            <option value={ res.Id }>{ res.subjectName }</option>
                        )) }
                    </select>
                    <label class="block uppercase tracking-wide mt-2 text-gray-700 text-sm font-bold mb-2" for="grid-state">
                        Select Chapter
                    </label>
                    <select onChange={ (e) => setchapterId(e.target.value) }
                        class="block appearance-none w-full bg-gray-200 mt-2 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option>Select dropdown</option>
                        { ChapterList[ 0 ] && ChapterList.map((res) => (
                            <option value={ res.chapterId }>{ res.chapterName }</option>
                        )) }
                    </select>

                    <label class="block uppercase tracking-wide mt-2 text-gray-700 text-sm font-bold mb-2" for="grid-state">
                        Select Topic
                    </label>
                    <select onChange={ (e) => settopicId(e.target.value) }
                        class="block appearance-none w-full bg-gray-200 mt-2 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option>Select dropdown</option>
                        { topicList[ 0 ] && topicList.map((res) => (
                            <option value={ res.Id }>{ res.topicName }</option>
                        )) }
                    </select> */}
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    </div>
                </div>
                <div class="my-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                        Name
                    </label>
                    <input required onChange={ (e) => setVideoName(e.target.value) } class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name" type="text" placeholder="Package Name" />
                </div>

                <div class="my-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                        Video Details
                        <textarea required onChange={ (e) => {
                            setVideodesc(e.target.value)
                        } } class="shadow form-textarea mt-1 block w-full border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            rows="5" placeholder="Package Details"></textarea>
                    </label>
                </div>

                <div class="flex items-center justify-center my-10 w-full">
                    <label
                        class="flex  cursor-pointer flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-white hover:border-gray-300">
                        <div class="flex flex-col items-center justify-center pt-7">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                Attach a file
                                <p id='uploading'>Uploading video </p>
                            </p>
                        </div>
                        <input onChange={ (e) => _uploadmedia(e.target.files[ 0 ]) } accept="video/*" type="file" class="opacity-0" />
                    </label>
                </div>

                <div class="flex items-center justify-between">
                    <button onClick={ () => _SubmitVideo() } class="bg-indigo-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Submit Video
                    </button>
                </div>






                <div class="container mx-auto">
                    <div class="py-8">
                        <div>
                            <h2 class="text-2xl font-semibold leading-tight">All Videos</h2>
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
                                                S.no
                                            </th>
                                            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >Name</th>
                                            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >Description</th>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                Video
                                            </th>
                                            {/* <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                more
                                            </th> */}

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((res, i) => (
                                                <tr key={ i }>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div class="flex">
                                                            <div class="ml-3">
                                                                <p class="text-gray-600 whitespace-no-wrap">{ i }</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 font-semibold whitespace-no-wrap">{ res.videoname }</p>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 font-semibold whitespace-no-wrap">{ res.videodescription }</p>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        {/* <p class="text-gray-900 font-semibold whitespace-no-wrap">{ res.videoPath }</p> */ }
                                                        <video width={ 300 } height={ 200 } src={ res.videoPath } controls />
                                                    </td>

                                                    {/* <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <span
                                                            class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                                        >

                                                        </span>
                                                    </td> */}
                                                    {/* <td
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
                                                    </td> */}
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



export default AddVideos;
