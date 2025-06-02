import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_kaybrorob,
    password: process.env.DB_Purplechance05*,
    host: 'localhost',
    database: process.env.DB_employeetracker,
    port: 5432,
});

const connectToDb = async () => {
    try {
        await pool.connect();
        console.log('Succesfully connected to database');
    } catch (err) {
        console.error('Error connecting to database', err);
        process.exit(1);
    }
};

export { pool, connectToDb };
