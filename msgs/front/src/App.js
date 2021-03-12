import logo from './logo.svg';
import './App.css';
import socketClient from "socket.io-client"
import {React, Component} from "react";
class TextEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init : "",   
      text : "",
      typing : false, value: "", isIn : false}
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleKeyPressLookup = this.handleKeyPressLookup.bind(this);
    this.submitMessageContent = this.submitMessageContent.bind(this);
    
    this.socket = socketClient("http://localhost:5070", {"transport":["websocket"]});
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
  };


   handleKeyPressLookup(e){
    let x;
    if (e.keyCode === 8){ x = false; } else{ x = true }
    this.setState({isIn : x});
    console.log(e.target.value);
    }

  
  componentDidMount(){
    this.socket.on("chat message", msg => {
      this.setState({messages: [ ...this.state.messages , msg]}) ;
    });
  }


  render(){
    return (
      <div className = "TextBox">
         <form id="form" action = "">
          <input id="input" autoComplete="off" onKeyDown = {this.handleKeyPressLookup} onChange={this.handleUpdate}  value = {this.state.value}/><button onClick={this.submitMessageContent} >Send</button>
        </form>
      </div>
      );
  }
};

   



//this.props.msgBuffer.map(
              //message => <li key={message.time}>{message.content} </li> )
class MessageDisplayBox extends Component{
  constructor(props) {
    super(props);
    this.state = {data: this.props.msgBuffer};
    }
    //this.receiveSocketEmission = this.receiveSocketEmission.bind(this); };
    render() {
      return (
      <ul id="messages">{ 
        }</ul>

  );
    }
 } 

class MessageBox extends Component{
  constructor(props){
    super(props);
    this.state = { msgBuffer : [] };
    this.loadMessages = this.loadMessages.bind(this);
  }




  loadMessages = async () => {
    //let headers = new Headers()
  let headers = {"Access-Control-Allow-Origin": "*","Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT","Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"};
    const options = {method: "GET",headers: headers, mode: "cors", cache: "default"}

    //req.mode = "no-cors";
    console.log(options);
    console.log(JSON.stringify(options));
    console.log("getting messages in react");
    const res = await fetch("http://localhost:5070/api/load_msgs", options);
    console.log(res);
    const outcome =  res;
    this.setState({msgBuffer: [ ...this.state.msgBuffer , outcome]});
    console.log(JSON.stringify(outcome));
    console.log("messages successfully retrieved");
  };

  render(){
    return (
    <div className="MessageBox" >
      <MessageDisplayBox msgBuffer={this.msgBuffer} />
      <TextEntry />
      <input type="button" onClick={this.loadMessages} value="load messages saved on mongo" />
    </div>
    );
  }
}






function App() {
  return (
    <div className="App">
        
        <MessageBox />
    </div>
  );
}

export default App;
