import React, { Component } from 'react';
import axios from 'axios';
import './Owners.css';
import {Link} from 'react-router-dom';

class CreateOwner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nationalID: '',
      phoneNumber: '',
      address: '',
    };

    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/users/login';
      return false;
    }
  }


  onChangeVal = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const owner = {
      name: this.state.name,
        nationalID: this.state.nationalID,
        phoneNumber: this.state.phoneNumber,
        address: this.state.address,
    };
    console.log(owner);

    const token = localStorage.getItem('token');
    axios
      .post('http://localhost:3000/owners/add', owner, {
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
        <section>
          <div className='imgBX'>
            <img src='/logbg.jpg' alt='' />
          </div>
          <div className='contentBX'>
            <div className='formBX'>
              <h2>Register Owner</h2>
              <form onSubmit={this.onSubmit}>
                {
                  this.state.error && <div className='error'>{this.state.error}</div>
                }
                <div className='inputBX'>
                  <label >Names</label>
                  <input
                    type='text'
                    required
                    name='name'
                    value={this.state.name}
                    onChange={this.onChangeVal}
                  />
                </div>
                <div className='inputBX'>
                  <label >National ID</label>
                  <input
                    type='number'
                    required
                    name='nationalID'
                    maxLength="16"
                    value={this.state.nationalID}
                    onChange={this.onChangeVal}
                  />
                </div>
                <div className='inputBX'>
                  <label > Phone Number</label>
                  <input
                    type='text'
                    required
                    name='phoneNumber'
                    maxLength="10"
                    value={this.state.phoneNumber}
                    onChange={this.onChangeVal}
                  />
                </div>
                <div className='inputBX'>
                  <label > Address </label>
                  <input
                    type='text'
                    required
                    name='address'
                    value={this.state.address}
                    onChange={this.onChangeVal}
                  />
                </div>
                <div className='inputBX'>
                  <input type='submit' name='' id='' value='Register Owner' />
                </div>
                <div className='inputBX'>
                  <p>
                    Go back to home page<Link to='/'>  -- Home Page</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default CreateOwner;
