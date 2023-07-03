//const express = require('express')
import express from 'express';
import cors from 'cors';
import http from 'http';
import {Server} from 'socket.io';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
//import { Http3Server } from '@fails-components/webtransport';

const port = 3000;
const app = express();
const server = http.createServer(app);

/*
const h3Server = new Http3Server({
    port: 3000,
    secret: "wtf",
    cert: "wtdf",
    privKey: "asfs"
});
h3.startServer();
*/

const io = new Server(server,
    {
        cors: {
            origin: ["http://localhost:5173", "http://localhost:5174"],methods: ["GET", "POST"],
        }
    });

const db = new sqlite3.Database('./db/test.db');

app.use(cors());
//app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/api/posts', (req, res) => {
    res.send("get all posts")
})

app.get('/api/channels', (req, res) => {
    db.all('select * from channels', function(err, row) {
        res.send(row);
    });
})

app.post('/api/new', (req, res) => {
    const p = req.body;
    console.log(p);
    res.send("Created");
})

app.get('/api/channel/:id', (req, res) => {
    let id = req.params["id"]
    let out;
    // TODO: It definitly need changing
    db.get('select * from channels where channel_id= $id', {$id: id}, function(err,row) {
        out = row;
    });
    db.all('select * from messages where channel_id= $id', {$id: id}, function(err,row) {
        out.messages = row;
        res.send(out);
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
