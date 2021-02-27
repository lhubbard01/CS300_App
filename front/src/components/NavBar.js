import { React, Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component{
  render(){
    return (
      <div className="NavBar">
        <Link to={"./home"} >
        <button variant="raised">
        Home
        </button>
        </Link>

      <Link to="./messages">
      <button variant="raised">
      Messaging
      </button>

    </Link>
  </div>

    );
  }
}









export default NavBar;
