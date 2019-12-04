import React, {useState, useContext} from 'react';
import axios from "axios";
import CustomersAPI from "../services/customersAPI"; 
import AuthAPI from '../services/authAPI';
import AuthContext from '../contexts/AuthContext';
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
        history.replace("/customers");

        } catch(error){
            setError("auccun compte trouvé");
            console.log('test')
        }
    };
    return ( <>
    <h1>Connexion a l'application</h1>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label id="username" htmlFor="username">Adresse email</label>
            <input 
                value={credentials.username} 
                onChange = { handleChange } 
                type="email" 
                className={"form-control" + (error && " is-invalid")}
                name="username"
            />
        </div>
        {error && <p className="invalid-feedback">{error}</p>}
        
        <div className="form-group">
            <label id="password" htmlFor="password">Passe word</label>
            <input value={credentials.password} onChange={handleChange} name="password" type="password" className="form-control"/>
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-success">Je me connecte</button>
        </div>
    </form>

    </> );
}
 
export default LoginPage;