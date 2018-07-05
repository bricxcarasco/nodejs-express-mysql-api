const express = require('express');
const mysql = require('mysql');

// Create Connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodemysql'
});

// Connect
db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('MySQL connected...');
});

const app = express();

// Create table
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...');
    });
});

app.get('/insertpost/:title/:body', (req, res) => {
    let post = {
        title: req.params.title,
        body: req.params.body
    };

    let sql = 'INSERT INTO posts SET ?';

    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log('Post added...');
        res.send('Post successfuly added...');
    });
});

app.get('/selectpost/:id', (req, res) => {
    let post = {
        id: req.params.id
    }

    let sql = 'SELECT title, body FROM posts WHERE ?';

    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        if(result == "") {
            res.send('No post found');
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

app.get('/selectposts', (req, res) => {
    let sql = 'SELECT title, body FROM posts';
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result); 
    });
});

app.get('/deletepost/:id', (req, res) => {
    let post = {
        id: req.params.id
    };

    let sql = 'DELETE FROM posts WHERE ?';

    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log('Post ' + post.id + ' has been deleted');
        res.send('Post ' + post.id + ' has been deleted');
    });
});

app.listen('3000', () => {
    console.log("Listens to port 3000...");
});