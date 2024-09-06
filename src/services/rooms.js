import instance from "@/api/instance";
async function fetchAllRooms(params) {
    return instance.get("/rooms", {
        params: params
    }).then(res => res.data)
}
async function fetchOneRoom(id) {
    return instance.get(`/rooms/${id}`).then(res => res.data)
}
async function createRoom(data) {
    return instance.post("/rooms", data).then(res => res.data)
}
async function updateRoom(data) {
    return instance.put(`/rooms`, data).then(res => res.data)
}
async function deleteRoom(id) {
    return instance.delete(`/rooms/${id}`).then(res => res.data)
}
export {
    fetchAllRooms,
    fetchOneRoom,
    createRoom,
    updateRoom,
    deleteRoom
}