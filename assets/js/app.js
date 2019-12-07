import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, withRouter, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AuthAPI from "./services/authAPI";
import AuthContext from "./contexts/AuthContext"
import PrivateRoute from "./components/PrivateRoute";
import CustomerPage from "./pages/CustomerPage";
import InvoicePage from "./pages/InvoicePage";
import RegisterPage from "./pages/RegisterPage";


// On apporte le CSS personnalisé
require("../css/app.css");
AuthAPI.setup();

 

const App = () => {
    const [isAthenticated, setIsAthenticated] = useState(AuthAPI.isAthenticated());
    console.log(isAthenticated);
    // ajouter les props a la navbar pour utiliser history
    const NavbarWithRouter = withRouter(Navbar);

    return (

        <AuthContext.Provider value = {{
            isAthenticated,
            setIsAthenticated        
        }}>
         
            <HashRouter>
                <NavbarWithRouter />

                <main className="container pt-5">
                    <Switch>
                        <PrivateRoute path="/customers/:id"  component={CustomerPage} />
                        <PrivateRoute path="/customers"  component={CustomersPage} />
                        <PrivateRoute path="/invoices/:id" component={InvoicePage} />
                        <PrivateRoute path="/invoices" component={InvoicesPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/" component={HomePage} />
                    </Switch>
                </main>
            </HashRouter>
           
        </AuthContext.Provider>
      );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);