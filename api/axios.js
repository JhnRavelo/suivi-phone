import axios from "axios"

const url = "http://192.168.123.210:4000"

const axiosDefault = axios.create({
    baseURL: url,
})

const axiosPrivate = axios.create({
    baseURL: url,
    headers:{"Content-Type":'application/json'}
})

export {axiosDefault, axiosPrivate}