import React, {useContext} from 'react';
import { Route, Redirect } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';

const PrivateRoute = ({path, component})=>{
    const {isAthenticated} = useContext(AuthContext);
    return isAthenticated ? (< Route path={path} component={component} /> ): (<Redirect to="/login" />);
}
  
export default PrivateRoute;