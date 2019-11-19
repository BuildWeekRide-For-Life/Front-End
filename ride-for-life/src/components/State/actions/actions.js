//axios
import { axiosRequest as axios, setToken } from '../../../utils/api'

//actions
/* ----- ADMIN ----- */

//get rider
// export const GET_ADMIN_START = "GET_ADMIN_START"
// export const GET_ADMIN_SUCCESS = "GET_ADMIN_SUCCESS"
// export const GET_ADMIN_FAILED = "GET_ADMIN_FAILED"

// //add new rider
// export const ADD_ADMIN_START = "ADD_ADMIN_START"
// export const ADD_ADMIN_SUCCESS = "ADD_ADMIN_SUCCESS"
// export const ADD_ADMIN_FAILED = "ADD_ADMIN_FAILED"

// //update
// export const UPDATE_ADMIN_START = "UPDATE_ADMIN_START"
// export const UPDATE_ADMIN_SUCCESS = "UPDATE_ADMIN_SUCCESS"
// export const UPDATE_ADMIN_FAILED = "UPDATE_ADMIN_FAILED"

// // delete
// export const DELETE_ADMIN_START = "DELETE_ADMIN_START"
// export const DELETE_ADMIN_SUCCESS = "DELETE_ADMIN_SUCCESS"
// export const DELETE_ADMIN_FAILED = "DELETE_ADMIN_FAILED"


/* ----- RIDERS ----- */

//get rider
export const GET_RIDER_START = "GET_RIDER_START"
export const GET_RIDER_SUCCESS = "GET_RIDER_SUCCESS"
export const GET_RIDER_FAILED = "GET_RIDER_FAILED"

//add new rider
export const ADD_RIDER_START = "ADD_RIDER_START"
export const ADD_RIDER_SUCCESS = "ADD_RIDER_SUCCESS"
export const ADD_RIDER_FAILED = "ADD_RIDER_FAILED"

//update
export const UPDATE_RIDER_START = "UPDATE_RIDER_START"
export const UPDATE_RIDER_SUCCESS = "UPDATE_RIDER_SUCCESS"
export const UPDATE_RIDER_FAILED = "UPDATE_RIDER_FAILED"

// delete
export const DELETE_RIDER_START = "DELETE_RIDER_START"
export const DELETE_RIDER_SUCCESS = "DELETE_RIDER_SUCCESS"
export const DELETE_RIDER_FAILED = "DELETE_RIDER_FAILED"



/* ----- DRIVERS ----- */
//get driver
export const GET_DRIVER_START = "GET_DRIVER_START"
export const GET_DRIVER_SUCCESS = "GET_DRIVER_SUCCESS"
export const GET_DRIVER_FAILED = "GET_DRIVER_FAILED"

//add new rider
export const ADD_DRIVER_START = "ADD_DRIVER_START"
export const ADD_DRIVER_SUCCESS = "ADD_DRIVER_SUCCESS"
export const ADD_DRIVER_FAILED = "ADD_DRIVER_FAILED"

//update
export const UPDATE_DRIVER_START = "UPDATE_DRIVER_START"
export const UPDATE_DRIVER_SUCCESS = "UPDATE_DRIVER_SUCCESS"
export const UPDATE_DRIVER_FAILED = "UPDATE_DRIVER_FAILED"

// delete
export const DELETE_DRIVER_START = "DELETE_DRIVER_START"
export const DELETE_DRIVER_SUCCESS = "DELETE_DRIVER_SUCCESS"
export const DELETE_DRIVER_FAILED = "DELETE_DRIVER_FAILED"


//actions
/* ----- RIDERS ----- */
export const getRider = () => {
    return dispatch => {
        dispatch({ type: GET_RIDER_START })
        axios()
            .get('/api/riders')
            .then(response => {
                dispatch({ type: GET_RIDER_SUCCESS, payload: response.data })
            })
            .catch(error => {
                dispatch({ type: GET_RIDER_FAILED, payload: error})
            })
    }
}

export const addRider = (rider) => {
    return dispatch => {
        dispatch({ type: ADD_RIDER_START, rider })
        axios()
            .post('/api/auth/register', rider)
            .then(response => {
                dispatch({ type: ADD_RIDER_SUCCESS, payload: response.data })
            })
            .catch(error => {
                dispatch({ type: ADD_RIDER_FAILED, payload: error})
            })
    }
}

export const updateRider = (rider) => {
    return dispatch => {
        dispatch({ type: UPDATE_RIDER_START, rider })
        axios()
            .put(`/api/riders/:id`, rider)
            .then(response => {
                dispatch({ type: UPDATE_RIDER_SUCCESS, payload: response.data })
            })
            .catch(error => {
                dispatch({ type: UPDATE_RIDER_FAILED, payload: error})
            })
    }
}

export const deleteRider = () => {
    return dispatch => {
        dispatch({ type: GET_RIDER_START })
        axios()
            .delete(`/api/riders/:id`)
            .then(response => {
                dispatch({ type: GET_RIDER_SUCCESS, payload: response.data })
            })
            .catch(error => {
                dispatch({ type: GET_RIDER_FAILED, payload: error})
            })
    }
}

/* ----- DRIVERS ----- */
export const getDriver = () => {
    return dispatch => {
        dispatch({ type: GET_DRIVER_START })
        axios()
            .get('/api/driver')
            .then(response => {
                dispatch({ type: GET_DRIVER_SUCCESS, payload: response.data })
                setToken()
            })
            .catch(error => {
                dispatch({ type: GET_DRIVER_FAILED, payload: error})
            })
    }
}

export const AddDriver = (driver) => {
    return dispatch => {
        dispatch({ type: ADD_DRIVER_START })
        axios() //without authorization since I need to add a driver to get a token.
            .post('/api/auth/register', driver)
            .then(response => { //hey we have a new driver, here's your updated state.
                console.log('Response', response)
                dispatch({ type: ADD_DRIVER_SUCCESS, payload: response })
                // setToken()
            })
            .catch(error => {
                dispatch({ type: ADD_DRIVER_FAILED, payload: error})
                console.log(error.response)
            })
    }
}

//update a specific driver's profile.
export const updateDriver = (driver) => {
    return dispatch => {
        dispatch({ type: UPDATE_DRIVER_START, driver })
        axios()
            .put(`/api/drivers/:id`, driver)
            .then(response => {
                dispatch({ type: UPDATE_DRIVER_SUCCESS, payload: response.data })
            })
            .catch(error => {
                dispatch({ type: UPDATE_DRIVER_FAILED, payload: error})
            })
    }
}

export const deleteDriver = () => {
    return dispatch => {
        dispatch({ type: DELETE_DRIVER_START})
        axios()
            .delete(`/api/drivers/:id`)
            .then(response => {
                dispatch({ type: DELETE_DRIVER_SUCCESS, payload: response.data })
            })
            .catch(error => {
                dispatch({ type: DELETE_DRIVER_FAILED, payload: error})
            })
    }
}