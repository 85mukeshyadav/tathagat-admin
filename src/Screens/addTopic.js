//import liraries
import axios from 'axios';
import React, { Component, useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// create a component
const AddTopic = () => {

    const [ isPara, setPara ] = useState(false)
    const [ topicName, settopicName ] = useState()
    const [ TopicDesc, setTopicDesc ] = useState()
    const [ topicList, settopicList ] = useState([])
    const [ ChapterList, setChapterList ] = useState([])

    const chapterId = useRef(null)


    async function _SubmitQuestion() {

        const data = {
            topicName: topicName,
            topicDesc: TopicDesc,
            chapterId: chapterId.current
        }
        const options = {
            headers: {
                'Content-type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }
        };
        try {
            const res = await axios.post(process.env.REACT_APP_API + '/topicupload', data, options)
            console.log("🚀 ~ file: addSubject.js ~ line 35 ~ _SubmitQuestion ~ res", res.data)
            if (res.status == 200) {
                window.location.reload();
                toast.success('Topic addedd successfully', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
        catch (err) {
            toast.error('Error :' + err, {
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
    useEffect(async () => {
        const ressubject = await axios.get(process.env.REACT_APP_API + '/chapter')
        console.log("🚀 ~ file: AddCourse.js ~ line 32 ~ useEffect ~ res.data", ressubject.data)
        if (ressubject.status == 200) {
            // alert('success')
            setChapterList(ressubject.data)
        }

        try {

            const ressubject = await axios.get(process.env.REACT_APP_API + '/topic')
            console.log("🚀 ~ file: AddCourse.js ~ line 32 ~ useEffect ~ res.data", ressubject.data)
            if (ressubject.status == 200) {
                // alert('success')
                settopicList(ressubject.data)
            }
        }
        catch (err) {

        }
    }, [])

    return (

        <div className='m-10'>
            <div class="mb-4">
                <ToastContainer />
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                    Select Module Name
                </label>
                <select onChange={ (e) => { console.log("id", e.target.value); chapterId.current = e.target.value } }
                    class="block appearance-none mt-5 w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option>Module dropdown</option>
                    { ChapterList[ 0 ] && ChapterList.map((res) => (
                        <option key={ res?.Id } value={ res.chapterId } label={ res.chapterName } >{ res.chapterName }</option>
                    )) }
                </select>
            </div>


            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                    Topic Name
                </label>
                <input onChange={ (e) => settopicName(e.target.value) } class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="English / Hindi / Maths" />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                    Topic Details
                    <textarea onChange={ (e) => setTopicDesc(e.target.value) }
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
                        <h2 class="text-2xl font-semibold leading-tight">All Topic</h2>
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
                                            Topic Title
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >
                                            Topic Description
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
                                        topicList.map((res, i) => (
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
                                                                { res.topicName }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p class="text-gray-900 font-semibold whitespace-no-wrap">{ res.topicDesc }</p>
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



export default AddTopic;
