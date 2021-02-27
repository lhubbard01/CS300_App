import React from "react";
import MessageCore from "./Message";
const Component = React.Component;

class PasswordEntryField extends Component{
  constructor (props) {
    super(props);
    this.state = { 
      value: ""
    };




    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
  }

  render() { 
    return (
    <div className="PasswordEntryField">
      <form onSubmit={this.handleSubmit}>
        <input type = "password" value={this.state.value} onChange={this.handleChange} />
      </form>
    </div>
    );
  }
}



class TextEntryField extends Component {
  constructor(props) {
      super(props);
      this.state = {
        text : props.text
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    this.setState({text: event.target.value});
  }
  
  handleSubmit(event){
    event.preventDefault();
  }


  render() { 
    return (
    <div className="TextEntryField">
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.text} onChange={this.handleChange} />
      </form>
    </div>
    );

  }

}
/*function ListItem(props){
  const value = props.value;
  return (<li> {value} </li>);


}
function ChatAsList(props){
  const messages = props.messages;
  alert("CHATASLIST MAPPING");
  const listItems = messages.map((chat)=> <ListItem key={chat.postId.toString()} value={chat.content} />);
  alert(typeof listItems);
  alert(listItems);
  alert("CHATASLIST POST MAPPING");
  return (
    <ul> {listItems} </ul>
  );


}
*/




class TextDisplayBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
  messages: [new MessageCore("000", "1234", new Date(), "000"), new MessageCore("001", "567", new Date(), "001")]
    };
    this.updateText = this.updateText.bind(this);
  }
  updateText(new_message){
    this.setState({  messages : [...this.state.messages, new_message] } );
  }
  render() {
      const messages_render = 
      this.state.messages.map( message => <p>{JSON.stringify(message)}</p>);
      return (
        <div className="TextDisplayBox" >
          {messages_render}
        </div>
      );
    }
}

export { TextEntryField, PasswordEntryField, TextDisplayBox };

