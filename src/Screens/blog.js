import React, { useState } from 'react'
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { options } from '../api/Client';

function AddBlog() {

    const [ blog, setblogs ] = useState({
        'title': '',
        'shortDesc': '',
        'body': ''
    })
    console.log("🚀 ~ file: blog.js ~ line 10 ~ AddBlog ~ blog", blog)


    const submitBlog = async () => {
        const res = await axios.post(process.env.REACT_APP_API + '/publishblog', blog, options)
        if (res.status == 200) {
            alert('BLog updated')
        }
    }

    return <div className='flex flex-col h-full'>
        <div className='flex flex-col mx-20 mt-8'>
            <label className="text-gray-400 mt-4">Blog Title <sup class='text-red-500 font-bold'>*</sup></label>
            <input onChange={ (e) => setblogs(prev => ({ ...prev, 'title': e.target.value })) } maxLength={ 80 } className='my-2 bg-indigo-100 rounded-lg p-4 text-gray-500 mt-1' type='text' placeholder='Max length 80 charecters' />
            <label className="text-gray-400 mt-4">Short Description</label>
            <input onChange={ (e) => setblogs(prev => ({ ...prev, 'shortDesc': e.target.value })) } maxLength={ 120 } className='my-2 bg-indigo-100 rounded-lg p-4 text-gray-500 mt-1' type='text' placeholder='Max length 120 charecters' />
            <label className="text-gray-400 my-4">Body</label>
            <ReactQuill modules={ {
                toolbar: [
                    [ { 'header': [ 1, 2, 3, 4, 5, 6, true ] }, { 'font': [] } ],
                    [ 'bold', 'italic', 'underline', 'strike', 'code-block', 'blockquote' ],
                    [ { 'list': 'ordered' }, { 'list': 'bullet' },
                    { 'indent': '-1' }, { 'indent': '+1' } ],
                    [ 'link', 'image', 'video' ],
                    [ 'clean' ],
                    [ { 'color': [] }, { 'background': [] } ],
                    [ { 'script': 'sub' }, { 'script': 'super' } ],
                    [ 'formula', true ]
                ],
            } }
                formats={ {
                    toolbar: [
                        'header', 'font', 'size',
                        'bold', 'italic', 'underline', 'strike', 'blockquote',
                        'list', 'bullet', 'indent',
                        'link', 'image', 'video'
                    ]
                } }
                onChange={ (e) => setblogs(prev => ({ ...prev, 'body': e })) }
            />

            <button className='mt-[60px]' onClick={ () => submitBlog() }>Submit</button>
        </div>
    </div>
}
export default AddBlog