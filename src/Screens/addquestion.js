//import liraries
import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { addStyles } from 'react-mathquill';
import { ToastContainer } from 'react-toastify';
import { ToastInfo, ToastUpdate, uploadToCloud } from '../api/Client';
import CourseListContext from '../context/AllprojectsContext';

import katex from "katex";
import "katex/dist/katex.min.css";
import mathquill4quill from 'mathquill4quill';
import "mathquill4quill/mathquill4quill.css";
import ImageCompress from 'quill-image-compress';
import ReactQuill, { Quill } from "react-quill";
window.katex = katex;

Quill.register('modules/imageCompress', ImageCompress);


// create a component
let option1, option2, option3, option4 = null
let paragraphmedia
const Admin = (params) => {
    addStyles()

    let QuesreactQuill = React.createRef();
    // let QuesDescreactQuill = React.createRef();
    let option1reactQuill = React.createRef();
    let option2reactQuill = React.createRef();
    let option3reactQuill = React.createRef();
    let option4reactQuill = React.createRef();
    let option5reactQuill = React.createRef();
    let solutionReactQuill = React.createRef();
    let QuesParagraphQuill = React.createRef();

    useEffect(() => {
        const enableMathQuillFormulaAuthoring = mathquill4quill({ Quill, katex });
        enableMathQuillFormulaAuthoring(QuesParagraphQuill.current.editor);
        // enableMathQuillFormulaAuthoring(QuesDescreactQuill.current.editor);
        enableMathQuillFormulaAuthoring(option1reactQuill.current.editor);
        enableMathQuillFormulaAuthoring(option2reactQuill.current.editor);
        enableMathQuillFormulaAuthoring(option3reactQuill.current.editor);
        enableMathQuillFormulaAuthoring(option4reactQuill.current.editor);
        enableMathQuillFormulaAuthoring(option5reactQuill.current.editor);
        enableMathQuillFormulaAuthoring(solutionReactQuill.current.editor);
        enableMathQuillFormulaAuthoring(QuesreactQuill.current.editor);
    }, [])

    const [ isPara, setPara ] = useState('paragraph')
    const [ optionType, setoptionType ] = useState('mcq')
    const { courseList, setcourseList } = useContext(CourseListContext)
    const [ isvideo, setVideo ] = useState(false)
    const [ QuestionText, setQuestionText ] = useState(null)
    const [ Subjectid, setSubjectid ] = useState('')
    const [ correctOption, setcorrectOption ] = useState('')
    const [ courseId, setcourseId ] = useState('')
    const [ chapterId, setchapterId ] = useState('')
    const [ topicId, settopicId ] = useState('')
    const [ SubjectList, setSubjectList ] = useState([])
    const [ ChapterList, setChapterList ] = useState([])
    const [ DESC, setDESC ] = useState([])
    // const [ questionDesc, setquestionDesc ] = useState()
    const [ topicList, settopicList ] = useState([])
    const [ QuestionTextPara, setQuestionTextPara ] = useState()
    const [ Level, setLevel ] = useState(null)
    // console.log("🚀 ~ file: addquestion.js ~ line 22 ~ Admin ~ Level", Level)
    const [ Options, setOptions ] = useState([])
    const [ OptionsMedia1, setOptionsMedia1 ] = useState()
    const [ OptionsMedia2, setOptionsMedia2 ] = useState()
    const [ OptionsMedia3, setOptionsMedia3 ] = useState()
    const [ OptionsMedia4, setOptionsMedia4 ] = useState()
    const [ OptionsMedia5, setOptionsMedia5 ] = useState()
    const [ Explanation, setExplanation ] = useState()
    const [ Options1, setOptions1 ] = useState()
    const [ Options2, setOptions2 ] = useState()
    const [ Options3, setOptions3 ] = useState()
    const [ Options4, setOptions4 ] = useState()
    const [ Options5, setOptions5 ] = useState()
    const [ quesMedia, setquesMedia ] = useState(null);
    const emailInputRef = useRef(null);
    // console.log("🚀 ~ file: addquestion.js ~ line 28 ~ Admin ~ option1, option2, option3, option4", option1, option2, option3, option4)
    const [ data, setdata ] = useState([])

    const [ latex, setLatex ] = useState('')
    const [ value, setValue ] = useState('')

    useEffect(()=>{
        if(optionType == 'input'){
            emailInputRef.current.focus();
        }
        
      }, [correctOption]);




    const CorrectOptionComponent = () => {

        // const correctoptionReactQuill = React.createRef();
        // useEffect(() => {
        //     const enableMathQuillFormulaAuthoring = mathquill4quill({ Quill, katex });
        //     enableMathQuillFormulaAuthoring(correctoptionReactQuill.current.editor);
        // }, [])
        return (
            <div className='flex items-center'>
                <input value={correctOption} ref={emailInputRef} onChange={ (e) => setcorrectOption(e.target.value) }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name" type="text" placeholder="Correct option" />
                {/* <ReactQuill
                    style={ { backgroundColor: '#fff' } }
                    className='shadow form-textarea mt-1 block w-full border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    ref={ correctoptionReactQuill }
                    id="editor"
                    modules={ modules }
                    placeholder="Correct option"
                    theme="snow"
                    onChange={ (e) => setcorrectOption(e) }
                /> */}
            </div>
        )
    }

    const options = {
        headers: {
            'Content-type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
    };

    async function _SubmitQuestion() {



        const data = {
            _id: Date,
            subjectId: Subjectid,
            topicId: topicId,
            chapterId: chapterId,
            Desc: DESC,
            questionDesc: QuestionTextPara,
            questionType: isPara,
            questionLevel: Level,
            explanation: Explanation,
            creator: localStorage.getItem('usermail')
        }
        let toastid = ToastInfo('Adding Questions ...');
        params.setLoader(true);
        const res = await axios.post(process.env.REACT_APP_API + '/questionupload', data, options)
        // console.log("🚀 ~ file: addquestion.js ~ line 52 ~ _SubmitQuestion ~ res", res.data)
        // _getQues()
        if (res.status == 200) {
            ToastUpdate(toastid, 'Questions addedd successfully');
            window.location.reload(false);
            setDESC([])
        }
        params.setLoader(false);
    }

    const _getQues = async () => {
        params.setLoader(true);
        const res = await axios.get(process.env.REACT_APP_API + '/question', options)
        console.log("🚀 ~ file: Admin.js ~ line 3299 ~ useEffect ~ res.data", res.data)
        if (res.status == 200 && res.data.length > 0) {
            setdata(res.data)
        }
        params.setLoader(false);
    }

    const _getSubject = async (courseId) => {
        params.setLoader(true);
        const res = await axios.get(process.env.REACT_APP_API + '/subject/' + courseId, options)
        if (res.status == 200) {
            setSubjectList(res.data)
        }
        params.setLoader(false);
    }

    const _getchapter = async (Subjectid) => {
        params.setLoader(true);
        const res = await axios.get(process.env.REACT_APP_API + '/chapter/' + Subjectid, options)
        if (res.status == 200) {
            setChapterList(res.data)
        }
        params.setLoader(false);
    }

    const _gettopic = async (chapterId) => {
        params.setLoader(true);
        const res = await axios.get(process.env.REACT_APP_API + '/topic/' + chapterId, options)
        // console.log("🚀 ~ file: addquestion.js ~ line 79 ~ const_gettopic= ~ res", res.data)
        if (res.status == 200) {
            settopicList(res.data)
        }
        params.setLoader(false);
    }



    // useEffect(async () => {
    //     _getQues();
    // }, [])

    const _AddMore = () => {
        let obj = {
            _id: Date.now(),
            question: QuestionText,
            questionmedia: quesMedia,
            option: [ {
                _id: Date.now(),
                option: Options1,
                optionMedia: OptionsMedia1
            },
            {
                _id: Date.now(),
                option: Options2,
                optionMedia: OptionsMedia2
            }, {
                _id: Date.now(),
                option: Options3,
                optionMedia: OptionsMedia3
            },
            {
                _id: Date.now(),
                option: Options4,
                optionMedia: OptionsMedia4
            } ],
            correctOption: correctOption,
            optionType: optionType,
            explanation: Explanation,
            paragraph: QuestionTextPara,
            paragraphmedia: paragraphmedia,
            questionType: isPara,

        }
        if(Options5) {
            obj.option.push({
                _id: Date.now(),
                option: Options5,
                optionMedia: OptionsMedia5
            })
        }
        console.log("🚀 ~ file: addquestion.js ~ line 233 ~ Admin ~ obj", obj)
        setDESC([ ...DESC, obj ])
        return obj
    }

    const _uploadmedia = async (file, state) => {

        const resp = await uploadToCloud(file);
        let data = resp.data
        let media = {
            mediaID: data.asset_id,
            MediaUrl: data.secure_url,
            mediaType: data?.format == undefined ? 'xlsx' : data?.format,
            MediaSize: data.bytes,
            Date: moment().format('DD-MM-YYYY')
        }
        if (state == 'ques') { setquesMedia(data.secure_url) }
        // if (state == 'o1') { setOptionsMedia1(data.secure_url) }
        // if (state == 'o2') { setOptionsMedia2(data.secure_url) }
        // if (state == 'o3') { setOptionsMedia3(data.secure_url) }
        // if (state == 'o4') { setOptionsMedia4(data.secure_url) }
        // if (state == 'o5') { setOptionsMedia5(data.secure_url) }
        if (state == 'para') { paragraphmedia = data.secure_url }
        // console.log("🚀 ~ file: addquestion.js ~ line 164 ~ const_uploadmedia= ~ media", media)

    }



    let modules = {
        formula: true,
        toolbar: [
            [ { header: [ 1, 2, 3, false ] } ],
            [ { 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' } ],
            [ "bold", "italic", "underline" ], // toggled buttons
            [ "blockquote", "code-block" ],
            [ { script: "sub" }, { script: "super" } ], // superscript/subscript
            [ { color: [] }, { background: [] } ], // dropdown with defaults from theme
            [ { align: [] } ],
            [ "image", "formula" ],
            [ "clean" ] // remove formatting button
        ],
        imageCompress: {
            quality: 0.7, // default
            maxWidth: 1024, // default
            maxHeight: 1024, // default
        },
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false
        }
    };

    const onSelectCourse =(e) => {
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
    }

    const onSelectSubject =(e) => {
        e.preventDefault();
        setchapterId("");
        setChapterList([]);
        settopicId("");
        settopicList([]);
        params.setLoader(true);
        setSubjectid(e.target.value);
        _getchapter(e.target.value);
    }

    const onSelectChapter =(e) => {
        e.preventDefault();
        settopicId("");
        settopicList([]);
        params.setLoader(true);
        setchapterId(e.target.value);
        _gettopic(e.target.value);
    }

    return (

        <div className='m-10'>
            <ToastContainer />
            <div className="mb-4">
                <label className="block uppercase tracking-wide mt-2 text-gray-700 text-sm font-bold mb-2" htmlFor="grid-state">
                    Select Course
                </label>
                <div className="relative">
                    <select onChange={ onSelectCourse } className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option value={""}>Select dropdown</option>
                        { courseList[ 0 ] && courseList.map((res) => (
                            <option value={ res.courseId }>{ res.courseName }</option>
                        )) }
                    </select>
                    <label className="block uppercase tracking-wide mt-2 text-gray-700 text-sm font-bold mb-2" htmlFor="grid-state">
                        Select Subject
                    </label>
                    <select onChange={ onSelectSubject } defaultValue={""}
                        className="block appearance-none w-full bg-gray-200 mt-2 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option value={""}>Select dropdown</option>
                        { SubjectList[ 0 ] && SubjectList.map((res) => (
                            <option value={ res.Id }>{ res.subjectName }</option>
                        )) }
                    </select>
                    <label className="block uppercase tracking-wide mt-2 text-gray-700 text-sm font-bold mb-2" htmlFor="grid-state">
                        Select Chapter
                    </label>
                    <select onChange={ onSelectChapter } defaultValue={""}
                        className="block appearance-none w-full bg-gray-200 mt-2 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option value={""}>Select dropdown</option>
                        { ChapterList[ 0 ] && ChapterList.map((res) => (
                            <option value={ res.chapterId }>{ res.chapterName }</option>
                        )) }
                    </select>

                    <label className="block uppercase tracking-wide mt-2 text-gray-700 text-sm font-bold mb-2" htmlFor="grid-state">
                        Select Topic
                    </label>
                    <select onChange={ (e) => settopicId(e.target.value) } defaultValue={""}
                        className="block appearance-none w-full bg-gray-200 mt-2 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option value={""}>Select dropdown</option>
                        { topicList[ 0 ] && topicList.map((res) => (
                            <option value={ res.Id }>{ res.topicName }</option>
                        )) }
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <label className="inline-flex items-center">
                    <input onClick={ () => setPara('single') } type="radio" className="form-radio" name="Para" value="1" />
                    <span className="ml-2">Single</span>
                </label>
                <label className="inline-flex items-center ml-6">
                    <input onClick={ () => setPara('paragraph') } type="radio" className="form-radio" name="Para" value="2" />
                    <span className="ml-2">Paragraph</span>
                </label>
            </div>
            <div className="mb-4">
                <label className="inline-flex items-center">
                    <input onClick={ () => setoptionType('input') } type="radio" className="form-radio" name="optionType" value="1" />
                    <span className="ml-2">Input </span>
                </label>
                <label className="inline-flex items-center ml-6">
                    <input onClick={ () => setoptionType('mcq') } type="radio" className="form-radio" name="optionType" value="2" />
                    <span className="ml-2">MCQ</span>
                </label>
            </div>
            <div className="mb-4">
                <label className="inline-flex items-center">
                    <input onClick={ () => setLevel('Easy') } type="radio" className="form-radio" name="Level" value="1" />
                    <span className="ml-2">Easy</span>
                </label>
                <label className="inline-flex items-center ml-6">
                    <input onClick={ () => setLevel('Medium') } type="radio" className="form-radio" name="Level" value="2" />
                    <span className="ml-2">Medium</span>
                </label>
                <label className="inline-flex items-center ml-6">
                    <input onClick={ () => setLevel('Hard') } type="radio" className="form-radio" name="Level" value="2" />
                    <span className="ml-2">Hard</span>
                </label>
            </div>


            {/* <div className="mb-4">
                <label className="inline-flex items-center">
                    <input onClick={ () => setVideo(true) } type="radio" className="form-radio" name="typeof" value="1" />
                    <span className="ml-2">Video</span>
                </label>
                <label className="inline-flex items-center ml-6">
                    <input onClick={ () => setVideo(false) } type="radio" className="form-radio" name="typeof" value="2" />
                    <span className="ml-2">Text</span>
                </label>
            </div> */}

            {/* {
                isvideo ?
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            upload Video
                        </label>
                        <input type='file' />
                    </div>
                    : null
            } */}

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Question
                </label>
                <ReactQuill
                    style={ { backgroundColor: '#fff' } }
                    className='shadow form-textarea mt-1 block w-full border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    ref={ QuesreactQuill }
                    id="editor"
                    modules={ modules }
                    placeholder="Type question here"
                    theme="snow"
                    onChange={ (e) => setQuestionText(e) }
                />
                {/* <input onChange={ (e) => setQuestionText(e.target.value) } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Text input" /> */ }
            </div>



            {/* <label className="block text-gray-700 text-sm font-bold mb-2">
                Question Description


            </label>
            <ReactQuill
                style={ { backgroundColor: '#fff' } }
                className='shadow form-textarea mt-1 block w-full border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                ref={ QuesDescreactQuill }
                id="editor"
                modules={ {
                    formula: true,
                    toolbar: [ [ "video", "bold", "italic", "underline", "formula", "image" ] ]
                } }
                placeholder="Type question description here."
                theme="snow"
                onChange={ (e) => setquestionDesc(e) }
            />  */}

            <div style={ { marginBottom: 18 } }></div>






            { isPara == 'paragraph' ?
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Paragraph
                        {/* <textarea onChange={ (e) => {
                                console.log('e.target.value', e.target.value)
                                setQuestionTextPara(e.target.value)
                            } } className="shadow form-textarea mt-1 block w-full border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="5" placeholder="Textarea"></textarea>
                            <input className='bg-gray-200 w-full rounded-sm p-2' accept="image/*" type='file' onChange={ (e) => {
                                _uploadmedia(e.target.files[ 0 ], 'para')
                            } } /> */}
                    </label>
                    <ReactQuill
                        style={ { backgroundColor: '#fff' } }
                        className='shadow form-textarea mt-1 block w-full border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        ref={ QuesParagraphQuill }
                        id="editor"
                        modules={ modules }
                        placeholder="Type paragraph."
                        theme="snow"
                        onChange={ (e) => setQuestionTextPara(e) }
                    />
                </div>
                : null
            }

            { optionType == 'input' ?
                <div >
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Correct Answer
                    </label>
                    <CorrectOptionComponent />
                </div>
                :
                <div className="my-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Answers
                    </label>
                    <div className='grid flex-col grid-cols-1 gap-4'>
                        <div className='flex flex-col'>
                            <div className='flex items-center'>
                                <input onClick={ () => setcorrectOption(1) } className='mr-2 w-4 h-4' name='options' type='radio' />
                                {/* <input onChange={ (e) => setOptions1(e.target.value) } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="option 1" /> */ }
                                {/* <input className='bg-gray-200 w-full rounded-sm p-2' type='file' accept="image/*" onChange={ (e) => {
                                    _uploadmedia(e.target.files[ 0 ], 'o1')
                                } } /> */}
                                <ReactQuill
                                    style={ { backgroundColor: '#fff' } }
                                    className='shadow form-textarea mt-1 block w-full border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    ref={ option1reactQuill }
                                    id="editor"
                                    modules={ modules }
                                    placeholder="Option 1"
                                    theme="snow"
                                    onChange={ (e) => setOptions1(e) }
                                />

                            </div>
                            <img className='w-20 hover:w-full duration-300 shadow-sm ' src={ OptionsMedia1 } />

                        </div>
                        <div className='flex flex-col'>
                            <div className='flex items-center'>
                                <input onClick={ () => setcorrectOption(2) } className='mr-2 w-4 h-4' name='options' type='radio' />
                                {/* <input onChange={ (e) => setOptions2(e.target.value) } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="option 2" /> */ }
                                {/* <input className='bg-gray-200 w-full rounded-sm p-2' type='file' accept="image/*" onChange={ (e) => {
                                    _uploadmedia(e.target.files[ 0 ], 'o2')
                                } } /> */}
                                <ReactQuill
                                    style={ { backgroundColor: '#fff' } }
                                    className='shadow form-textarea mt-1 block w-full border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    ref={ option2reactQuill }
                                    id="editor"
                                    modules={ modules }
                                    placeholder="Option 2"
                                    theme="snow"
                                    onChange={ (e) => setOptions2(e) }
                                />
                            </div>
                            <img className='w-20 hover:w-full duration-300 shadow-sm ' src={ OptionsMedia2 } />

                        </div>
                        <div className='flex flex-col'>
                            <div className='flex items-center'>
                                <input onClick={ () => setcorrectOption(3) } className='mr-2 w-4 h-4' name='options' type='radio' />
                                {/* <input onChange={ (e) => setOptions3(e.target.value) } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="option 3" /> */ }
                                {/* <input className='bg-gray-200 w-full rounded-sm p-2' type='file' accept="image/*" onChange={ (e) => {
                                    _uploadmedia(e.target.files[ 0 ], 'o3')
                                } } /> */}
                                <ReactQuill
                                    style={ { backgroundColor: '#fff' } }
                                    className='shadow form-textarea mt-1 block w-full border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    ref={ option3reactQuill }
                                    id="editor"
                                    modules={ modules }
                                    placeholder="Option 3"
                                    theme="snow"
                                    onChange={ (e) => setOptions3(e) }
                                />
                            </div>
                            <img className='w-20 hover:w-full duration-300 shadow-sm ' src={ OptionsMedia3 } />

                        </div>
                        <div className='flex flex-col'>
                            <div className='flex items-center'>
                                <input onClick={ () => setcorrectOption(4) } className='mr-2 w-4 h-4' name='options' type='radio' />
                                {/* <input onChange={ (e) => setOptions4(e.target.value) } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="option 4" /> */ }
                                {/* <input className='bg-gray-200 w-full rounded-sm p-2' type='file' accept="image/*" onChange={ (e) => {
                                    _uploadmedia(e.target.files[ 0 ], 'o4')
                                } } /> */}
                                <ReactQuill
                                    style={ { backgroundColor: '#fff' } }
                                    className='shadow form-textarea mt-1 block w-full border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    ref={ option4reactQuill }
                                    id="editor"
                                    modules={ modules }
                                    placeholder="Option 4"
                                    theme="snow"
                                    onChange={ (e) => setOptions4(e) }
                                />
                            </div>
                            <img className='w-20 hover:w-full duration-300 shadow-sm ' src={ OptionsMedia4 } />
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex items-center'>
                                <input onClick={ () => setcorrectOption(5) } className='mr-2 w-4 h-4' name='options' type='radio' />
                                {/* <input onChange={ (e) => setOptions5(e.target.value) } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="option 5" /> */ }
                                {/* <input className='bg-gray-200 w-full rounded-sm p-2' type='file' accept="image/*" onChange={ (e) => {
                                    _uploadmedia(e.target.files[ 0 ], 'o5')
                                } } /> */}
                                <ReactQuill
                                    style={ { backgroundColor: '#fff' } }
                                    className='shadow form-textarea mt-1 block w-full border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    ref={ option5reactQuill }
                                    id="editor"
                                    modules={ modules }
                                    placeholder="Option 5"
                                    theme="snow"
                                    onChange={ (e) => setOptions5(e) }
                                />
                            </div>
                            <img className='w-20 hover:w-full duration-300 shadow-sm ' src={ OptionsMedia5 } />
                        </div>
                    </div>
                </div>
            }

            <h3 className="text-lg font-semibold leading-tight my-4">Write Solution</h3>
            {/* <textarea onChange={ (e) => {
                setExplanation(e.target.value)
            } } className="shadow form-textarea mt-1 block w-full border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="5" placeholder="Solution..."></textarea> */}
            <ReactQuill
                style={ { backgroundColor: '#fff' } }
                className='shadow form-textarea mt-1 block w-full border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                ref={ solutionReactQuill }
                id="editor"
                modules={ modules }
                placeholder="Write solution"
                theme="snow"
                onChange={ (e) => setExplanation(e) }
            />

            {/* <p dangerouslySetInnerHTML={{__html: Explanation}}></p> */ }

            {/* { isPara == 'paragraph' ? */ }
            <div className="w-full mx-auto">
                <div className="py-8">
                    <div>
                        <h2 className="text-2xl font-semibold leading-tight">Question Data</h2>
                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div
                            className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                        >
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Question and options
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            correctOption
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            paragraph
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Level
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        DESC.map((res, i) => (
                                            <tr key={ i }>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div className="flex flex-col">
                                                        <p dangerouslySetInnerHTML={ { __html: res.question } } className="text-gray-900 whitespace-no-wrap"></p>
                                                        <br></br>
                                                        { res.option && res.option.map((ans, index) => (
                                                            <li dangerouslySetInnerHTML={ { __html: ans.option } } key={ i + index + 'p' }
                                                                className="text-gray-600 whitespace-no-wrap">
                                                            </li>
                                                        )) }
                                                    </div>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p dangerouslySetInnerHTML={ { __html: res.correctOption } } className="text-gray-600 whitespace-no-wrap"></p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p dangerouslySetInnerHTML={ { __html: res.paragraph } } className="text-gray-900 whitespace-no-wrap"></p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <span
                                                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                                    >
                                                        <span
                                                            aria-hidden
                                                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                                        ></span>
                                                        <span className="relative">{ Level }</span>
                                                    </span>
                                                </td>
                                                <td
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
                                                </td>
                                            </tr>
                                        )) }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* : null } */ }

            <div className='flex flex-row '>

                { isPara == 'paragraph' ?
                    <div className="flex items-center justify-between mr-10 p-2">
                        <button onClick={ () => _AddMore() } className="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Add Questions
                        </button>
                    </div>
                    : isPara == 'single' && DESC.length < 1 && <div className="flex items-center justify-between mr-10 p-2">
                        <button onClick={ () => _AddMore() } className="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Add Questions
                        </button>
                    </div> }
                { DESC.length > 0 ?
                    <div className="flex items-center justify-between p-2">
                        <button onClick={ () => _SubmitQuestion() } className="bg-indigo-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Submit
                        </button>
                    </div>
                    : null
                }
            </div>

            {/* <div>

                <div className="mx-auto">
                    <div className="py-8">
                        <div>
                            <h2 className="text-2xl font-semibold leading-tight">All Questions</h2>
                        </div>
                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div
                                className="inline-block min-w-full shadow-md rounded-lg overflow-x-auto selectTestHeight"
                            >
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                S.no
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                Question and options
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                paragraph
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                Level
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                            ></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((res, i) => (
                                                <tr key={ i }>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                        </p>
                                                        <p className="text-gray-600 whitespace-no-wrap">{ i + 1 }</p>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p dangerouslySetInnerHTML={ { __html: res.question } } className="text-gray-900 font-semibold whitespace-no-wrap">
                                                        </p>
                                                        { res.questionoption.map((ans) => (
                                                            <li dangerouslySetInnerHTML={ { __html: ans.option } } className="text-gray-600 whitespace-no-wrap"></li>
                                                        )) }
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p dangerouslySetInnerHTML={ { __html: res.paragraph } } className="text-gray-900 whitespace-no-wrap"></p>
                                                        <p dangerouslySetInnerHTML={ { __html: res.questionDesc } } className="text-gray-600 whitespace-no-wrap"></p>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <span
                                                            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                                        >
                                                            <span
                                                                aria-hidden
                                                                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                                            ></span>
                                                            <span className="relative">{ res.questionLevel }</span>
                                                        </span>
                                                    </td>
                                                </tr>
                                            )) }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

        </div >

    );
};



export default Admin;
