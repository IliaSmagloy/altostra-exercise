import DatabaseConstructor, { Database }  from 'better-sqlite3';

const createTokensTable = `CREATE TABLE IF NOT EXISTS "tokens" (
	"sub"	TEXT,
    "status"    BOOLEAN,
    "token"	TEXT UNIQUE,
    "permissions"   TEXT,
    "last_usage"	TEXT
)`;

export class CustomDatabase {
    private static _instance: CustomDatabase;
    private database: Database;

    private static async openDB(){
        const database: Database = new DatabaseConstructor('tokens.db', { verbose: console.log });
        database.exec(createTokensTable);
        return database;    
    }

    public static async getInstance(): Promise<CustomDatabase>{
        if(!this._instance){
            this._instance = new CustomDatabase();
            this._instance.database = await this.openDB();
        }
        return this._instance;
    }

    public exec(command: string){
        this.database.exec(command);
    }

    public prepare(command: string){
        return this.database.prepare(command);
    }

}
