import instance from '@/api/instance'

async function fetchAllNotifications(params) {
    return instance.get("/user/notifications", { params }).then(res => res.data)
}
async function readNotification(id) {
    return instance.put('/user/notifications/' + id + '/read')
}
async function readNotifications() {
    return instance.put('/user/notifications/read')
}
export {
    fetchAllNotifications,
    readNotification,
    readNotifications
}