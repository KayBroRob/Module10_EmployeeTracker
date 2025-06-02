import express from 'express';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

pool.query('INSERT PROMPT', (err: Error, result: QueryResult) => {
    if (err) {
        console.log(err);
    } else if (result) {
        console.log(result.rows);
    }
});

pool.query('INSERT PROMPT', (err: Error, result: QueryResult) => {
    if (err) {
        console.log(err);
    } else if (result) {
        console.log(result.rows);
    }
});

app.use((_req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});