import instance from '@/api/instance'
async function forgotPassword(email) {
    return instance.post('/auth/password/forgot', { login: email })
}
async function confirmForgotOTP({ email, otp }) {
    return instance.post('/auth/password/code/validate', { login: email, code: otp }).then(res => res.data)
}
async function resetPassword({ email, otp, password }) {
    return instance.put('/auth/password/reset', { login: email, code: otp, password }).then(res => res.data)
}
async function register(params) {
    return instance.post('/auth/register', params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => res.data)
}
export {
    forgotPassword,
    confirmForgotOTP,
    resetPassword,
    register
}
