
import axios from './HttpsRequest';
const fetchAllUser = (page) =>{
    return axios.get(`/api/users?page=${page}`)
}

const createUser = (name,job) =>{
    return axios.post(`/api/users`,{name:name,job:job})
}
const EditUser = (id,name,job) =>{
    return axios.patch(`/api/users/${id}`,{name:name,job:job})
}
const DeleteUser = (id) =>{
    return axios.delete(`/api/users/${id}`)
}

const LoginUser = (email,password)=>{
    return axios.post(`/api/login`,{email:email,password:password})
}

export {fetchAllUser,createUser, EditUser,DeleteUser,LoginUser};