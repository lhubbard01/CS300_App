const {React, Component} = require("react");
const  ReactDOM =  require("react-dom");

const bcrypt = require("bcryptjs");

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
    this.encrypt = this.encrypt.bind(this);    
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



  


  
  encrypt(un, pw){
    const salter =  bcrypt.genSalt(10);
    const salted_pw =  bcrypt.hash(pw, salter);
    return salted_pw;
  }
  
  async signup(outbound){
    console.log(JSON.stringify(outbound));
    alert("SIGNUP");




  
    return fetch("/api/signup", outbound)
    .then(res => res.body)
    .catch(err => console.error(error));
  };
  /*.then(d => res.body).
    .then(rb => rb.getReader()
      const reader = new ReadableStream({
        controller(start){
          function push(){
            reader.read().then( 
            ({done, value}) => {
              if (done){
                console.log("is finished", done)
                controller.close();
              }
              
              controller.enqueue(value)
              console.log("value " , value)

              push()
            }*/
  

  async handleSignup(event){
    //event.PreventDefault();
    const data = JSON.stringify( {
      username : this.state.unvalue,
      email    : this.state.emvalue,
      password : this.state.pwvalue
    });

  let headers = {
    "Content-Type": "application/json"}


  const options = {
    method  : "POST",
    headers : headers,
    body    : data};
   
    console.log(data);

    //req.mode = "no-cors";
    alert(JSON.stringify(options));
    console.log(JSON.stringify(options));
    console.log("getting messages in react");






    //handles message retrieval
    const res = await fetch("/api/signup/", options).then(res => res.json()).catch(error => console.error(error));
    console.log("posted") 

  //const o = this.signup(requestOptions);
  //if (o.status === 200) <Redirect to = "http://localhost/5070" />

  //console.log(o);
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

          <input type    = "button" 
                 onClick = {this.handleSignup}
          />
          <br/>

        </form>
      </div>
    </div>
    );
  }
};






class RedirectPage extends Component{
  componentDidMount(){
    window.location.replace(this.props.url);
  }
  render(){
    return( <div>outbound</div>);
  }
}

class LoginRedirectBoxButton extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: "",
      light : false,
      clicked : false
    }

    this.onHover = this.onHover.bind(this);
    this.onClick = this.onClick.bind(this);
  }


  onHover(e){
    this.setState({name: this.state.name+"-active"})
    this.setState({light: !this.state.light})
  }


  onClick(e){
    this.setState({clicked: true})
  }

  render(){
        if (this.state.clicked){
         return <RedirectPage url={"http://localhost:5035"} /> 
        }
        else{
          return (
                 <div className={"LoginRedirectBoxButton" + this.state.name } 
                      onClick={this.onClick} 
                      onHover={this.onHover} 
                      style={{background: "blue"}}>
                    <p>Home</p>
                </div> 
          );
      }
  }
}

class App extends Component{
  constructor(props){
    super(props);
  }
    //req.mode = "no-cors";
  render(){


    return (
      <div className  ="LoginPage"  >
        <LoginRedirectBoxButton />
        <input type="button" />
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
