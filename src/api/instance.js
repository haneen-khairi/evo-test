import axios from 'axios'
import Cookies from 'js-cookie'
import i18next from '@/localization/i18n'
export const BASE_URL = 'https://evogate-backend-stage-s2v474kx128n4k.iknology.com/'
const instance = axios.create({
    baseURL: BASE_URL + "api/v1",
    timeout: 10000
})

console.log(i18next.language)
instance.interceptors.request.use(function (config) {
    let authToken = Cookies.get('token')
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`
        config.headers['Accept-Language'] = i18next.language
    }
    return config
})
instance.interceptors.response.use(function (response) {
    //if 401 delete token
    return response

}, function (error) {
    if (error.response.status == 401) {
        Cookies.remove("token")
        Cookies.remove("user")
        location.reload()
    }
    return Promise.reject(error)
})
export default instance