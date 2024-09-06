import instance from '@/api/instance'
function fetchAllStatistics() {
    return instance.get('/statistics').then(res => res.data)
}
function fetchTopInviters() {
    return instance.get('/requests/statistics/top-requesters').then(res => res.data)
}
function fetchMonthlyInvites() {
    return instance.get('/requests/statistics/monthly-invites').then(res => res.data)
}
function fetchRestaurantTopRequesters() {
    return instance.get('/restaurants/orders/statistics/top-requesters').then(res => res.data)
}
function fetchRestaurantTopItems() {
    return instance.get('/restaurants/orders/statistics/top-items').then(res => res.data)
}
function fetchMonthlyOrders() {
    return instance.get('/restaurants/orders/statistics/monthly-orders').then(res => res.data)
}
export { fetchAllStatistics, fetchTopInviters, fetchMonthlyInvites, fetchRestaurantTopRequesters, fetchRestaurantTopItems, fetchMonthlyOrders }