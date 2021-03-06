import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Dropdown,
    DropdownToggle, DropdownMenu, DropdownItem
  } from 'reactstrap';

import { axiosRequest as axios } from '../../utils/api'


//Redux import
import { connect } from 'react-redux'
import { 
  GetDriverList, 
  GetRider, 
  UpdateRider, 
  DeleteRider,
  GetDriverReviews,
 } from '../State/actions/actions';

import SearchForm from './SearchForm'
import Profile from "./Profile"
import Reviews from "./Reviews"

//styling
import "./Users.css"

const Rider = (props) => {
  const [data, setData] = useState([]);
  const [filterState, setFilterState] = useState([]);
  const Filter = (input) => {            //Dont forget to change rider.location.name to rider.location
    setFilterState(data.filter((rider => rider.location.toLowerCase().includes(input.toLowerCase()))))
  }
  
  const drivers = props.drivers
  const editing = props.editing
  console.log(editing)

  useEffect(() => {
    props.GetDriverReviews()
  }, [])

  useEffect(() => {
    axios()
    .get(`https://rideforlife-backend.herokuapp.com/api/drivers`)
    .then(response => {
      console.log(response);
      setFilterState(response.data)
      setData(response.data)
      console.log(data);
})
    .catch(error => {
      console.error('Server Error', error);
    });
  }, []);

  const userID = props.user.rider_id;
  const profileInfo = props.user
  useEffect(() => {
    props.GetRider('rider', userID)
  }, [])



    return(

    <div className="Rider">

      <Profile />

      <SearchForm className = {editing ? 'hidden' : '' } setFilterState={Filter} />
      <div className = {editing ? 'hidden' : 'driver-array' }>
        <br />
      {filterState && filterState.map(item => (
      <Card id="user-cards" className='user-cards' key={item.driver_id}>
        <CardBody>
          <CardTitle tag='h2'>{item.name}</CardTitle>
            <CardSubtitle>Location: {item.location}</CardSubtitle>
            <CardSubtitle>Price: {item.price}</CardSubtitle>
            <CardSubtitle>Bio: {item.bio}</CardSubtitle>
          <Button className="request-button" outline color="primary">Request</Button>
        </CardBody>
        
        <div className="reviews-container">
          <Reviews />
        </div>

      </Card>))}
      </div>
    </div>
    )
}


const mapStateToProps = state => {
    return {
    reviews: state.reviews,
    user: state.user,
    drivers: state.drivers,
    currentUser: state.currentUser,
    editing: state.editing
  }
}

const mapDispatchToProps = {
  GetDriverList,
  GetRider,
  UpdateRider,
  DeleteRider,
  GetDriverReviews
}

export default connect(
mapStateToProps,
mapDispatchToProps
)(Rider)