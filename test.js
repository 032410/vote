const tmi = require("tmi.js");
require('dotenv').config();
const client = new tmi.Client({
    identity :{
        username : process.env.TWITCH_USERNAME,
        password :  process.env.TWITCH_TOKEN
    },
    channels: [process.env.TWITCH_CHANNEL]

});

client.connect().then(() => {
    console.log("開始模擬投票...");
    let count = 0;
    const total = 2000;
    const interval = setInterval(() => {
        if (count >= total) {
            clearInterval(interval);
            console.log("模擬完畢");
            return;
        }
        const option = ["A", "B", "C", "D"][Math.floor(Math.random() * 4)];
        client.say("kozert22", `!投票${option}`)
            .catch(err => {
                console.error("發送訊息失敗：", err.message);
                clearInterval(interval); // 可選：遇錯就停止
            });
        count++;
    }, 5);
}).catch(err => {
    console.error("連線失敗：", err.message);
});