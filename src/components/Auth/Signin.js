import axios from 'axios';
import React, { useRef, useState } from 'react';
import App from '../../App';
import { useHistory } from 'react-router-dom';
import styles from "./Signin.module.css"
import logo from "../../logo/logo.jpg"
import { isAdmin, ToastErr, ToastInfo, ToastUpdateErr } from '../../api/Client';
import { ToastContainer } from 'react-toastify';



const SignIn = () => {
    let [ type, setType ] = useState('text')
    const history = useHistory();
    const Number = useRef(null)
    const password = useRef()

    const _signin = async () => {
        // e.preventDefault();
        if (Number.current == '' || Number.current == null || Number.current == undefined
            || password.current == '' || password.current == null || password.current == undefined) {
            ToastErr('Please enter username and password')
            return
        }
        const data = {
            email_Id: Number.current,
            password: password.current
        }
        // localStorage.setItem('token', 'res.data.token')
        // localStorage.setItem('userid', 'res.data.user.username')
        // window.location.reload();
        const options = {
            headers: {
                'Content-type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        };
        let toastid = ToastInfo('Login..')
        try {
            const res = await axios.post(process.env.REACT_APP_API + '/login', data, options)
            console.log("🚀 ~ file: Signin.js ~ line 41 ~ const_signin= ~ res", res)
            console.log("🚀 ~ file: Signin.js ~ line 33 ~ const_signin= ~ res", res.status, res.data)
            if (res.status == 200 && isAdmin(res.data.token)) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('userid', res.data.user.username)
                localStorage.setItem('usermail', res.data.user.email_Id)
                window.location.reload();
            }
            else {
                ToastUpdateErr(toastid, 'err')
            }
        }
        catch (err) {
            console.log("🚀 ~ file: Signin.js ~ line 53 ~ const_signin= ~ err", err)
            ToastUpdateErr(toastid, 'Incorrect username and password')
        }

    }

    let showHandler = (e) => {
        e.preventDefault();
        if (type === 'password') {
            setType('text')
        } else {
            setType('password')
        }
    }

    return (
        <div className={ styles.main }>
            <ToastContainer />
            <div className={ styles.login }>
                <div >

                    <h2>Welcome back!</h2>
                    <h3 className='mt-2'>Please login to your account.</h3>
                    <div className='flex mt-6 flex-col'>
                        <label className='text-left text-gray-400'>Email Id</label>
                        <input onChange={ (e) => Number.current = e.target.value }
                            className='bg-indigo-100 rounded-lg p-4 text-gray-500 mt-1' type='text' placeholder='' />
                    </div>
                    <div className={ styles.password }>
                        <div className='flex flex-col mt-4'>
                            <label className='text-left text-gray-400'>Password</label>
                            <input onChange={ (e) => password.current = e.target.value } type={ type } className='bg-indigo-100 rounded-lg p-4 text-gray-500 mt-1' autoComplete='off' />
                        </div>
                        <button type='button' onClick={ showHandler }><i className="far fa-eye"></i></button>
                    </div>
                    {/* <div style={{display:'flex',justifyContent:'space-between',maxWidth: '400px'}}>
                    <div className={styles.checkbox}>
                    <input id='checkbox' type='checkbox'/>
                    <label htmlFor='checkbox'>Remember Me</label>
                    </div>
                    <div>
                        <a href='#'>Forgot Password</a>
                    </div>
                </div> */}
                    <button onClick={ () => _signin() } className='bg-indigo-500 mb-4 w-full rounded-md' type="submit" >Login</button>
                </div>
            </div>
        </div>
    )
}

export default SignIn;