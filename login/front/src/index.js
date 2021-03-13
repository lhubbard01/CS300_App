const {React, Component} = require("react");
const  ReactDOM =  require("react-dom");

class Header extends Component{
  constructor(props){
    super(props);
    this.state = {
      title : props.title
      }
  };





  render(){
    return (
      <h1 style = {{background: "red"}}> {this.state.title}</h1>


    );
  }
};

class SignupBox extends Component{
  constructor(props){
    super(props);

    this.state = {
      unvalue : "", 
      emvalue : "",
      pwvalue : ""
    };

    this.signup = this.signup.bind(this); 
    
    this.handleSignup         = this.handleSignup.bind(this);
    this.handleChangeEmail    = this.handleChangeEmail.bind(this);
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

  async signup(outbound){
    return fetch("/api/signup", outbound).then(data => data.json());
  }
  

  async handleSignup(event){
    //event.PreventDefault();
    const data = {
      username : this.state.unvalue,
      email    : this.state.emvalue,
      password : this.state.pwvalue
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length
      },
      body: data
    };


    this.signup(requestOptions);
  }


  render(){
    return ( <div className="Signup">

      <div className="SignupBox">
      <h2>Sign Up</h2>
        <form>

          <value>Username</value>
          <br/>

          <input type     = "text" 
                 value    = {this.state.unvalue}
                 onChange = {this.handleChangeUsername} 
          />
          <br/>

          <value>Email</value>
          <br/>

          <input type = "text"
            value     = {this.state.emvalue} 
            onChange  = {this.handleChangeEmail} 
          />
          <br/>

          <value>Password</value>
          <br/>

          <input type     = "password" 
                 value    = {this.state.pwvalue}
                 onChange = {this.handleChangePassword} 
          />
          <br/>

          <input type    = "submit" 
                 onClick = {this.handleSignup}
          />
          <br/>

        </form>
      </div>
    </div>
    );
  }
};

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render(){


    return (
      <div className  ="LoginPage"  >
        <Header title ="Login" />
        <SignupBox />
      </div>
      );
  }
};
/*class LoginBox extends REeact.Compoent { 
  constructor(props){
    super(props);
    this.state = {}*/



ReactDOM.render( <App /> ,  document.getElementById("root"));
