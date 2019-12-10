import axios from "axios";
import jwtDecode from "jwt-decode";
import { LOGIN_API } from "../config";
let token;

function logout(){
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}
function setAxiosToken(token){
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}
function authenticate(credentials){
   
    return  axios
    .post(LOGIN_API, credentials)
    .then(response => response.data.token)
    .then(token => {
      // Je stocke le token dans mon localStorage
      window.localStorage.setItem("authToken", token);
      // On prévient Axios qu'on a maintenant un header par défaut sur toutes nos futures requetes HTTP
      setAxiosToken(token);
    
    })
}

function setup(){
    const token = window.localStorage.getItem("authToken");
    if(token){
        const jwtData = jwtDecode(token);
        if(jwtData.exp*1000 > new Date().getTime()){
           setAxiosToken(token);
        }
    } 
}
 
function isAthenticated(){
    const token = window.localStorage.getItem("authToken");
    if(token){
        const jwtData = jwtDecode(token);
        if(jwtData.exp*1000 > new Date().getTime()){
           return true;
        }
        return false;
    } 
    return false;
}
export default {
    authenticate,
    logout,
    setup,
    isAthenticated
};

