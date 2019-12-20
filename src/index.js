import express from 'express';
import logger from 'morgan';
import user from './routes/api/user'
import db from './db'
import 'dotenv/config'

const app = express();
// middlewares
app.use(logger());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);

// routes
app.use('/api/v1/user', user);

const PORT = 5000;

// listen to server
// app.listen(PORT, console.log(`Server running on ${PORT}`));

// // test database
// try {
//     db.sequelize.authenticate()
//     console.log('Connection has been established successfully.');
// } catch (err) {
//     console.error('Unable to connect to the database:', err);
// }

// sync database
db.sequelize.sync().then(() => {
    console.log('Connection has been established successfully.');
}).then(() => {
    // listen to server
    app.listen(PORT, console.log(`Server running on ${PORT}`));
})