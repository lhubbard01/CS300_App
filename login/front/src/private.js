const { Route,  Redirect}  = require("react-router-dom");
const React = require("react");
const PropTypes = require("prop-types";
const Private = ({ component: Component , auth, ..rest } => (
  <Route {...rest} render = {props => {
    auth.isAuthetnicated ? ( (<Component {...props} />)
    : ( <Redirect to="/api/login"> ); ) }  /> 
);
Private.propTypes = {auth: PropTypes.object.isRequired}

export Private;
