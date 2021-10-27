import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import { authenticateRequest, CustomDatabase, getCurrentDateTimeInUTCTimezoneAndISOFormat } from '../../utils';

export async function generateToken(request: express.Request, response: express.Response){
    const sub = authenticateRequest(request);
    if(!sub) { 
        response.send('Unauthenticated request, aborting action.');
        return;
    } 
    
    const body = request['body'];
    const permissionsRequired = body.permissions;
    if(!permissionsRequired){
        response.send('No permissions included, aborting action.');
    }
    const database = await CustomDatabase.getInstance();

    const newApiToken = uuidv4();
    const currentDateTime = getCurrentDateTimeInUTCTimezoneAndISOFormat();
    const isActive = 'TRUE';

    const insertCommand = 
        `INSERT INTO "main"."tokens"("sub","status","token","permissions","last_usage") 
        VALUES ('${sub}',${isActive},'${newApiToken}','${permissionsRequired}','${currentDateTime}');`;
    await database.exec(insertCommand);

    response.send(newApiToken);

}