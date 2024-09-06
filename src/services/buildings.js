import instance from '@/api/instance'
function fetchAllBuildings(params) {
    return instance.get('/buildings', {
        params
    }).then(res => res.data)
}
function fetchBuilding(id) {
    return instance.get(`/buildings/${id}`).then(res => res.data)
}
function createBuilding(building) {
    return instance.post('/buildings', building).then(res => res.data)
}
function updateBuilding(building) {
    return instance.put(`/buildings`, building).then(res => res.data)
}
function deleteBuilding(id) {
    return instance.delete(`/buildings/${id}`).then(res => res.data)
}
export { fetchAllBuildings, fetchBuilding, createBuilding, updateBuilding, deleteBuilding }