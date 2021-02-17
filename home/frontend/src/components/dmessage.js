/*function Chat(props) {
  return (
   messages */
function ProfPic(props) {
  return (
    <img className="ProfPic"
    src={props.user.profpicurl}
    alt={props.user.name}
    />
    );
}


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
