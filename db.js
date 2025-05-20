const { Pool } = require('pg');

class DB {
    constructor(database, user, password, host = 'localhost', port = 5432) {
        this.pool = new Pool({
            user: user;
            host: host;
            database: database;
            password: password;
            port: port;
        });
    }
    async connect() {
        try{
            await this.pool.connect();
            console.log('Succesfully connected to the database');
        } catch (err) {
            console.error('Error connecting to the database', err);
        }
    }
    async close() {
        await this.pool.end();
        console.log('Database connection closed');
    }
    async query(text, params) {
        try {
            const res= await this.pool.query(text, params);
            return res.rows;
        } catch (err) {
            console.error('Error executing query', err);
            return null;
        }
    }
    async execute(text, params) {
        try {
            await this.pool.query(text, params);
            console.log('Query executed successfully');
        } catch (err){
            console.error('Error executing query', err);
        }
    }
}

async function main() {
    const DBoperations = new DBoperations('postgres', 'postgres', 'Purplechance05*');
    await DBoperations.connect();

    const departments = await DBoperations.query('SELECT id, name FROM department');
    if (departments) {
        console.log('\nDepartments:');
        departments.forEach(dept => [
            console.log('ID: ${dept.id}, Name: ${dept.name}');
        ]);
    }
    await DBoperations.close();
}

if (require.main === module) {
    main();
}