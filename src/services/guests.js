import instance from '@/api/instance'
async function fetchAllGuests(params) {
    return instance.get(`/guests/`, {
        params: params
    }).then(res => res.data)
}
async function fetchOneGuest(id) {
    return instance.get(`/guests/${id}`).then(res => res.data)
}
async function createGuest(params) {
    return instance.post(`/guests/`, params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => res.data)
}
async function updateGuest(params) {
    return instance.put(`/guests`, params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => res.data)

}
async function deleteGuest(id) {
    return instance.delete(`/guests/${id}`).then(res => res.data)
}
async function addGuestCar(id, number = "0000", model, color) {
    return instance.post(`/guests/vehicles`, { guestId: id, number, model, color }).then(res => res.data)
}

export {
    fetchAllGuests,
    fetchOneGuest,
    createGuest,
    updateGuest,
    deleteGuest,
    addGuestCar
}