import instance from '@/api/instance'
function fetchAllWorkHours() {
    return instance.get('/workhours').then(res => res.data)
}
function createWorkHour(data) {
    return instance.post('/workhours', data).then(res => res.data)
}
async function updateWorkHour(data) {
    return instance.put('/workhours/' + data.id, data).then(res => res.data)
}
function fetchAllDaysOff(params) {
    return instance.get('/daysoff', { params }).then(res => res.data)
}
function createDayOff(data) {
    return instance.post('/daysoff', data).then(res => res.data)
}
async function updateDayOff(data) {
    return instance.put('/daysoff/' + data.id, data).then(res => res.data)
}
async function deleteDayOff(id) {

    return instance.delete('/daysoff/' + id).then(res => res.data)
}
export {
    fetchAllWorkHours,
    createWorkHour,
    updateWorkHour,
    fetchAllDaysOff,
    createDayOff,
    updateDayOff,
    deleteDayOff
}