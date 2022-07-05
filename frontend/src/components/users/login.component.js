import React, { Component } from 'react';
import axios from 'axios';
import './LogIn.css';
import {Link} from 'react-router-dom';
class LogIn extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/';
      return false;
    }
    this.state = {
      email: '',
      password: '',
      error:null,
    };
  }

  onChangeVal = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  onSubmit = (event) => {
    event.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(user);

    axios
      .post('http://localhost:3000/users/login', user)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        window.location = '/';
      })
      .catch((err) => {console.log(err)
        this.setState({ error: err.response.data.message });
        setTimeout(() => {
          this.setState({ error: null });
        }, 3000);
      });

    //
  };
  state = {};
  render() {
    return (
      <div>
        <section>
          <div className='imgBX'>
            <img src='/logbg.jpeg' alt='' />
          </div>
          <div className='contentBX'>
            <div className='formBX'>
              <h2>Log In</h2>
              <form onSubmit={this.onSubmit}>
                {
                  this.state.error && <div className='error'>{this.state.error}</div>
                }
                <div className='inputBX'>
                  <label >Email</label>
                  <input
                    type='text'
                    required
                    name='email'
                    value={this.state.email}
                    onChange={this.onChangeVal}
                  />
                </div>
                <div className='inputBX'>
                  <label >Password</label>
                  <input
                    type='password'
                    name='password'
                    value={this.state.password}
                    onChange={this.onChangeVal}
                  />
                </div>
                <div className='inputBX'>
                  <input type='submit' name='' id='' value='Sign In' />
                </div>
                <div className='inputBX'>
                  <p>
                    Don't have an account?<Link to='/users/new'>Sign Up </Link>
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

export default LogIn;
