class MessageCore {
  content;
  user;
  date;
  postId;
  constructor(content, user, date, postId){
    //super(content, name, date, postId);
    this.content = content;
    this.user = user;
    this.date = date;
    this.postId = postId;
  }
}

export default MessageCore;
