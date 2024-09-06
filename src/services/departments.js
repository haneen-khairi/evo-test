import instance from '@/api/instance'
function fetchAllDepartments(params) {
    return instance.get('/departments', { params }).then(res => res.data)
}
function createDepartment(data) {
    return instance.post('/departments', data).then(res => res.data)
}
function fetchOneDepartment(id) {
    return instance.get(`/departments/${id}`).then(res => res.data)
}
function updateDepartment(data) {
    return instance.put(`/departments`, data).then(res => res.data)
}
function deleteDepartment(id) {
    return instance.delete(`/departments/${id}`).then(res => res.data)
}
export {
    fetchAllDepartments,
    createDepartment,
    fetchOneDepartment,
    updateDepartment,
    deleteDepartment
}