import React, { Component } from "react";
import axios from "axios";
import "./LogIn.css";
import { Link } from "react-router-dom";

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      nationalID: "",
      password: "",
      isAdmin: false,
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
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      nationalID: this.state.nationalID,
      password: this.state.password,
      isAdmin: this.state.isAdmin,
    };
    console.log(user);

    axios
      .post("http://localhost:3000/users/add", user)
      .then((res) => {
        console.log(res.data);
        window.location = "/";
      })
      .catch((err) => console.log(err));

    //
  };
  state = {};
  render() {
    return (
      <div>
        <section>
          <div className="imgBX">
            <img src="/logbg.jpg" alt="" />
          </div>
          <div className="contentBX">
            <div className="raal2">
              <img src="/rralg.png" alt="" />
            </div>
            <div className="formBX">
              <h2>Sign Up</h2>
              <form onSubmit={this.onSubmit}>
                <div className="inputBX">
                  <label>Username</label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={this.state.name}
                    onChange={this.onChangeVal}
                  />
                </div>
                <div className="inputBX">
                  <label>Email</label>
                  <input
                    type="text"
                    required
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeVal}
                  />
                </div>
                <div className="inputBX">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    required
                    name="phone"
                    maxLength="10"
                    value={this.state.phone}
                    onChange={this.onChangeVal}
                  />
                </div>
                <div className="inputBX">
                  <label>National ID</label>
                  <input
                    type="text"
                    required
                    name="nationalID"
                    value={this.state.nationalID}
                    onChange={this.onChangeVal}
                  />
                </div>
                <div className="inputBX">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    minLength={6}
                    value={this.state.password}
                    onChange={this.onChangeVal}
                  />
                </div>
                <div className="inputBX">
                  <input type="submit" name="" id="" value="Sign Up" />
                </div>
                <div className="inputBX">
                  <p>
                    Have an account? <Link to="/users/login">Log In </Link>
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

export default CreateUser;
