import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Link,Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar.component';
import SearchStudent from './components/search-student.component';
import CreateUser from './components/users/new-user.component';
import LogIn from './components/users/login.component';
import CreateOwner from './components/owners/create-owner.component';
import CreateVehicle from './components/vehicles/create-vehicle.component';
import VehiclesList from './components/vehicles/vehicles-list,component';
import EditVehicle from './components/vehicles/edit-vehicle.component';

function App() {
  return (
    <div className="TodoApp">
    <Router>
    
 
    
      <Routes>
      <Route path='/' exact element={<VehiclesList />} />
      <Route path='/edit/:id' element={<EditVehicle />}/>
      <Route path='/owners/add' element={<CreateOwner />}/>
      <Route path='/vehicle/add' element={<CreateVehicle />}/>
      <Route path='/search' element={<SearchStudent />} />
      {/* new user */}
      <Route path='/users/new' element={<CreateUser />} />
      <Route path='/users/login' element={<LogIn />} />

   
      </Routes>
      
    </Router>
  </div>
  );
}

export default App;
