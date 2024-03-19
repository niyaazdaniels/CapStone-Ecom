import mysql from 'mysql2';

import {config} from 'dotenv';

config()

const pool = mysql.createPool({

    host: process.env.MYSQL_ADDON_HOST,

    database: process.env.MYSQL_ADDON_DB,

    user: process.env.MYSQL_ADDON_USER,

    password: process.env.PASSWORD,

    multipleStatements: true,

    connectionLimit: 0
    
}).promise();

export {pool};

