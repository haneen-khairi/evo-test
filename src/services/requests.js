import instance from '@/api/instance';
async function fetchAllRequests(params) {
    return instance.get("/requests",
        {
            params: params
        }
    ).then(res => res.data)
}
async function fetchOneRequest(id) {
    return instance.get(`/requests/${id}`).then(res => res.data)
}
async function createRequest(request) {
    return instance.post("/requests", request).then(res => res.data)
}
async function updateRequest(data) {
    return instance.put(`/requests`, data).then(res => res.data)
}
async function checkCode(code, takeAction = true) {
    return instance.get(`/qr/${code}?isTakeAction=${takeAction}`).then(res => res.data)

}
async function addGuestRequest(request) {
    return instance.post("/requests/guests", request).then(res => res.data)
}
async function inviteByEmail(id, email) {
    return instance.post(`/requests/${id}/invite/email/${email}`).then(res => res.data)
}
async function inviteByWhatsapp(id, phone) {
    return instance.post(`/requests/${id}/invite/whatsapp/${phone}`).then(res => res.data)
}
async function closeAddGuests(id) {
    return instance.put("/requests/disallow-guest-edits/" + id).then(res => res.data)
}
export {
    fetchAllRequests,
    createRequest,
    fetchOneRequest,
    updateRequest,
    checkCode,
    addGuestRequest,
    inviteByEmail,
    inviteByWhatsapp,
    closeAddGuests
}