import express from 'express';
import logger from 'morgan';
import user from './routes/api/user'
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
app.use('/api/v1', user);

const PORT = 5000;
// listen to server
app.listen(PORT, console.log(`Server running on ${PORT}`));