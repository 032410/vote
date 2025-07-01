const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const tmi = require("tmi.js");
const { channel } = require("diagnostics_channel");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

app.use(express.static("public"));

let pollActive = false;
let pollQuestion = "";
let votes = {};
let clients = {};

require("dotenv").config();

const twitchClient = new tmi.Client({
    options : {debug:true},
    identity : {
        username : process.env.TWITCH_USERNAME,
        password : process.env.TWITCH_TOKEN
    },
    channels : [process.env.TWITCH_CHANNEL]
});

twitchClient.connect().catch(e => console.error("連線失敗:", e));

twitchClient.on("message", (msg, tags, channel, self) => {
    if(self || !msg) return;
    const match = msg.trim().match(/^!投票(.+)/i);
    const choice = match[1].toLowerCase();
    if(!votes[choice]) votes[choice] = 0;
    votes[choice]++;
    broadCastPollData();
});

wss.on("connection", (ws)=>{
    clients.push(ws);
    ws.on("message", (msg) => {
        const data = JSON.parse(msg);
        if(data.type === "start"){
            pollActive = true;
            pollQuestion = data.question;
            votes = {};
            broadCastPollData();
        }
        else if(data.type === "end"){
            pollActive = false;
            broadCastPollData(true);
        }
    });
    ws.on("close" , ()=>{
        clients = clients.filter((c) => c!= ws);
    });
});

function broadCastPollData(end = false){
    const msg = JSON.stringify({
        type : "update",
        question : pollQuestion,
        votes,
        active : pollActive,
        end
    });
    clients.forEach(client => {
        if(client.readyState === WebSocket.OPEN){
            client.send(msg);
        }
    });
}

server.listen(3000, ()=>console.log("伺服器已啟動:http://localhost:3000"));