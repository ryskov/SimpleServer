let app = require('./src/ExpressWrapper').startServer('http://localhost:1337');

let commandQueue = [];
let isOn = false;

app.put('/toggle', (req, res) => {
    commandQueue.push({
        toggle: !isOn
    });    
});

app.get('/poll', (req, res) => {
    let cmd = commandQueue.shift();

    res.send(cmd ? 't' : 'n');
});

app.get('/', (req, res) => {
    res.send('Hej bitch');
});