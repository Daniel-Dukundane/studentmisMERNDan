import React, { Component } from 'react';
import axios from 'axios';
import './Vehicles.css';
import {Link} from 'react-router-dom';

class CreateVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: '',
      chasisNumber: '',
      company: '',
      year: '',
      price: '',
      plateNumber : '',
        modelname: '',
        owners: [],
    };

    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/users/login';
      return false;
    }
  }
  componentDidMount() {
    axios.get('http://localhost:3000/owners/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            owners: response.data.map(owner => owner.name),
            owner: response.data[0].name,
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }


  onChangeVal = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const vehicle = {
        owner: this.state.owner,
        chasisNumber: this.state.chasisNumber,
        company: this.state.company,
        year: this.state.year,
        price: this.state.price,
        plateNumber: this.state.plateNumber,
        modelname: this.state.modelname,

      
    };
    console.log(vehicle);

    const token = localStorage.getItem('token');
    axios
      .post('http://localhost:3000/vehicles/add', vehicle, {
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
              <h2>Register Vehicle</h2>
              <form onSubmit={this.onSubmit}>
                {
                  this.state.error && <div className='error'>{this.state.error}</div>
                }
                <div className='inputBX'>
                <label>Owner </label>
          <select 
              required
                name='owner'
              value={this.state.owner}
              onChange={this.onChangeVal}>
              {
                this.state.owners.map(function(owner) {
                  return <option 
                    key={owner}
                    value={owner}>{owner}
                    </option>;
                })
              }
          </select>
                </div>
                <div className='inputBX'>
                  <label >Chasis Number</label>
                  <input
                    type='text'
                    placeholder='ANN12334'
                    required
                    name='chasisNumber'
                    value={this.state.chasisNumber}
                    onChange={this.onChangeVal}
                  />
                </div>
                <div className='inputBX'>
                  <label >Manufacture Company</label>
                  <input
                    type='text'
                    placeholder='Toyota'
                    required
                    name='company'
                    value={this.state.company}
                    onChange={this.onChangeVal}
                  />
                </div>
                <div className='inputBX'>
                  <label >Year of Manufacture</label>
                  <input
                    type='text'
                    placeholder='2020'
                    required
                    name='year'
                    value={this.state.year}
                    onChange={this.onChangeVal}
                  />
                </div>
                <div className='inputBX'>
                  <label >Price</label>
                  <input
                    type='text'
                    placeholder='100000'
                    required
                    name='price'
                    value={this.state.price}
                    onChange={this.onChangeVal}
                  />
                </div>
                <div className='inputBX'>
                  <label >Plate Number</label>
                  <input
                    type='text'
                    placeholder='RAC234M'
                    required
                    name='plateNumber'
                    value={this.state.plateNumber}
                    onChange={this.onChangeVal}
                  />
                </div>
                <div className='inputBX'>
                  <label >Model Name</label>
                  <input
                    type='text'
                    placeholder='Toyota Corolla'
                    required
                    name='modelname'
                    value={this.state.modelname}
                    onChange={this.onChangeVal}
                  />
                </div>
                <div className='inputBX'>
                  <input type='submit' name='' id='' value='Register Vehicle' />
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

export default CreateVehicle;
