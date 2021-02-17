import React from "react";
const Component = React.Component;
class App extends Component{
  render() {
    return <h1>Hello, this is {this.props.name}</h1>;
  }
}
export default App;
