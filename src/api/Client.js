import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";



const ToastInfo = (msg) => {
    let toastId = toast.info(msg, { autoClose: false })
    return toastId
}

export const isTokenExpired = (token) => {
    const expiry = (JSON.parse(atob(token.split('.')[ 1 ]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
}

export const isAdmin = (token) => {
    const expiry = JSON.parse(atob(token.split('.')[ 1 ]));
    console.log("🚀 ~ file: Client.js ~ line 20 ~ isAdmin ~ expiry", expiry)
    if (expiry.user.user_type == 'admin' || expiry.user.user_type == 'uploader') {
        return true
    }
    else {
        return false
    }
}

export const options = {
    headers: {
        'Content-type': 'application/json',
        "Authorization": 'Bearer ' + localStorage.getItem('token')
    }
};

const ToastUpdate = (toastId, msg) => {
    toast.update(toastId, {
        render: msg,
        type: toast.TYPE.SUCCESS,
        autoClose: false
    })
}

const ToastUpdateErr = (toastId, msg) => {
    toast.update(toastId, {
        render: msg,
        type: toast.TYPE.ERROR,
        autoClose: 2000
    })
}

const ToastErr = (msg) => {
    toast.error(msg, { autoClose: 2000 })
}


const uploadToCloud = async (image) => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "du9l0dyb")
    data.append("api_key", "693111549956354");
    data.append("cloud_name", "tathagat1");
    console.log("🚀 ~ file: FolderDetails.js ~ line 40 ~ upload ~ data", data)
    return await axios.post("https://api.cloudinary.com/v1_1/du9l0dyb/image/upload", data)
}


const uploadVideoToCloud = async (image, toastId) => {

    const config = {
        onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            console.log(percentCompleted)
            document.getElementById('uploading').innerText = percentCompleted
            ToastUpdate(toastId, 'Uploading video : ' + percentCompleted)
        }
    }
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "du9l0dyb")
    data.append("api_key", "693111549956354");
    data.append("cloud_name", "tathagat1");
    console.log("🚀 ~ file: FolderDetails.js ~ line 40 ~ upload ~ data", data)
    return await axios.post("https://api.cloudinary.com/v1_1/du9l0dyb/raw/upload", data, config)

}


export { ToastUpdate, ToastErr, uploadVideoToCloud, ToastInfo, ToastUpdateErr, uploadToCloud }