// import jsonwebtoken from 'jsonwebtoken';

import express from 'express';
import { sign } from 'jsonwebtoken';

import { authenticateRequest, CustomDatabase, getCurrentDateTimeInUTCTimezoneAndISOFormat } from '../../utils';

export async function authenticate(request: express.Request, response: express.Response){
    const sub = authenticateRequest(request);
    if(!sub) { 
        response.send('Unauthenticated request, aborting action.');
        return;
    }
    const body = request['body'];
    const { token } = body;

    const database  = await CustomDatabase.getInstance();

    const selectCommand = `SELECT * FROM "main"."tokens" WHERE "token"='${token}'`;
    const results = database.prepare(selectCommand).all();

    if(results.length===0){
        response.send('There is no such token in the system.');
        return;
    }

    const userInfo = results[0];
    if(userInfo['sub'] !== sub){
        response.send('This token belongs to another user.');
        return;
    }

    if(userInfo['status']===0){
        response.send('This token has been revoked already.');
        return;
    }

    const { permissions } = userInfo;
    const somePrivateKey = 'Shh';
    const newJWT = sign({ 'sub': sub, permissions }, somePrivateKey);
    response.send(newJWT);

    const currentDateTime = getCurrentDateTimeInUTCTimezoneAndISOFormat();
    const changeLastUsageDateCommand = `UPDATE "main"."tokens" SET "last_usage"='${currentDateTime}' WHERE "token"='${token}';`;
    database.exec(changeLastUsageDateCommand);
}