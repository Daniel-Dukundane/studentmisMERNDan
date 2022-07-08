import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'C:/Users/RCA/Documents/vehiclemis/studentmisMERNDan/frontend/src/utils/withRouter.js';
import { Link } from 'react-router-dom';
class EditVehicle extends Component {
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
  }
  componentDidMount() {
    axios
      .get('http://localhost:3000/vehicles/' + this.props.router.params.id)

      .then((response) => {
        this.setState({
          owner: response.data.owner,
            chasisNumber: response.data.chasisNumber,
            company: response.data.company,
            year: response.data.year,
            price: response.data.price,
            plateNumber: response.data.plateNumber,
            modelname: response.data.modelname,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

      axios.get('http://localhost:3000/owners/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            owners: response.data.map(owner => owner.name),
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
    axios
      .put(
        'http://localhost:3000/vehicles/update/' + this.props.router.params.id,
        vehicle
      )
      .then((res) => {
        console.log(res.data)
        window.location = '/';})
        .catch((error) => {
            console.log(error);
        }
        );

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
              <h2>Edit Vehicle</h2>
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
                  <input type='submit' name='' id='' value='Update Vehicle' />
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

export default withRouter(EditVehicle);
