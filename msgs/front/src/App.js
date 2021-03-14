import logo from './logo.svg';
import './App.css';
import socketClient from "socket.io-client"
import {React, Component} from "react";
import MessageBox from "./MessageBox";
//do not have curly braces around for default export

function App() {
  return (
    <div className="App">
        <MessageBox divname={"MessageDemo"} /> //this is to allow for targeting different use cases with different css
    </div>
  );
}




export default App;
