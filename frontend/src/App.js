import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Link,Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar.component';
import StudentsList from './components/students-list.component';
import EditStudent from './components/edit-student.component';
import CreateStudent from './components/create-student.component';
import SearchStudent from './components/search-student.component';
import CreateUser from './components/users/new-user.component';
import LogIn from './components/users/login.component';

function App() {
  return (
    <div className="TodoApp">
    <Router>
    
 
    
      <Routes>
      <Route path='/' exact element={<StudentsList />} />
      <Route path='/edit/:id' element={<EditStudent />}/>
      <Route path='/create' element={<CreateStudent />} />
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
