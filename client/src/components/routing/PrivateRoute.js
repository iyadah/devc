import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// function PrivateRoute = ({ component: Component, auth, ...rest }) => (
//     <Route {...rest} render={props => !auth.isAuthenticate && !auth.loading ? 
//         (<Redirect to='/login' />) : (<Component{...props}) 
//     } />
// )

const PrivateRoute = ({
    component: Component,
    auth: { isAuthenticate, loading },
    ...rest
  }) => (
    <Route
      {...rest}
      render={props =>
        !isAuthenticate && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />

        )
      }
    />
  );
  

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(PrivateRoute)

