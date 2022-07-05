import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='Navbar'>
      <span className='nav-logo'>STUDENTS MANAGEMENT SYSTEM</span>
      <div className={`nav-items ${isOpen && 'open'}`}>
        
          <Link to='/'><button>All students</button> </Link>
   <Link to='/create'><button>Add student </button></Link>
   <Link to='/search'><button>Search student </button></Link>
       
      </div>
      <div
        className={`nav-toggle ${isOpen && 'open'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='bar'></div>
      </div>
    </div>
  );
};

export default Navbar;
