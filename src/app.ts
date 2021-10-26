import express from 'express';
import { jsonwebtoken } from 'jsonwebtoken';

import { authenticateRequest } from './utils';

const jwt = jsonwebtoken();

const app = express(); 
app.post('/generateToken', function (req, res) {
    const userId = authenticateRequest(req);
    if(!userId) { 
        res.send('Unauthenticated request, aborting action.');
    } else {
        res.send('Authenticated request.');
    }
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