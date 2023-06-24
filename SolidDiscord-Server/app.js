const express = require('express')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/test.db')

const app = express()
const port = 3000

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// https://expressjs.com/en/guide/routing.html
// https://github.com/TryGhost/node-sqlite3/wiki/API
