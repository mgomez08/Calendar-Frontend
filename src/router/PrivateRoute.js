import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({
    isLoggedIn,
    component: Component,
    ...rest
}) => {
    // const {location:{pathname, search}} = rest;
    // localStorage.setItem('lastPath', pathname+search);
    return (
        <Route 
        {...rest} 
        component={ (props) =>(
            ( isLoggedIn )
            ? <Component {...props} />
            : <Redirect to="/login" />
        )}
        />
    )
}

PrivateRoute.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,
}
