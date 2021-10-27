import bodyParser from 'body-parser';
import express from 'express';

import { authenticate, generateToken, getTokens, revokeToken } from './userActionFunctions';

export default class AccessService {
    server: express.Server;
    constructor() {
        this.server = express(); 
        const server = this.server;
        server.use(bodyParser.json());

        server.post('/generateToken', generateToken);
        server.post('/authenticate', authenticate);
        server.post('/revoke', revokeToken);
        server.get('/tokens', getTokens);
    }

    async start() {
        const server = this.server;
        server.listen(3000);
    }
}