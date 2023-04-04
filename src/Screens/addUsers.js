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
const AddUsers = () => {



    const [ logindetails, setlogindetails ] = useState({
        firstName: "", lastName: "", email_Id: "",
        mobileNumber: "", password: "", role: "",
    })
    // console.log("🚀 ~ file: addUsers.js ~ line 17 ~ AddUsers ~ logindetails", logindetails)
    const [ data, setdata ] = useState([])


    const options = {
        headers: {
            'Content-type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
    };

    async function _createUsers() {


        let toastid = ToastInfo('adding user ...')
        const res = await axios.post(process.env.REACT_APP_API + '/register', logindetails, options)
        // console.log("🚀 ~ file: addquestion.js ~ line 52 ~ _SubmitQuestion ~ res", res.data)
        _getQues()
        if (res.status == 200) {
            ToastUpdate(toastid, 'addedd successfully');
            window.location.reload(false);
        }

    }

    const _getQues = async () => {
        const res = await axios.get(process.env.REACT_APP_API + '/alluser', options)
        console.log("🚀 ~ file: AddUsers.js ~ line 3278 ~ useEffect ~ res.data", res.data)
        if (res.status == 200) {
            setdata(res.data)
        }
    }




    useEffect(async () => {
        _getQues()
    }, [])




    return (

        <div className='m-10'>
            <ToastContainer />
            <div class="mb-4">
                <label class="block uppercase tracking-wide mt-2 text-gray-700 text-sm font-bold mb-2" for="grid-state">
                    CREATE NEW USER
                </label>
                <div class="mb-4">
                    <label class="block uppercase tracking-wide mt-2 text-gray-700 text-sm font-bold mb-2" for="grid-state">
                        User name
                    </label>
                    <input onChange={ (e) => { setlogindetails(prevState => ({ ...prevState, [ 'firstName' ]: e.target.value })) } }
                        type='text' class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="price" placeholder='Name' required />
                    <label class="block uppercase tracking-wide mt-2 text-gray-700 text-sm font-bold mb-2" for="grid-state">
                        Email Id
                    </label>
                    <input onChange={ (e) => {
                        setlogindetails(prevState => ({ ...prevState, [ 'email_Id' ]: e.target.value }))
                    } }
                        type='email' class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="price" placeholder='email id' required />
                    <label class="block uppercase tracking-wide mt-2 text-gray-700 text-sm font-bold mb-2" for="grid-state">
                        Password
                    </label>
                    <input onChange={ (e) => { setlogindetails(prevState => ({ ...prevState, [ 'password' ]: e.target.value })) } }
                        type='text' class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="price" placeholder='Password' required />
                    <label class="block uppercase tracking-wide mt-2 text-gray-700 text-sm font-bold mb-2" for="grid-state">
                        Mobile Number
                    </label>
                    <input onChange={ (e) => { setlogindetails(prevState => ({ ...prevState, [ 'mobileNumber' ]: e.target.value })) } }
                        type='tel' class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="price" placeholder='mobile Number' required />
                    <label class="block uppercase tracking-wide mt-2 text-gray-700 text-sm font-bold mb-2" for="grid-state">
                        user Role
                    </label>
                    <select onChange={ (e) => setlogindetails(prevState => ({ ...prevState, [ 'role' ]: e.target.value })) }
                        class="block appearance-none w-full bg-gray-200 mt-2 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option label='Select Role' value='' />
                        { [ 'student', 'admin', 'creator', 'uploader', 'accountant' ].map(res => (
                            <option label={ res } value={ res } />
                        )) }
                    </select>
                </div>

                <div class="flex items-center justify-center my-10 w-full">

                </div>

                <div class="flex items-center justify-between">
                    <button onClick={ () => _createUsers() } class="bg-indigo-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Create New User
                    </button>
                </div>






                <div class="">
                    <div class="py-8">
                        <div>
                            <h2 class="text-2xl font-semibold leading-tight">All Users</h2>
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
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                User Name
                                            </th>

                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >Email</th>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((res, i) => (
                                                <tr key={ i }>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div class="flex">
                                                            <div class="ml-3">
                                                                <p class="text-gray-900 whitespace-no-wrap">
                                                                    {/* { res.Subjectid } */ }
                                                                </p>
                                                                <p class="text-gray-600 whitespace-no-wrap">{ i }</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 font-semibold whitespace-no-wrap">{ res.username }</p>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 font-semibold whitespace-no-wrap">{ res.email_Id }</p>
                                                    </td>

                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <span
                                                            class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                                        >
                                                            <span
                                                                aria-hidden
                                                                class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                                            >
                                                            </span>
                                                            <span class="relative">{ res.user_type }</span>
                                                        </span>
                                                    </td>
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



export default AddUsers;
