import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar(props) {
let {userData,logOut} =props;

  return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <div className="navbar-brand" >Noxe</div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
  {/* {userData?      */}
      
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="movies">movies</Link>
        </li>


        <li className="nav-item">
          <Link className="nav-link" to="tvshow">Tvshows</Link>
        </li>

      </ul>
      
      {/* :""} */}

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0"> 
     {userData?  
     <>

     <li className="nav-item">
       <Link className="nav-link" to="profile"
     > <h5>{userData.first_name}</h5></Link>
     </li>
     <li className="nav-item">
       <span className="nav-link" onClick={logOut}>
       Logout
        </span>
     </li>
     </>
     :<>
     <li className="nav-item">
       <Link className="nav-link" to=''>Login</Link>
     </li>
     <li className="nav-item">
       <Link className="nav-link" to='register'>Register</Link>
     </li>
     </>}

  
 
   </ul>
    </div>
  </div>
</nav>)
}
