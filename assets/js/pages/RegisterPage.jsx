import React,{useState} from 'react';
import Field from '../components/forms/Field';
import { Link } from "react-router-dom";
import UserAPI from "../services/userAPI";
import { toast } from 'react-toastify';

const RegisterPage = ({history}) => {
    // les données de formulaire
    // avec le onChange que on change les valeur de ce state
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    }); 
    // les données d'erreurs
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    }); 

      // Gestion des changements des inputs dans le formulaire
      // on recupere les NAME on le match avec le state et on lui insere sa VALUE
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async event => {
        event.preventDefault();
        // gestion d erreur de confirmation de mot de passe
        const apiErrors = {};
        if(user.password !== user.passwordConfirm){
            apiErrors.passwordConfirm="votre mot de passe de confirmation est different de l'orginal"
            setErrors(apiErrors);
            toast.error("vous avez des erruers dans votre formulaire");
            return;
        }

        try{
            await UserAPI.register(user);
            setErrors({});
            history.replace('/login');
            toast.success("Vous etes désomais inscrit")
        } catch(error){
            console.log(error.response);
            // recuprer violations de error.response.data
            const {violations} = error.response.data 
        
            if(violations){
              
              violations.forEach(({propertyPath, message})=>{
                apiErrors[propertyPath] = message;
                
              });
              setErrors(apiErrors);
            }
            toast.error("vous avez des erruers dans votre formulaire");
        }
        
    };
    return ( <>
        <h1>Inscription</h1>
        <form onSubmit={handleSubmit}>
            <Field 
                name="firstName"
                label="Prénom" 
                placeholder="votre prénom" 
                error={errors.firstName} 
                value={user.firstName} 
                onChange={handleChange}
            />
             <Field 
                name="lastName"
                label="Nom" 
                placeholder="votre Nom" 
                error={errors.lastName} 
                value={user.lastName} 
                onChange={handleChange}
            />
             <Field 
                name="email"
                label="Adesse email" 
                placeholder="votre email" 
                type="email"
                error={errors.email} 
                value={user.email} 
                onChange={handleChange}
            />
             <Field 
                name="password"
                label="Mot de passe" 
                type="password"
                placeholder="votre mot de passe" 
                error={errors.password} 
                value={user.password} 
                onChange={handleChange}
            />
             <Field 
                name="passwordConfirm"
                label="confirmation de mot de passe" 
                type="password"
                placeholder="confirmer votre mot de passe" 
                error={errors.passwordConfirm} 
                value={user.passwordConfirm} 
                onChange={handleChange}
            />
            <div className="form-group">
                <button type="submit" className="btn btn-success">
                    Confirmation
                </button>
                <Link to="/login" className="btn btn-link">
                    J'ai déjà un compte
                </Link>
            </div>
        </form>
    </> );
}
 
export default RegisterPage;