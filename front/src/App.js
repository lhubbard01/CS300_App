import Header from "./components/Header";
import React from "react";
import LoginBox from "./components/login";
import DirectMessageBox from "./components/DirectMessageBox";
import Home from "./home";
import Login from "./login";
import {Route, Switch } from "react-router-dom";
const Component = React.Component;
class App extends Component{
  render(){
    const App = () => (

      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Home} />
        </Switch>
      </div>
    );
  return ( 
    <Switch>
      <App />
    </Switch>
  );
  
  }
}
export default App;

