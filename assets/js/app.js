import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage from "./pages/InvoicesPage";
import HomePage from "./pages/HomePage";


// On apporte le CSS personnalisé
require("../css/app.css");

const App = () => {
    return (
        <HashRouter>
            <Navbar />

            <main className="container pt-5">
            <Switch>

            <Route path="/customers" component={CustomersPage} />
            <Route path="/invoices" component={InvoicesPage} />
            <Route path="/" component={HomePage} />
            </Switch>
            </main>
        </HashRouter>
      );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);