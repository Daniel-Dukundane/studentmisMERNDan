import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './NavBar.css';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
  //   <div classNameName='Navbar'>

  //     <span classNameName='nav-logo'>Vehicle Management System</span>
  //     <div classNameName={`nav-items ${isOpen && 'open'}`}>
        
  //         <Link to='/'><button>All students</button> </Link>
  //         <Link to='/'><button>All vehicles</button> </Link>
  //  <Link to='/create'><button>Add student </button></Link>
  //  <Link to='/owners/add'><button>Add new owner </button></Link>
  //  <Link to='/vehicle/add'><button>Add new vehicle </button></Link>
  //  <Link to='/search'><button>Search student </button></Link>
       
  //     </div>
  //     <div
  //       classNameName={`nav-toggle ${isOpen && 'open'}`}
  //       onClick={() => setIsOpen(!isOpen)}
  //     >
  //       <div classNameName='bar'></div>
  //     </div>
  //   </div>
  <div>
<nav className="navbar navbar-expand-lg navbar-dark bg-white static-top">
  <div className="container">
    <a className="navbar-brand" href="#">
      <img src="/rralg.png" alt="..." height="36" style={{width:"150px",height:"130px"}}/>
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div>
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link to='/'>All vehicles</Link>
        </li>
        <li className="nav-item">
          <Link to='/vehicle/add'>Add new vehicle</Link>
        </li>
        <li className="nav-item">
          <Link to='/owners/add'>Add new owner</Link>
        </li>

      </ul>
    </div>
  </div>
</nav>
  </div>
  );
};

export default Navbar;
