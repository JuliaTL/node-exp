let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let messages = [
    {
        name: "Anton",
        message: "Good morning"
    },
    {
        name: "Tolik",
        message: "Good afternoon"
    },
    {
        name: "Natasha",
        message: "Hi"
    }
];

app.get('/messages', (req, res) => {
    res.send(messages);
});

app.post('/messages', (req, res) => {
    messages.push(req.body);
    io.emit('message', req.body);
    res.sendStatus(200);
});

io.on('connection', socket => {
    console.log('connect');
})

let server = http.listen(3000, () => {
    console.log('Server is listening on port', server.address().port);
});
