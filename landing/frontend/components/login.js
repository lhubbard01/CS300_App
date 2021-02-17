import React from "react";
const Component = React.Component;

class Username extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "username",
    };
    this.handleChange = this.handleChange.bind(this);
  render () {
    return (
  }


  handleChange(event) {
    this.setState({value: event.target.value}




class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "password",
    };
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    this.setState({value: event.target.value}
  }

  render() {
    return (
      <form>
        <label>
          Password
          <input type="password" onChange={this.handleChange} />
        </label>
      </form>
    );
  }
}


function LoginBox(props) {
  return (
    <div className="loginBox">
      <UserName/>
      <Password />
      <input type="submit" value="submit" />
    </div>
    );
}
