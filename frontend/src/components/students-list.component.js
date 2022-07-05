import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navbar from './navbar.component';

const Student = props => (
    <tr>
      <td>{props.student.name}</td>
      <td>{props.student.email}</td>
      <td>{props.student.classname}</td>
      <td>{props.student.phone}</td>
      <td>
        <Link to={"/edit/"+props.student._id}>EDIT</Link> | <a href="#" onClick={() => { props.deleteStudent(props.student._id) }}>DELETE</a>
      </td>
    </tr>
  )
  

class StudentsList extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/users/login';
      return false;
    }

    this.state = {
      students: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/students/')
        .then((response) => {
            this.setState({ students: response.data });
        }
        )
        .catch((error) => {
            console.log(error);
        }
        );
    }

  deleteStudent = (id) => {
    axios.delete('http://localhost:3000/students/' + id)
        .then(response => {
            console.log(response.data);
        }
        )
        .catch(error => {
            console.log(error);
        }
        );
        this.setState({
            students: this.state.students.filter(student => student._id !== id)
        })
  }

studentList() {
    return this.state.students.map(currentstudent => {
        return <Student key={currentstudent._id} student = {currentstudent} deleteStudent={this.deleteStudent}/>

    }
    )
}
  state = {};
  render() {
    return (
        <div>
             <Navbar />
        <h3>STUDENT LIST</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name :</th>
              <th>Email</th>
              <th>Class</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.studentList() }
          </tbody>
        </table>
      </div>
    );
  }
}

export default StudentsList;
