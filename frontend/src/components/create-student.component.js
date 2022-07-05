import React, { Component } from 'react';
import axios from 'axios';

class CreateStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      classname: '',
      phone: '',
    };

    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/users/login';
      return false;
    }
  }

  onChangename = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  onChangeemail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  onChangeclassname = (event) => {
    this.setState({
      classname: event.target.value,
    });
  };
  onChangephone = (event) => {
    this.setState({
      phone: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const student = {
      name: this.state.name,
      email: this.state.email,
      classname: this.state.classname,
      phone: this.state.phone,
    };
    console.log(student);

    const token = localStorage.getItem('token');
    axios
      .post('http://localhost:3000/students/add', student, {
        headers: {
            Authorization:token,
        },
        })
      .then((res) => {
        console.log(res.data)

        window.location = '/';
      })
      .catch((err) => console.log(err));
  };

  state = {};
  render() {
    return (
      <div>
        <h3>Create New Perfect Student</h3>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Name: </label>
            <input
              type='text'
              required
              className='form-control'
              value={this.state.name}
              onChange={this.onChangename}
            />
          </div>
          <br />
          <div className='form-group'>
            <label>Email: </label>
            <input
              type='text'
              required
              className='form-control'
              value={this.state.email}
              onChange={this.onChangeemail}
            />
          </div>
          <br />
          <div className='form-group'>
            <label>Class: </label>
            <input
              type='text'
              required
              className='form-control'
              value={this.state.classname}
              onChange={this.onChangeclassname}
            />
          </div>
          <br />
          <div className='form-group'>
            <label>Phone: </label>
            <input
              type='text'
              required
              className='form-control'
              value={this.state.phone}
              onChange={this.onChangephone}
            />
          </div>
          <br />
          <div className='form-group'>
            <input
              type='submit'
              value='Create User'
              className='btn btn-primary'
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateStudent;
