require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const movieRouter = require('./routes/movies');
const fs = require('fs');


const PORT = process.env.PORT || 3001;

const app = express();

const logger = async (req, res, next) => {
    const method = req.method;
    const route = req.path;
    const time = new Date()
    
    const log = `${method} ${route} ${time}`;
    await fs.appendFile("log.txt", `${log} \n`, () => {console.log(log)});

    next();
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use([logger]);

app.use(cors())

mongoose.connect(process.env.CONNECTION_STRING, {})
    .then(() => { console.log("Connected to MongoDB") })
    .catch((err) => { console.log(err) });

app.use('/movies', movieRouter);

app.listen(PORT, () => {
    console.log(`🚀 Server is up and running on port ${PORT} 🚀`);
});