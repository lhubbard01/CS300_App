export function setAuthToken(headerList, token) => { 
  if (token) {
    headerList.push(["Authorization", token])
  }
}
fetch("/api/create", ).then( res => { const {token} = res.data;
localStorage.set("jwtToken", token);

