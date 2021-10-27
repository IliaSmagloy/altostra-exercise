import express from 'express';

import { authenticateRequest, createObscureToken, CustomDatabase } from '../../utils';

export async function getTokens(request: express.Request, response: express.Response){
    const sub = authenticateRequest(request);
    if(!sub) { 
        response.send('Unauthenticated request, aborting action.');
        return;
    }

    const database  = await CustomDatabase.getInstance();

    const selectCommand = `SELECT token, status, last_usage FROM "main"."tokens" WHERE "sub"='${sub}'`;
    const results = database.prepare(selectCommand).all();
    const obscuredResults = results.map((element)=>{
        const obscuredElement = { ...element };
        obscuredElement['token'] = createObscureToken(element['token']);
        return obscuredElement;
    });
    response.send(obscuredResults);
}