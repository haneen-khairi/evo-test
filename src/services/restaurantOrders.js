import instance from '@/api/instance'
function fetchStatistics(params) {
    return instance({
        url: '/restaurants/orders/statistics',
        method: 'get',
        params
    }).then(res => res.data)
}
function fetchAllOrders(params) {
    return instance({
        url: '/restaurants/orders',
        method: 'get',
        params
    }).then(res => res.data)
}
function fetchSelfOrders(params) {
    return instance({
        url: '/restaurants/orders/me',
        method: 'get',
        params
    }).then(res => res.data)

}
function createOrder(data) {
    return instance({
        url: '/restaurants/orders',
        method: 'post',
        data
    }).then(res => res.data)

}
function updateOrder(data) {
    return instance({
        url: '/restaurants/orders',
        method: 'put',
        data
    }).then(res => res.data)

}
export {
    fetchStatistics,
    fetchAllOrders,
    fetchSelfOrders,
    createOrder,
    updateOrder
}