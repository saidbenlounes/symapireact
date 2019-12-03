import React from 'react';

const Navbar = (props) =>{

	return(<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <a className="navbar-brand" href="#">Symreact</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarColor01">
    <ul className="navbar-nav mr-auto">
     
      <li className="nav-item">
        <a className="nav-link" href="#">Clients</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">factures</a>
      </li>
      
    </ul>
	<ul className="navbar-nav ml-auto">
		<li className="nav-item">
	    	<a className="btn" href="#">Inscreption</a>
	  	</li>
		<li className="nav-item">
	    	<a className="btn btn-success" href="#">Connexion</a>
	  	</li>
	  	
	  	<li className="nav-item">
	    	<a className="btn btn-danger" href="#">Deconnexion </a>
	  	</li>
	</ul>
  
  </div>
</nav> );
};
export default Navbar;