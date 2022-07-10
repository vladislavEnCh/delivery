import axios from "axios";

const $request = axios.create({
    baseURL: process.env.REACT_APP_API_URL_HEROKU
})

const $noauth = axios.create({
    baseURL: process.env.REACT_APP_API_URL_HEROKU
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$request.interceptors.request.use(authInterceptor)

export {
    $request,
    $noauth
}
