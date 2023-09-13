import axios from 'axios'
const token = localStorage.getItem('usertoken')
export function getcartitem () {
    return axios.get('http://localhost:8000/api/cart', { headers: { Accept: 'application/json', Authorization: `Bearer ${token}` } })
}
export function getcartid (id) {
    return axios.get(`http://localhost:8000/api/cart/${id}`, { headers: { Accept: 'application/json', Authorization: `Bearer ${token}` } })
}
export function addtocart (form) {
    return axios.post('http://localhost:8000/api/cart/', form, { headers: {Accept: 'application/json', Authorization: `Bearer ${token}` } })
}
export function deletecart (id) {
    return axios.delete(`http://localhost:8000/api/cart/${id}`, { headers: { Accept: 'application/json', Authorization: `Bearer ${token}` } })
}
export function updatecart (id, form) {
    return axios.put(`http://localhost:8000/api/cart/${id}`, form, { headers: {Accept: 'application/json', Authorization: `Bearer ${token}` } })
}
export default {
    getcartitem,
    getcartid,
    addtocart,
    deletecart,
    updatecart,
}
