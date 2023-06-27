const express = require('express')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io');

const port = 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server,
    {
        cors: {
            origin: ["http://localhost:5173", "http://localhost:5174"],methods: ["GET", "POST"],
        }
    });

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/test.db');

app.use(cors());

app.get('/api/posts', (req, res) => {
    res.send("get all posts")
})

app.get('/api/posts/:id', (req, res) => {
    let id = req.params["id"]
    db.get('select * from posts where id= $id', {$id: id}, function(err,row) {
        res.send(row);
    });
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("message", msg => {
        console.log("Emmiting: ", msg);
        socket.broadcast.emit("message", msg);
    });
});

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



// https://expressjs.com/en/guide/routing.html
// https://github.com/TryGhost/node-sqlite3/wiki/API
