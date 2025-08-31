// api/src/index.js
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');


const app = express();
app.use(bodyParser.json());


const DB_HOST = process.env.DB_HOST || 'postgres';
const DB_NAME = process.env.DB_NAME || 'kubernet';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASS = process.env.DB_PASSWORD || 'admin';
const DB_PORT = process.env.DB_PORT || 5432;


const pool = new Pool({
host: DB_HOST,
database: DB_NAME,
user: DB_USER,
password: DB_PASS,
port: DB_PORT,
max: 5,
});


// ensure table exists
async function ensureDb(){
const client = await pool.connect();
try{
await client.query(`CREATE TABLE IF NOT EXISTS messages (id SERIAL PRIMARY KEY, text TEXT NOT NULL, created_at TIMESTAMP DEFAULT now())`);
const res = await client.query('SELECT count(*) FROM messages');
if(res.rows[0].count === '0'){
await client.query("INSERT INTO messages (text) VALUES ('Hello from Postgres!')");
}
}finally{
client.release();
}
}


app.get('/api/health', (req, res) => {
res.json({ status: 'ok' });
});


app.get('/api/messages', async (req, res) => {
try{
const r = await pool.query('SELECT id, text, created_at FROM messages ORDER BY id DESC LIMIT 10');
res.json({ messages: r.rows });
}catch(err){
console.error(err);
res.status(500).json({ error: 'db error' });
}
});


const port = process.env.PORT || 3000;
ensureDb().then(()=>{
app.listen(port, ()=>console.log('API listening on', port));
}).catch(err=>{
console.error('Failed to init DB', err);
process.exit(1);
});