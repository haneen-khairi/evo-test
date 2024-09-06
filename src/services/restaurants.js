import instance from '@/api/instance'
function fetchAllRestaurants() {
    return instance.get('/restaurants').then(res => res.data);
}
export {
    fetchAllRestaurants
}