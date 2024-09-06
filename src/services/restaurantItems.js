import instance from '@/api/instance'
function fetchAllItems(params) {
    return instance.get('/restaurants/items', { params }).then(response => response.data)
}
function fetchOneItem(id) {
    return instance.get(`/restaurants/items/${id}`).then(response => response.data)
}
function createItem(data) {
    return instance.post('/restaurants/items', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }

    }).then(response => response.data)
}
function updateItem(data) {
    return instance.put(`/restaurants/items`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }

    }).then(response => response.data)
}
async function favouriteItem(id, prevState) {
    return instance.put(`/user/favorite/restaurants/items`, {
        itemId: id,
        isFavorite: !prevState

    }).then(response => response.data)

}
function deleteItem(id) {
    return instance.delete(`/restaurants/items/${id}`).then(response => response.data)
}
export { fetchAllItems, fetchOneItem, createItem, updateItem, favouriteItem, deleteItem }