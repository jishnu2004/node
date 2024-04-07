const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/router');

const app = express();

const mongoString = "mongodb://localhost:27017/myDatabaseName";
mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true });

const database = mongoose.connection;
database.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
database.once('open', () => {
    console.log('Database Connected');
});

app.use(express.json());
app.use('/api', routes);

const port = 3000;
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
