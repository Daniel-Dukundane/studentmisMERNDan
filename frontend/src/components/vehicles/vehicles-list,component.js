import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../navbar.component';
import "bootstrap/dist/css/bootstrap.min.css";

const Vehicle = props => (
  <tr>
    <td >{props.vehicle.owner}</td>
    <td>{props.vehicle.chasisNumber}</td>
    <td>{props.vehicle.company}</td>
    <td>{props.vehicle.year}</td>
    <td>{props.vehicle.price}</td>
    <td>{props.vehicle.plateNumber}</td>
    <td>{props.vehicle.modelname}</td>
    
    <td>
      <Link to={"/edit/"+props.vehicle._id}>EDIT</Link> | <a href="#" onClick={() => { props.deleteVehicle(props.vehicle._id) }}>DELETE</a>
    </td>
  </tr>
)

export default class VehiclesList extends Component {
  constructor(props) {
    super(props);

    this.state = {vehicles: []};
  }

  componentDidMount() {
    axios.get('http://localhost:3000/vehicles/')
      .then(response => {
        this.setState({ vehicles: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteVehicle= (id) => {
    axios.delete('http://localhost:3000/vehicles/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      vehicles: this.state.vehicles.filter(el => el._id !== id)
    })
  }

  vehicleList() {
    return this.state.vehicles.map(currentvehicle => {
      return <Vehicle vehicle={currentvehicle} deleteVehicle={this.deleteVehicle} key={currentvehicle._id}/>;
    })
  }

  render() {
    return (
      <div className='container'>
        <Navbar />
        <div className='container'>
        <h1 style={{marginTop:"100px",marginBottom:"50px",fontWeight:700}}>RRA Vehicles MIS</h1>

        <h1 style={{marginTop:"100px",marginBottom:"50px",fontWeight:700}}>Vehicles History</h1>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Owner</th>
                <th scope="col">Chasis Number</th>
                <th scope="col">Company</th>
                <th scope="col">Year</th>
                <th scope="col">Plate Number</th>
                <th scope="col">Model Name</th>
                <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            { this.vehicleList() }
          </tbody>
        </table>
        </div>




      </div>
    )
  }
}