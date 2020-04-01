var http = require("http");
var https = require("https");
var express = require("express");
var router = express.Router();
var axios = require("axios-https-proxy-fix");

var utilities = require("../utilities");

//http.globalAgent.maxSockets = Infinity;
//http.globalAgent.agent = false;
const keepAliveAgent = new http.Agent({ keepAlive: true, keepAliveMsecs: 100000, maxSockets: 100 });

//this proxy setting is for working from home
var proxy = {
  host: "127.0.0.1",
  port: 9000
};

//var axiosoptions = { proxy, agent: keepAliveAgent };

var axiosoptions = { proxy };

if (process.env.UseProxy === "false" || process.env.UseProxy === undefined) {
  console.log("setting proxy to false");
  axiosoptions.proxy = false;
}

var localtestApi = "http://localhost:3501/ping";
var azuretestApi = "https://pingapi1234.azurewebsites.net/ping";

var getrul = azuretestApi;

/* GET users listing. */
router.get("/", async function(req, res, next) {
  await axios.get(getrul, axiosoptions);
  res.status(200).json("from order get method");
});

module.exports = router;
