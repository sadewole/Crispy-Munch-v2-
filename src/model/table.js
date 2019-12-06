import db from './index'

db.query(`CREATE TABLE IF NOT EXISTS 
        users(
        id UUID PRIMARY KEY,
        email text NOT NULL UNIQUE,
        name text NOT NULL,
        password text NOT NULL
        )`)
    .then(res => {
        console.log(res)
        db.end()
    }).catch(err => {
        console.log(err)
        db.end()
    })