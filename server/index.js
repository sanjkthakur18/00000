const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const userRoute = require('./src/routes/userRoutes');
const adminRoute = require('./src/routes/adminRoutes');

const app = express();

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/shipping')
.then(() => {
    console.log('DB Connected');
})
.catch((error) => {
    console.log(`Error while connecting DB ${error}`);
});

app.get('/', (req, res) => {res.status(200).send('Hello Server')});
app.get('/api', (req, res) => {res.status(200).send('Server API is Working')});
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
});