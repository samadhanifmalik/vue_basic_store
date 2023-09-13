import axios from 'axios'
const token = localStorage.getItem('usertoken')
export function getproducts () {
    return axios.get('http://localhost:8000/api/product', { headers: { Accept: 'application/json', Authorization: `Bearer ${token}` } })
}
export function getproductid (id) {
    return axios.get(`http://localhost:8000/api/product/${id}`, { headers: { Accept: 'application/json', Authorization: `Bearer ${token}` } })
}
export function postproduct (form) {
    return axios.post('http://localhost:8000/api/product/', form, { headers: {'Content-Type': 'multipart/form-data',  Accept: 'application/json', Authorization: `Bearer ${token}` } })
}
export function deleteproduct (id) {
    return axios.delete(`http://localhost:8000/api/product/${id}`, { headers: { Accept: 'application/json', Authorization: `Bearer ${token}` } })
}
export function updateproduct (id, form) {
    return axios.post(`http://localhost:8000/api/product/${id}`, form, { headers: {'Content-Type': 'multipart/form-data',  Accept: 'application/json', Authorization: `Bearer ${token}` } })
}
export default {
getproducts,
getproductid,
postproduct,
deleteproduct,
updateproduct,
}
