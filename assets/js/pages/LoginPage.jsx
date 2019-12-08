import React, {useState, useContext} from 'react';
import axios from "axios";
import CustomersAPI from "../services/customersAPI"; 
import AuthAPI from '../services/authAPI';
import AuthContext from '../contexts/AuthContext';
import Field from '../components/forms/Field';
import { toast } from 'react-toastify';
const LoginPage = ({ history }) => {
const { setIsAthenticated } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        username:"",
        password:""
    });
    const [error, setError]= useState("");
    const handleChange =  event =>{
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        setCredentials({...credentials, [name]:value});
    };
    const handleSubmit = async event=>{
        event.preventDefault();
        try{
        await AuthAPI.authenticate(credentials);
        setError("");
        setIsAthenticated(true);
        toast.success("vous etes connecté");
        history.replace("/customers");

        } catch(error){
            setError("auccun compte trouvé");
            toast.error("une erreur est survenue")
        }
    };
    return ( <>
    <h1>Connexion a l'application</h1>
    <form onSubmit={handleSubmit}>
        <Field label ="Adresse email" name="username" value ={credentials.username}  onChange = { handleChange } placeholder="votre adresse mail" error={error} />
        <Field label ="Mot de passe" name="password" type="password" value ={credentials.password}  onChange = { handleChange } placeholder="votre mot de passe" error="" />
    
        <div className="form-group">
            <button type="submit" className="btn btn-success">Je me connecte</button>
        </div>
    </form>

    </> );
}
 
export default LoginPage;