/*Message primatives */
import React from "react"

const Component = React.Component;

function MessageEntryField extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      value: "Aa"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  
  handleSubmit(event) {
    event.preventDefault();
  }
  

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea value={this.state.value} onChange={this,handleChange}
        <input type="submit" value="send" />
      </form>
    );
  }
}

function OtherMessage(props) {
  return (
    <div className="otherMessage">
      <ProfPic user={props.user} />
      <p>props.msg</p>
      <p>props.date</p>
    </div>
  );
}

function SelfMessage(props) {
  return (
    <div className="selfMessage">
      <ProfPic user={props.user} />
      <p>props.msg</p>
      <p>props.date</p>
    </div>
  );
}



/*Chat box as container*/
/*function Chat(props) {
  return (
   const chat_istory = props.chat;
   const chatbox = chat_history.map((msg) => Message
*/
//TODO
//Conditional render upon scrolling, display text when in view
//May be achieved with react keys??

/*Profile picture stuff */
function ProfPic(props) {
  return (
    <img className="ProfPic"
    src={props.user.profpicurl}
    alt={props.user.name}
    />
  );
}

/*Whole chat box component */
function DMessage(props) {
  return (
    <div className="MessageBox">
      <div className="User">
        <ProfPic user={props.user} />
        <div className="SelfUser-Info-Name">
          {props.user.name}
        </div>
      </div>
      
      <div className="Chat">
        {props.chat}
      </div>
      <br>
      <MessageEntryField />
    </div>
  );
}
