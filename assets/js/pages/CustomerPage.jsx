import React, { useState, useEffect } from 'react';
import Field from '../components/forms/Field';
import { Link } from "react-router-dom";
import axios from "axios";
import customersAPI from "../services/customersAPI";
import { toast } from 'react-toastify';
import FormContentLoader from '../components/loaders/FormContentLoader';

const CustomerPage = ({match, history}) => {

  const { id = "new" } = match.params;
 
  
  const [errors, setErrors] = useState({
      lastName: "",
      firstName: "",
      email: "",
      company: ""
  });
  const [customer, setCustomer] = useState({
      lastName: "",
      firstName: "",
      email: "",
      company: ""
  });

  const [editing, setEditing] = useState(false);
  const[loading, setLoading] = useState(false);
  const fetchCustomer = async id =>{
    try{
      const { firstName, lastName, email, company } = await customersAPI.find(id);
      setCustomer({ firstName, lastName, email, company });
      setLoading(false);
    }catch(error){
      toast.error("le client n'a pas pu chargé");
      history.replace("/customers");
    }
  };
  
  useEffect(() => {
    if (id !== "new") {
      setLoading(true);
      setEditing(true);
      fetchCustomer(id);
      
    }
  },[id]);

  const handleChange = ({currentTarget })=>{
      const {name ,  value} = currentTarget;
      setCustomer({...customer, [name]: value});
  }
  const handleSubmit = async event=>{
    event.preventDefault();
    try{
      setErrors({});
      if(editing){
        await customersAPI.update(id, customer);
        toast.success("le client est modifié");
        
      } else{
        customersAPI.create(customer);
        toast.success("le client est crée");
        history.replace("/customers");
      }
        
    }catch({response}){
      const {violations} = response.data 
        
        if(violations){
          const apiErrors = {};
          violations.forEach(({propertyPath, message})=>{
            apiErrors[propertyPath] = message;
            
          });
          setErrors(apiErrors);
        }
        toast.error("des erreur dans le formulaires");
    }
  };

    return ( <>
          {(!editing && <h1>Création d'un client</h1>) || (
        <h1>Modification du client</h1>
      )}
        {loading && <FormContentLoader/>}
        {!loading && <form onSubmit={handleSubmit}>
            <Field
            name="lastName"
            label="Nom de famille"
            placeholder="Nom de famille du client"
            value={customer.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />
          <Field
            name="firstName"
            label="Prénom"
            placeholder="Prénom du client"
            value={customer.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />
          <Field
            name="email"
            label="Email"
            placeholder="Adresse email du client"
            type="email"
            value={customer.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Field
            name="company"
            label="Entreprise"
            placeholder="Entreprise du client"
            value={customer.company}
            onChange={handleChange}
            error={errors.company}
          />

            <div className="form-group">
            <button type="submit" className="btn btn-success">
              Enregistrer
            </button>
            <Link to="/customers" className="btn btn-link">
              Retour à la liste
            </Link>
          </div>
        </form> }
    </> );
}
 
export default CustomerPage;