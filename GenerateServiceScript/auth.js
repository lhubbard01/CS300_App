const properties = require("./genAPI.json");
const http = require("http");
const fetch = require("node-fetch");
//Client API
const express = require("express");
class ClickablesClient {
  constructor(){
        this.onClick = this.onClick.bind(this);

  };

    onClick(  ) {
    let data = JSON.stringify({"" : ""};
    let options = {
      method: "GET",
      headers: {"Content-Type": "application/json", "Content-Length": data.length },
      hostname: localhost,
      port: 5020, path: /api/services
    };
        const out = await fetch(options).then(res => res.json());
    return out;
  }
export default ClickablesClient;
