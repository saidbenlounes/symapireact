import React, { useContext } from 'react';
import AuthAPI from '../services/authAPI';
import { NavLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { toast } from 'react-toastify';

const Navbar = ({ history}) =>{
  const { isAthenticated, setIsAthenticated } = useContext(AuthContext);

  const handleLougout = () =>{
    AuthAPI.logout();
    setIsAthenticated(false);
    toast.info("vous etes deconnecté");
    history.push("/login");
  }


	return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <NavLink className="navbar-brand" to="/">Symreact</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
        
          <li className="nav-item">
            <NavLink className="nav-link" to="/customers">Clients</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/invoices">factures</NavLink>
          </li>
          
        </ul>
      <ul className="navbar-nav ml-auto">
        {(! isAthenticated && <>
         <li className="nav-item">
            <NavLink className="btn" to="/register">Inscreption</NavLink>
          </li>
        <li className="nav-item">
            <NavLink className="btn btn-success" to="/login">Connexion</NavLink>
          </li>
          </>
          ) || (
       
          
          <li className="nav-item">
            <button onClick={handleLougout} className="btn btn-danger">Deconnexion </button>
          </li>
          )}
      </ul>
      
      </div>
    </nav>
 );
};
export default Navbar;