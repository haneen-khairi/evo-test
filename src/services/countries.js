import instance from '@/api/instance'

function fetchAllCountries(params) {
    return instance.get(`/countries/`, {
        params
    }).then(res => res.data)
}
function toggleCountry(code, currentStatus) {
    return instance.put(`/countries`, {
        code: code,
        isActive: !currentStatus

    }).then(res => res.data)
}
export {
    fetchAllCountries,
    toggleCountry
}