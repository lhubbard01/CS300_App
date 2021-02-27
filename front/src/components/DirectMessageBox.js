import React from "react";
import MessageCore from "./Message";
import {TextEntryField, TextDisplayBox} from "./mainpage";

import OtherUser from "./OtherUser";
const Component = React.Component;


class DirectMessageBox extends Component { 
  constructor(props) {
    super(props);
    this.string_ = "Hey man hows it going, hopefully this wraps if i put in the attribute haha";
    this.state = {msg : (props.msg ? props.msg : "Aa"),

      postId: "0",
      clickCount: 0

    };
    this.child = React.createRef(); 
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    


  handleSubmit(event){
      this.setState({ clickCount: this.state.clickCount + 1 }, () => {
          console.log(this.state.clickCount, "yes");});
      //event.preventDefault();

      const requestOptions = { 
        method: "POST",
        headers: {"Content-Type" : "application/json" },                                                                                                                  
        body: JSON.stringify({title: "EXAMPLE"})
      };

      fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
        .then(response => response.json())
        .then(data => this.setState({postId: data.id}));
  
        const user = this.state.clickCount.toString();
        const date = new Date();
        const new_message = new MessageCore(this.state.postId, user, date, this.state.postId)
        this.child.current.updateText(new_message); //setState({update: new_message});



  

  }

  render() {
    return (
      <div className="msg">
        <OtherUser name="john" />
        <TextDisplayBox ref={this.child} /> 
        <TextEntryField text={this.state.clickCount} />
        <input type="submit" value="send" />
        <input type="button" value="send post" onClick={this.handleSubmit} />
      </div>
    );
  }
}

export default DirectMessageBox;
