import React from "react";
import Feed from "./components/Feed";
import MessagePreviewColumn from "./components/MessagePreviewColumn";
import NavBar from "./components/NavBar";
import { Link } from "react-router-dom";
const Component = React.Component;

class Home extends Component{
  render(){






























    return (
      
      <div className="MainPage">
        <NavBar />
        <h1>Product</h1>
        <Feed />
        <MessagePreviewColumn />
        <Link to={"./messages"}>
        <button variant="raised">
          Messages
        </button>
    </Link>
    </div>
    );


  }
}








export default Home;
