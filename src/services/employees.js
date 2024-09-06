import instance from '@/api/instance'
function fetchAllEmployees(param) {
    return instance.get('/employees', { params: param }).then(res => res.data)
}
function fetchEmployeeById(id) {
    return instance.get(`/employees/${id}`).then(res => res.data)
}
function createEmployee(data) {
    return instance.post('/employees', data).then(res => res.data)
}
export {
    fetchAllEmployees,
    fetchEmployeeById,
    createEmployee
}