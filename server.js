let app = require('./src/ExpressWrapper').startServer('http://localhost:1337');

app.get('/', (req, res) => {
    res.send('Hej bitch');
});