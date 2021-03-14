import logo from './logo.svg';
import './App.css';
import socketClient from "socket.io-client"
import {React, Component} from "react";

//This is meant to house all necessary components for a chatbox. Renderable behavior can be extended by feeding a different div class name to the MessageBox Component upon import


















class TextEntry extends Component {
  //This comonent is used to fetch the text. It houses 
  //a socket as state, which informs server of typing activity
  //as well as the more obvious chat session interfacing
  constructor(props) {
    super(props);
    this.state = {
      init   : "",   
      text   : "",
      typing : false, 
      value  : "",
      isIn   : false
    };

    

    //callback binding
    this.handleUpdate         = this.handleUpdate.bind(this);
    this.handleKeyPressLookup = this.handleKeyPressLookup.bind(this);
    this.submitMessageContent = this.submitMessageContent.bind(this);
    
    
    this.socket = socketClient("http://localhost:5070", {"transport":["websocket"]});
  }





  handleUpdate(e){
    this.setState({value: e.target.value}); //prev.state.value != prev.state.init  ? prev.state.value + e.target.value : prev.state.init })  );
    

    const packet = {
      add   : this.state.isIn, //this is to be a boolean on server side, for incrementing and decrementing buffer for chat status
      value : e.target.value //actual value of the input
    };
    
    this.socket.emit("user typing",  packet); //socket emission of user typing, just a label for serverside behavior. 
    //packet is the current event frame data for the chat
    this.setState({ 
      isIn : false
    });
  }


  submitMessageContent(event){
    const data = {
      message : this.state.value
    };

    this.socket.emit("chat message", data);
    this.socket.emit("submit msg", data);
    this.setState({
      "value": ""
    });
  };



  
  handleKeyPressLookup(e){
    //supposed to send delete signal back to socket server, handles user typing status
    let x;
    if (e.keyCode === 8){ x = false; } else { x = true }
    this.setState({
      isIn : x

    });
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
          

          <input id     = "input" 
           autoComplete = "off" 
           onKeyDown    = {this.handleKeyPressLookup} 
           onChange     = {this.handleUpdate}  
           value        = {this.state.value}
          />
          <button onClick = {this.submitMessageContent}>Send</button>
        </form>


      </div>
      );
  }
};

   



//this.props.msgBuffer.map(
              //message => <li key={message.time}>{message.content} </li> )






































/*
function splitChats(messageList){
  let curr = "";
  let splitChat = [];
  let subChats = [];

  messageList.forEach(e => {
    if (e.name !== curr.name){
      subChats.push(ChatSectionContainer(curr, splitChat));
      curr = e; 
      splitChat = [];
    }
    else{ splitChat.push(e); }
  }
  return (subChats.map((subchat => { if 

}

class 
  cponstructor(props){
    super(props);
    this.state = {
      name : "",
      img: "",
      time: ""
      }

    this.processChats = this.processChats.bind(this);
  }
  processChats(){
    const MessageObj = this.props.chats[0]
    this.setState({name: MessageObj.name, time: MessageObj.time, img: MessageObj.img});
  }
  render(){
    const chats = this.props.chats[0];
    return( <div className="ChatSection">
      <ul id="submsgs">{chats instanceof Object ? chats.map( d => <li key={d._id}>ChatSectionContainer{d}</li> ) : ""}</ul>
      <
*/








class ChatRow extends Component{
  //houses all attributes for render belonging to message datatype
  constructor(props){
    super(props);
  }
  render() { 
    return (
      <div className="ChatRow">
        <label>{this.props.obj.username}</label><p id="time">{this.props.obj.time}</p>
        <br/>
        <p>{this.props.obj.content}</p><br/>
      </div>
      );
  }
}
class MessageDisplayBox extends Component{
  //Displays all chat rows and handles their generation in render


  constructor(props) {
    super(props);
    }
    //this.receiveSocketEmission = this.receiveSocketEmission.bind(this); };
    render() {
      const msgBuffer = this.props.msgBuffer[0]; 
      //TODO if a chat belongs to a same person, all chats go to single chatSectionContainer, ie picture, name, but then ontent on a per row basis




      return (
      <ul id="messages">{msgBuffer instanceof Object ? msgBuffer.map( d => <li key={d._id}><ChatRow obj={d} /></li> ) : ""}</ul>
             );
    }
 } 

class MessageBox extends Component{
  //Container for a conversation
  constructor(props){
    super(props);
    this.state = { 
      msgBuffer : [] 
      };
    this.loadMessages = this.loadMessages.bind(this);
  };




  loadMessages = async () => {
    //let headers = new Headers()
  
  let headers = {
    "Access-Control-Allow-Origin": "*",
//    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    //"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  };
  const options = {
    method  : "GET",
    headers : headers,
    mode    : "cors",
    cache   : "default"
    };

    //req.mode = "no-cors";
    console.log(options);
    console.log(JSON.stringify(options));
    console.log("getting messages in react");
    //handles message retrieval
    const res = await fetch("http://localhost:5070/api/load_msgs", options).then(res => res.json()).catch(error => console.error(error));
    console.log(res);
    const outcome =  res;
    //updates urrent message buffer state that child display portion uses as renderable prop
    this.setState({
      msgBuffer: [ ...this.state.msgBuffer , outcome]
      });
    console.log(`Message Box's msg buffer ${this.state.msgBuffer}`)
    console.log("messages successfully retrieved");
  };




  render(){
    return (
    <div className={this.props.divname} >
      <MessageDisplayBox msgBuffer = {this.state.msgBuffer} />

      <TextEntry />

      <input type = "button"
       onClick    = {this.loadMessages} 
       value      = "load messages saved on mongo" 
       />


    </div>
    );
  }
}



export default MessageBox;
