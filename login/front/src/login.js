import { Component, React } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";















class Signup extends Component{
  constructor(props){
    super(props);

    this.state = {
      unvalue: "", pwvalue: "", emvalue :""
    };
    this.signupRoute = this.signupRoute.bind(this); 
    this.handleSignup = this.handleSignup.bind(this);

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    
  }


  handleChangeUsername(event){
    this.setState( { unvalue : event.target.value}); 
  }
  
  handleChangePassword(event){
    this.setState({pwvalue: event.target.value});
  }

  handleChangeEmail(event){
    this.setState({emvalue: event.target.value } );
  }

  async signupRoute(outbound){
    return fetch("/signup", outbound).then(data => data.json());
  }
  

  async handleSignup(event){
    //event.PreventDefault();
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json" , "Authorization" :""},
      body: { "username" : this.state.unvalue,
              "email": this.state.emvalue,
              "password": this.state.pwvalue}
    };
    const token = await this.signupRoute(requestOptions);

    alert("session unable to create user");
  }

  render(){
    return ( <div className="Signup">

      <div className="SignupBox">
      <h2>Sign Up</h2>
        <form>
          <input type="text" 
            value={this.state.unvalue}
            onChange={this.handleChangeUsername} />
        </form>
        <form >
          <input type="text"
            value={this.state.emvalue} 
            onChange={this.handleChangeEmail} />
        </form>
        <form>
          <input type = "password" 
            value={this.state.pwvalue}
            onChange={this.handleChangePassword} />
        </form>
      </div>
      <Link to={ "./home" } >
      <button variant="raised" onClick={this.handleSignup}>
      sign up
      </button>
      </Link>
    </div>
    );
  }
};

class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      preview: "",
      unvalue: "",
      pwvalue: "",
      isLogin : true,
    };
    this.Toggle = this.Toggle.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.loginRoute = this.loginRoute.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);

  }
  
  
  handleChangeUsername(event){
    this.setState( { unvalue : event.target.value}); 
  }
  
  handleChangePassword(event){
    this.setState({pwvalue: event.target.value});
  }

  async loginRoute(outbound){
    return fetch("/auth", outbound).then(data => data.json())
  }
  

  async handleLogin(event){
    //event.PreventDefault();
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json" , "Authorization" :""},
      body: { "username" : this.state.unvalue, "password": this.state.pwvalue}
    };
    const token = await this.loginRoute(requestOptions);
    if (token) {
      sessionStorage.setItem("token", JSON.stringify(userToken));
      alert("stored session token in session storage");
    }
    else{
      alert("session unable to store token probably because not match but who really knows");
    }
  }

  Toggle(){ 
    this.setState((pState) => ({ isLogin: !pState.isLogin })); 
  }

  login(){
    return (
      <div className="LoginContainer"  >
      <div className="LoginBox">
        <form>
          <input type="text" value={this.state.unvalue} onChange={this.handleChangeUsername} />
        </form>
        <form>
          <input type = "password" value={this.state.pwvalue} onChange={this.handleChangePassword} />
        </form>
      </div>
      <Link to={ "./home" } >
      <button variant="raised" onClick={this.handleLogin}>
      login
      </button>
      </Link>
    
    </div>);}
  signup(){
    return (<Signup />);
  }
  render(){
    return (
    <div className="LoginPage">
      <button onClick={this.Toggle}>Sign up</button>
      {this.state.isLogin ? this.login() : this.signup()}
    </div>
  );}
}





export default Login;
