var http = require("http");
var https = require("https");
var express = require("express");
var router = express.Router();
var axios = require("axios-https-proxy-fix");
const Agent = require("agentkeepalive");

var utilities = require("../utilities");

const agent = new http.Agent({ keepAlive: true, keepAliveMsecs: 100000, maxSockets: 100 });

const keepaliveAgent = new Agent({
  maxSockets: 100,
  maxFreeSockets: 10,
  timeout: 60000, // active socket keepalive for 60 seconds
  freeSocketTimeout: 30000 // free socket keepalive for 30 seconds
});

//this proxy setting is for working from home
var proxy = {
  host: "127.0.0.1",
  port: 9000
};

//var axiosoptions = { proxy, agent: keepAliveAgent };

var axiosoptions = { proxy, agent: false };

if (process.env.UseProxy === "false" || process.env.UseProxy === undefined) {
  console.log("setting proxy to false");
  axiosoptions.proxy = false;
}

var localtestApi = "http://localhost:3501/ping";
var azuretestApi = "http://pingapi1234.azurewebsites.net/ping";

var getrul = azuretestApi;

/* GET users listing. */
router.get("/", async function(req, res, next) {
  await axios.get(getrul, axiosoptions);
  res.status(200).json("from order get method");
});

router.get("/withAgent", async function(req, res, next) {
  const options = {
    host: "pingapi1234.azurewebsites.net",
    port: 80,
    path: "/ping",
    method: "GET",
    //agent: false
    agent: keepaliveAgent
  };

  await new Promise((resolve, reject) => {
    const request = http.request(options, response => {
      response.setEncoding("utf8");
      response.on("data", function(chunk) {
        resolve(chunk);
      });
    });
    request.on("error", e => {
      console.log("problem with request: " + e.message);
    });
    request.end();
  });

  res.status(200).json("from order get method with agent");
});

module.exports = router;
