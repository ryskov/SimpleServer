let app = require('./src/ExpressWrapper').startServer('http://localhost:1337');

let commandQueue = [];
let isOn = false;

app.put('/toggle', (req, res, next) => {
    commandQueue.push({
        toggle: !isOn
    });    

    res.send(201);
});

app.get('/poll', (req, res) => {
    let cmd = commandQueue.shift();

    res.send(cmd ? 't' : 'n');
});