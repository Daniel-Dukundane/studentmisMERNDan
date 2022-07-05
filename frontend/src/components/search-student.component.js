import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Student = (props) => (
  <tr>
    <td>{props.student.name}</td>
    <td>{props.student.email}</td>
    <td>{props.student.classname}</td>
    <td>{props.student.phone}</td>
    <td>
      <Link to={'/edit/' + props.student._id}>EDIT</Link> |{' '}
      <a
        href='#'
        onClick={() => {
          props.deleteStudent(props.student._id);
        }}
      >
        DELETE
      </a>
    </td>
  </tr>
);

class SearchStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      students: [],
    };
  }
  studentList() {
    return this.state.students.map((currentstudent) => {
      return (
        <Student
          key={currentstudent._id}
          student={currentstudent}
          deleteStudent={this.deleteStudent}
        />
      );
    });
  }
  onSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        'http://localhost:3000/students/search?text=' + this.state.searchInput
      )
      .then((response) => {
        this.setState((prevState) => ({
          ...prevState,
          students: response.data,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  state = {};
  render() {
    return (
      <div>
        <h3>Search Student</h3>
        <form onSubmit={(e) => this.onSubmit(e)}>
          <div className='form-group'>
            <label>Search: </label>
            <input
              value={this.state.searchInput}
              onChange={(e) =>
                this.setState((prevState) => ({
                  ...prevState,
                  searchInput: e.target.value,
                }))
              }
              type='text'
              className='form-control'
            />
          </div>
          <br />
          <div className='form-group'>
            <input type='submit' value='Search' className='btn btn-primary' />
          </div>
        </form>
        <table className='table'>
          <thead className='thead-light'>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Class</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.studentList()}</tbody>
        </table>
      </div>
    );
  }
}

export default SearchStudent;
