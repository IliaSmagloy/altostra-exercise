import express from 'express';
const app = express();
 
app.post('/generateToken', function (req, res) {
    res.send('Hello World');
});

app.post('/authenticate', function (req, res) {
    res.send('Hello World');
});

app.post('/revoke', function (req, res) {
    res.send('Hello World');
});

app.get('/tokens', function (req, res) {
    res.send('Hello World');
});

app.listen(3000);