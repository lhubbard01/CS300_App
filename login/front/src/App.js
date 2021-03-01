const React = require("react");
const Component = React.Component;

class APIButton extends Component{
  constructor(props){
    super(props);
    this.state = {}
    this.handleClick = this.handleClick.bind(this);
  }

  
  handleClick(event){
    event.target.value;
  }


};

class App extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    return (
      <div className="LoginFrontEndApp">
      </div>
    );
  };
}
export default App;
