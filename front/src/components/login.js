import React from "react";
import {TextEntryField, PasswordEntryField } from "./mainpage";

const Component = React.Component;
class LoginBox    extends Component {
  constructor(props){
   super(props);
   this.handleSubmit = props.handleSubmit;
   this.state = { btnv: props.value };
   this.fetchP = this.fetchP.bind(this);
   this.fetchU = this.fetchU.bind(this);
  }
  
  handleSubmit(event){

    event.preventDefault();
  }
  









  render() { 
    return (
      <div className="loginBox">
       <TextEntryField text="" fetchU={this.fetchU} /> 
       <PasswordEntryField fetchP={this.fetchP} />
     </div>
    );
  }

}




export default LoginBox;
