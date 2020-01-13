import express from 'express';
import logger from 'morgan';
import user from './routes/api/userRoute'
import orderRoute from './routes/api/orderRoute';
import menuRoute from './routes/api/menuRoute';
import db from './db'
import 'regenerator-runtime/runtime'
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
app.use('/api/v1', menuRoute);
app.use('/api/v1', orderRoute);



// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;

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
<<<<<<< HEAD
    app.listen(PORT, '0.0.0.0', console.log(`Server running on ${PORT}`));
=======
    app.listen(PORT, console.log(`Server running on ${PORT}`));
>>>>>>> 6fa43df6ba601265ff777572ca73d312480d2e4a
})