import logo from './logo.svg';
import './App.css';
import socketClient from "socket.io-client"
import {React, Component} from "react";
class MessageDisplayBox extends Component{
  constructor(props) {
    super(props);
    this.state = {
    init : "",messages : [],text : "",typing : false, value: "", isIn : false
    }


    //this.receiveSocketEmission = this.receiveSocketEmission.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleKeyPressLookup = this.handleKeyPressLookup.bind(this);
    this.loadMessages = this.loadMessages.bind(this);
    this.submitMessageContent = this.submitMessageContent.bind(this);
    
    this.socket = socketClient("http://localhost:5070", {"transport":["websocket"]});
  };

  
  handleKeyPressLookup(e){
    let x;
    if (e.keyCode === 8){ x = false; } else{ x = true }
    this.setState({isIn : x});
    console.log(e.target.value);
    }

  

  handleUpdate(e){

    //socket = socketClient("http://localhost:5070", {"transport":["websocket"]});
    this.setState({value: e.target.value}); //prev.state.value != prev.state.init  ? prev.state.value + e.target.value : prev.state.init })  );

    const packet = {add:this.state.isIn , value: e.target.value};
    this.socket.emit("user typing",  packet);
    this.setState({isIn : false});
  }
  submitMessageContent(event){
    const data = {"message" : this.state.value}
    this.socket.emit("chat message", data);
    this.socket.emit("submit msg", data);
    this.setState({"value": ""});
    
  }
  componentDidMount(){
    this.loadMessages();
    this.socket.on("chat message", msg => {
      alert(msg);
      alert(JSON.stringify(this.state.messages));
      this.setState({messages: [ ...this.state.messages , msg]}) ;
      alert(JSON.stringify(this.state.messages));
    });
  }

  loadMessages = async () => {
    const req = {
      method: "GET",headers: {"Content-Type":"application/json"},

    }
     
    req.mode = "no-cors";
    fetch("http://localhost:5070/api/load_msgs", req).then( async res => {
      let outcome = await res.json();
      this.setState({messages: outcome.messages});
    });
    };


  render(){

  

    return (
      <div className = "TextBox">
        <ul id="messages">{ 
            this.state.messages.map(
              message => <li key={message.time}>{message.content} </li> )
        }</ul>

        <form id="form" action = "">
          <input id="input" autoComplete="off" onKeyDown = {this.handleKeyPressLookup} onChange={this.handleUpdate}  value = {this.state.value}/><button onClick={this.submitMessageContent} >Send</button>
        </form>
      </div>
      );
  }
};

function App() {
  return (
    <div className="App">
        <MessageDisplayBox />
    </div>
  );
}

export default App;
