import instance from '@/api/instance'
function fetchAllSettings(params) {
    return instance.get('/settings', { params }).then(response => response.data)
}
function updateSettings(params) {
    return instance.put('/settings', params).then(response => response.data)
}
export { fetchAllSettings, updateSettings }
