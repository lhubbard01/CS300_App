/*Message primatives */
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
      <div className="MessageCompose">
        <form>
          <input type="text">Aa</input>
          <input type="button">send</input>
        </form>
      </div>
    </div>
  );
}
