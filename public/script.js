const ws = new WebSocket("ws://"+location.host);
let chart = false;

function startPoll(){
    const qustion = document.getElementById("questionInput");
    ws.send(JSON.stringify({type:"start", qustion}));
}

function endPoll(){
    ws.send(JSON.stringify({type:end}));
}

ws.onmessage = (e) =>{
    const data = JSON.parse(e);
    if(data.type === "updata"){
        document.getElementById("pollQuestion").textContent = data.qustion;
        const labels = Object.key(data.votes);
        const counts = Object.values(data.votes);
        if(!chart){
            const ctx = document.getElementById("voteChart").getContext("2d");
            chart = new chart(ctx, {
                type : "bar", 
                data :{
                    labels,
                    datasets : [{
                        label : "票數",
                        data : counts,
                        background : 'rgba(75, 192, 192, 0.6)'
                    }]
                },
                options:{
                    animation : true,
                    scales : {y:{beginAtZero:true}}
                }
            });
        }
        else{
            chart.data.labels = labels;
            chart.data.datasets[0].data = counts;
            chart.update();
        }
    }
}