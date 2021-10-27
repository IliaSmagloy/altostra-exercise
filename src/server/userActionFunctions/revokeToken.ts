import express from 'express';

import { authenticateRequest, CustomDatabase } from '../../utils';

export async function revokeToken(request: express.Request, response: express.Response){
    const sub = authenticateRequest(request);
    if(!sub) { 
        response.send('Unauthenticated request, aborting action.');
    } 
    
    const body = request['body'];
    const tokenToRevoke = body.token;
    if(!tokenToRevoke){
        response.send('No token included, aborting action.');
    }
    const revokeCommand = `UPDATE "main"."tokens" SET "status"=FALSE WHERE "token"='${tokenToRevoke}';`;
    const database = await CustomDatabase.getInstance();
    database.exec(revokeCommand);

    response.send('The token was revoked');
}