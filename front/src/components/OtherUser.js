import React from "react";
const Component = React.Component;

class OtherUser extends Component {
   constructor(props) {
     super(props);
     this.state = {
       name: props.name
     }
  }
  render(){
    return (
      <div className="OtherUser" >








    <p>{this.state.name}</p>
   </div>
   );
  }
}

export default OtherUser;
