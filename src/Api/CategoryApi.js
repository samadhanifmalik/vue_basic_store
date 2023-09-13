import axios from 'axios'
const token = localStorage.getItem('usertoken')
export function getcategories () {
    return axios.get('http://localhost:8000/api/category', { headers: { Accept: 'application/json', Authorization: `Bearer ${token}` } })
}
export function getcategoryid (id) {
    return axios.get(`http://localhost:8000/api/category/${id}`, { headers: { Accept: 'application/json', Authorization: `Bearer ${token}` } })
}
// export function getstatus (id) {
//     return axios.get(`http://localhost:8000/api/admin/categorystatus/${id}`, { headers: { Accept: 'application/json', Authorization: `Bearer ${token}` } })
// }
export function postcategory (form) {
    return axios.post('http://localhost:8000/api/category/', form, { headers: {'Content-Type': 'multipart/form-data',  Accept: 'application/json', Authorization: `Bearer ${token}` } })
}
export function deletecategory (id) {
    return axios.delete(`http://localhost:8000/api/category/${id}`, { headers: { Accept: 'application/json', Authorization: `Bearer ${token}` } })
}
export function updatecategory (id, form) {
    return axios.post(`http://localhost:8000/api/category/${id}`, form, { headers: {'Content-Type': 'multipart/form-data',  Accept: 'application/json', Authorization: `Bearer ${token}` } })
}
export default {
getcategories,
// getstatus,
postcategory,
getcategoryid,
deletecategory,
updatecategory,
}
