const {createPool} = require('mysql');

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_data',
    connectionLimit: 10
})

module.exports = pool;