import React, { useEffect } from 'react'
import {Route} from 'react-router-dom'

//component imports
import Driver from './Driver'
import Rider from './Rider'
import Logout from '../Login - Logout - Signup - PrivateRoute/Logout'
import PrivateRoute from '../Login - Logout - Signup - PrivateRoute/PrivateRoute'

//redux connection
import { connect } from 'react-redux'

import { 

    //rider
    UpdateRider,
    DeleteRider,

    //driver
    UpdateDriver,
    DeleteDriver 
} from '../State/actions/actions';



const Dashboard = (props) => {

    //checking adding components together. Must be logged in and a driver/rider.
    const loggedIn = props.loggedIn;
    const driver = props.user.role === 'driver';
    const rider = props.user.role === 'rider';

    console.log('Dashboard props', props)

    
    if (loggedIn && driver) {
        return(
            <div>
                <Route exact path='/logout' component={Logout} />
                <h1> Welcome to the Driver dashboard. </h1>
                <PrivateRoute exact path='/driver' component={Driver} />
            </div>
        )
    }
    
    if(loggedIn && rider) {
        return(
            <div>
                <Route exact path='/logout' component={Logout} />
                <h1> Welcome to the Rider dashboard. </h1>
                <PrivateRoute exact path='/rider' component={Rider} />
            </div>
        )
    }

}

const mapStateToProps = state => {
        return {
        user: state.user,
        loggedIn: state.loggedIn
    }
}

const mapDispatchToProps = {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)