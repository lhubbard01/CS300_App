const React = require( "react");
const Component = React.Component;

class ListComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      services: []
    };
    this.fetchServicesUp = this.fetchServicesUp.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }








  handleClick(event){
    alert(JSON.stringify(event.target.value));
    this.fetchServicesUp();
  }
  
  fetchServicesUp(){

    const req = {
      method: "GET",
      headers: {"Content-Type" : "application/json" },
    };

    fetch("/api/services", req)
      .then(res => res.json())
      .then(services => this.setState({services},
        () => console.log("services have been fetched, here they are " + JSON.stringify())));
  }

  componentDidMount(){
    //this.fetchServicesUp();
  }

  render() {
    return (
      <div className="ServicesUpList">
        <ul>
          { this.state.services.map instanceof Array  ? this.state.services.map( service => <li key={service.name}>{service.name} -- {service.port}</li> ) : this.state.services 
            }
        </ul>
        <input type="button" onClick={this.handleClick} value="Fetch" />
      </div>
    );
  }

}



class App extends Component{
  render(){
    return ( 
      <div className="ServiceDisplay">
        <h1>Orchestrator</h1>
         <ListComponent />
      </div>
    );


  }
  
}
export default App;


