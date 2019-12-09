import axios from 'axios'

function register(user){
   return axios.post(USERS_API, user);
}
 
export default {
    register
}